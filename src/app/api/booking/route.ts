import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

// Provide a fallback string so the Next.js build doesn't crash during static analysis
const resend = new Resend(process.env.RESEND_API_KEY || "placeholder-key");
const ownerEmail = process.env.OWNER_EMAIL || "";

// Disable static rendering for this route since we process dynamic POST payloads
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      event_type,
      event_date,
      event_location,
      venue_size,
      budget,
      message,
    } = body;

    // 1. Basic Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email are required fields." },
        { status: 400 }
      );
    }

    // 2. Insert into Supabase
    const { data: bookingData, error: dbError } = await supabase
      .from("bookings")
      .insert([
  {
    name,
    email,
    event_type,
    event_date,
    location: event_location,
    budget,
    details: message,
  },
])
      .select()
      .single();

    if (dbError) {
      console.error("Supabase Insert Error:", dbError);
      return NextResponse.json(
        { error: "Failed to save booking request to database." },
        { status: 500 }
      );
    }

    // 3. Send Notification Email to Owner
    // (Only attempt if Resend is configured to avoid crashing local dev if secrets are missing)
    if (process.env.RESEND_API_KEY && ownerEmail) {
      try {
        await resend.emails.send({
          from: "Booking System <onboarding@resend.dev>", // Resend testing domain default
          to: ownerEmail,
          subject: `New Booking Request: ${name}`,
          html: `
            <h2>New Booking Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Event Type:</strong> ${event_type || "N/A"}</p>
            <p><strong>Date:</strong> ${event_date || "N/A"}</p>
            <p><strong>Location:</strong> ${event_location || "N/A"}</p>
            <p><strong>Venue Size:</strong> ${venue_size || "N/A"}</p>
            <p><strong>Budget:</strong> ${budget || "N/A"}</p>
            <h3>Message</h3>
            <p>${message || "No message provided."}</p>
          `,
        });

        // 4. Send Confirmation Email to Client
        await resend.emails.send({
          from: "VJ SHAM <onboarding@resend.dev>",
          to: email,
          subject: "Booking Request Received - VJ SHAM",
          html: `
            <h3>Hello ${name},</h3>
            <p>Thanks for reaching out! Your booking request has been successfully received.</p>
            <p>I will review your details and get back to you as soon as possible regarding your upcoming event.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>VJ SHAM</strong></p>
          `,
        });
      } catch (emailErr) {
        console.error("Resend Email Error:", emailErr);
        // We do not fail the request if emails fail, as long as it was saved in DB
      }
    } else {
      console.warn("Resend API key or Owner Email missing. Skipping email dispatch.");
    }

    // Return success
    return NextResponse.json({ success: true, booking: bookingData }, { status: 200 });
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred processing the request." },
      { status: 500 }
    );
  }
}
