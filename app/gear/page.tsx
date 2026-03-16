import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const equipment: { controllers: { name: string; category: string; link?: string }[]; software: { name: string; category: string; link?: string }[]; hardware: { name: string; category: string; link?: string }[]; accessories: { name: string; category: string; link?: string }[] } = {
  controllers: [
    { name: "Akai Professional APC Mini Mk 2", category: "Resolume Visual Controller", link: "https://www.amazon.in/Akai-Professional-Mini-Ableton-Controller/dp/B0BPC32YZ1" },
  ],
  software: [
    { name: "Resolume Arena", category: "Visual Control", link: "https://www.resolume.com/" },
    { name: "Chaser", category: "Visual Effects", link: "https://hybridconstructs.com/chaser/" },
    { name: "Stageflow", category: "Visual Effects", link: "https://hybridconstructs.com/stageflow/" },
    { name: "AfterEffects", category: "Motion Graphics", link: "https://www.adobe.com/in/products/aftereffects.html" },
    { name: "Blender 3D", category: "3D Visual Effects", link: "https://www.blender.org/" },
  ],
  hardware: [
    { name: "Mini DP to HDMI Converter", category: "Converter", link: "" },
    { name: "BlackMagic 4K SDI Converter", category: "Video Switch", link: "https://www.amazon.in/Blackmagic-Design-Converter-BiDirectional-SDI/dp/B08P3TVNWG" },
    { name: "MSI Raider GE68 HX", category: "Computer", link: "https://in.msi.com/Laptop/Raider-GE68-HX-14VX/Specification" },
  ],
  accessories: [
    { name: "More coming soon", category: "", link: "" },
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
                item.link ? (
                  <a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 md:p-4 bg-surface border border-surface-elevated rounded-xl hover:border-accent-primary/50 transition-colors cursor-pointer"
                  >
                    <h3 className="font-mono text-sm md:text-base text-foreground font-bold hover:text-accent-primary transition-colors">{item.name}</h3>
                    <p className="font-mono text-xs text-foreground-muted mt-1">{item.category}</p>
                  </a>
                ) : (
                  <div
                    key={item.name}
                    className="p-3 md:p-4 bg-surface border border-surface-elevated rounded-xl"
                  >
                    <h3 className="font-mono text-sm md:text-base text-foreground font-bold">{item.name}</h3>
                    <p className="font-mono text-xs text-foreground-muted mt-1">{item.category}</p>
                  </div>
                )
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
                item.link ? (
                  <a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 md:p-4 bg-surface border border-surface-elevated rounded-xl hover:border-accent-secondary/50 transition-colors cursor-pointer"
                  >
                    <h3 className="font-mono text-sm md:text-base text-foreground font-bold hover:text-accent-secondary transition-colors">{item.name}</h3>
                    <p className="font-mono text-xs text-foreground-muted mt-1">{item.category}</p>
                  </a>
                ) : (
                  <div
                    key={item.name}
                    className="p-3 md:p-4 bg-surface border border-surface-elevated rounded-xl"
                  >
                    <h3 className="font-mono text-sm md:text-base text-foreground font-bold">{item.name}</h3>
                    <p className="font-mono text-xs text-foreground-muted mt-1">{item.category}</p>
                  </div>
                )
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
                item.link ? (
                  <a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 md:p-4 bg-surface border border-surface-elevated rounded-xl hover:border-accent-highlight/50 transition-colors cursor-pointer"
                  >
                    <h3 className="font-mono text-sm md:text-base text-foreground font-bold hover:text-accent-highlight transition-colors">{item.name}</h3>
                    <p className="font-mono text-xs text-foreground-muted mt-1">{item.category}</p>
                  </a>
                ) : (
                  <div
                    key={item.name}
                    className="p-3 md:p-4 bg-surface border border-surface-elevated rounded-xl"
                  >
                    <h3 className="font-mono text-sm md:text-base text-foreground font-bold">{item.name}</h3>
                    <p className="font-mono text-xs text-foreground-muted mt-1">{item.category}</p>
                  </div>
                )
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
                item.link ? (
                  <a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 md:p-4 bg-surface border border-surface-elevated rounded-xl hover:border-foreground/30 transition-colors cursor-pointer"
                  >
                    <h3 className="font-mono text-sm md:text-base text-foreground font-bold hover:text-foreground-muted transition-colors">{item.name}</h3>
                    <p className="font-mono text-xs text-foreground-muted mt-1">{item.category}</p>
                  </a>
                ) : (
                  <div
                    key={item.name}
                    className="p-3 md:p-4 bg-surface border border-surface-elevated rounded-xl"
                  >
                    <h3 className="font-mono text-sm md:text-base text-foreground font-bold">{item.name}</h3>
                    <p className="font-mono text-xs text-foreground-muted mt-1">{item.category}</p>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
