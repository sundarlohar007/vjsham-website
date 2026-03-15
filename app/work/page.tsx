import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const portfolioItems = [
  {
    id: 1,
    title: "Neon Nights",
    event: "Club Transformation",
    venue: "The Warehouse, London",
    date: "2024",
    category: "Clubs",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    title: "Summer Solstice Festival",
    event: "Main Stage Visuals",
    venue: "Glastonbury, UK",
    date: "2024",
    category: "Festivals",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 3,
    title: "Tech Conference Keynote",
    event: "Corporate Event",
    venue: "TechHub Berlin",
    date: "2024",
    category: "Corporate",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 4,
    title: "Private Celebration",
    event: "VIP Event",
    venue: "Miami, Florida",
    date: "2023",
    category: "Private",
    color: "from-gold-500 to-yellow-500",
  },
  {
    id: 5,
    title: "Underground Sessions",
    event: "Club Night",
    venue: "Berghain, Berlin",
    date: "2023",
    category: "Clubs",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 6,
    title: "Electronic Music Awards",
    event: "Award Ceremony",
    venue: "LA Convention Center",
    date: "2023",
    category: "Corporate",
    color: "from-violet-500 to-purple-500",
  },
];

const categories = ["All", "Clubs", "Festivals", "Corporate", "Private"];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-mono text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Work</span>
          </h1>
          <p className="font-sans text-foreground-muted text-lg max-w-2xl mb-12">
            A selection of my recent visual projects. Each show is unique, 
            crafted to complement the music and create immersive experiences.
          </p>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={cn(
                  "px-3 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all",
                  category === "All"
                    ? "bg-accent-primary text-background"
                    : "bg-surface text-foreground-muted hover:text-foreground border border-surface-elevated"
                )}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-video bg-surface rounded-xl overflow-hidden cursor-pointer border border-surface-elevated hover:border-accent-primary/50 transition-all"
              >
                {/* Gradient Background (placeholder for video) */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-opacity",
                  item.color
                )} />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <span className="font-mono text-xs text-accent-secondary uppercase tracking-wider mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-mono text-xl font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-foreground-muted">
                    {item.venue}
                  </p>
                  <p className="font-mono text-xs text-foreground-muted/70 mt-1">
                    {item.date}
                  </p>
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <div className="w-16 h-16 rounded-full bg-foreground/90 flex items-center justify-center">
                    <svg className="w-6 h-6 text-background ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
