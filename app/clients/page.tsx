import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const clients = [
  { name: "Berghain", type: "Club" },
  { name: "fabric", type: "Club" },
  { name: "Printworks", type: "Venue" },
  { name: "ADE", type: "Festival" },
  { name: "Glastonbury", type: "Festival" },
  { name: "Tomorrowland", type: "Festival" },
  { name: "Ultra", type: "Festival" },
  { name: "DC10", type: "Club" },
  { name: "Coda", type: "Club" },
  { name: "Warehouse Project", type: "Venue" },
  { name: "Audio RE", type: "Club" },
  { name: "Exit Festival", type: "Festival" },
];

const clientLogos = [
  "Club", "Festival", "Venue", "Brand", "Event", "Brand", "Venue", "Club", 
  "Festival", "Brand", "Event", "Club"
];

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-mono text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Clients</span>
          </h1>
          <p className="font-sans text-foreground-muted text-lg max-w-2xl mb-12">
            Venues, festivals, and brands I've had the privilege to work with.
          </p>
          
          {/* Marquee - Row 1 */}
          <div className="relative flex overflow-hidden mb-6">
            <div className="animate-marquee flex items-center gap-4 md:gap-8 whitespace-nowrap">
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="flex-shrink-0 w-28 md:w-40 h-16 md:h-20 bg-surface border border-surface-elevated rounded-lg flex items-center justify-center"
                >
                  <span className="font-mono text-xs text-foreground-muted uppercase">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Marquee - Row 2 (reverse) */}
          <div className="relative flex overflow-hidden mb-12">
            <div className="animate-marquee flex items-center gap-4 md:gap-8 whitespace-nowrap" style={{ animationDirection: 'reverse' }}>
              {[...clients].reverse().map((client, index) => (
                <div
                  key={`${client.name}-rev-${index}`}
                  className="flex-shrink-0 w-28 md:w-40 h-16 md:h-20 bg-surface border border-surface-elevated rounded-lg flex items-center justify-center"
                >
                  <span className="font-mono text-xs text-foreground-muted uppercase">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Client List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {clients.map((client) => (
              <div
                key={client.name}
                className="p-4 bg-surface border border-surface-elevated rounded-xl text-center hover:border-accent-primary/50 transition-colors"
              >
                <h3 className="font-mono text-lg font-bold text-foreground">
                  {client.name}
                </h3>
                <p className="font-mono text-xs text-foreground-muted mt-1">
                  {client.type}
                </p>
              </div>
            ))}
          </div>
          
          {/* Testimonial */}
          <div className="mt-20 p-8 bg-surface border border-surface-elevated rounded-2xl">
            <blockquote className="font-sans text-lg text-foreground-muted italic text-center max-w-3xl mx-auto">
              "VJ SHAM transformed our venue with stunning visuals that completely 
              elevated the guest experience. A true professional who delivers 
              exceptional work every time."
            </blockquote>
            <cite className="block text-center mt-6 not-italic">
              <span className="font-mono text-foreground font-bold">— Venue Manager</span>
              <span className="font-mono text-sm text-foreground-muted block mt-1">[Venue Name]</span>
            </cite>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
