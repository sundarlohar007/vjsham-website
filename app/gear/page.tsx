import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const equipment = {
  controllers: [
    { name: "Pioneer DJM-900NXS2", category: "Mixer" },
    { name: "Pioneer CDJ-3000", category: "Media Player" },
    { name: "Novation Launchpad Pro", category: "Pad Controller" },
    { name: "Akai APC40 mkII", category: "Pad Controller" },
    { name: "Native Instruments Maschine", category: "Groove Controller" },
  ],
  software: [
    { name: "Resolume Arena 7", category: "VJ Software" },
    { name: "Modul8", category: "VJ Software" },
    { name: "TouchDesigner", category: "Visual Programming" },
    { name: "VDMX", category: "VJ Software" },
    { name: "After Effects", category: "Motion Graphics" },
    { name: "Blender", category: "3D Software" },
    { name: "Cinema 4D", category: "3D Software" },
  ],
  hardware: [
    { name: "MacBook Pro M3 Max", category: "Laptop" },
    { name: "Mac Studio", category: "Computer" },
    { name: "Blackmagic ATEM Mini", category: "Video Switcher" },
    { name: "Roland V-1HD+", category: "Video Switcher" },
    { name: "Epson EB-L1755U", category: "Projector" },
    { name: "Panasonic PT-RZ120", category: "Projector" },
  ],
  accessories: [
    { name: "SanDisk Extreme Pro 1TB", category: "Storage" },
    { name: "Thunderbolt 3 Cables", category: "Cables" },
    { name: "HDMI 2.1 Cables", category: "Cables" },
    { name: "Portable SSD 2TB", category: "Storage" },
    { name: "iPad Pro 12.9", category: "Backup Controller" },
  ],
};

export default function GearPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-mono text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Gear</span>
          </h1>
          <p className="font-sans text-foreground-muted text-lg max-w-2xl mb-12">
            Professional equipment I use to deliver premium visual experiences.
          </p>
          
          {/* Controllers */}
          <div className="mb-8 md:mb-12">
            <h2 className="font-mono text-xl md:text-2xl font-bold text-accent-primary mb-4 md:mb-6 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-accent-primary" />
              Controllers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {equipment.controllers.map((item) => (
                <div
                  key={item.name}
                  className="p-3 md:p-4 bg-surface border border-surface-elevated rounded-xl hover:border-accent-primary/50 transition-colors"
                >
                  <h3 className="font-mono text-sm md:text-base text-foreground font-bold">{item.name}</h3>
                  <p className="font-mono text-xs text-foreground-muted mt-1">{item.category}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Software */}
          <div className="mb-8 md:mb-12">
            <h2 className="font-mono text-xl md:text-2xl font-bold text-accent-secondary mb-4 md:mb-6 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-accent-secondary" />
              Software
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {equipment.software.map((item) => (
                <div
                  key={item.name}
                  className="p-3 md:p-4 bg-surface border border-surface-elevated rounded-xl hover:border-accent-secondary/50 transition-colors"
                >
                  <h3 className="font-mono text-sm md:text-base text-foreground font-bold">{item.name}</h3>
                  <p className="font-mono text-xs text-foreground-muted mt-1">{item.category}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hardware */}
          <div className="mb-8 md:mb-12">
            <h2 className="font-mono text-xl md:text-2xl font-bold text-accent-highlight mb-4 md:mb-6 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-accent-highlight" />
              Hardware
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {equipment.hardware.map((item) => (
                <div
                  key={item.name}
                  className="p-3 md:p-4 bg-surface border border-surface-elevated rounded-xl hover:border-accent-highlight/50 transition-colors"
                >
                  <h3 className="font-mono text-sm md:text-base text-foreground font-bold">{item.name}</h3>
                  <p className="font-mono text-xs text-foreground-muted mt-1">{item.category}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Accessories */}
          <div className="mb-8 md:mb-12">
            <h2 className="font-mono text-xl md:text-2xl font-bold text-foreground-muted mb-4 md:mb-6 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-foreground-muted" />
              Accessories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {equipment.accessories.map((item) => (
                <div
                  key={item.name}
                  className="p-3 md:p-4 bg-surface border border-surface-elevated rounded-xl hover:border-foreground/30 transition-colors"
                >
                  <h3 className="font-mono text-sm md:text-base text-foreground font-bold">{item.name}</h3>
                  <p className="font-mono text-xs text-foreground-muted mt-1">{item.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
