import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column - Image */}
            <div>
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 border border-surface-elevated overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-mono text-foreground-muted">[ Your Photo Here ]</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Content */}
            <div className="flex flex-col justify-center">
              <h1 className="font-mono text-3xl md:text-5xl font-bold mb-6">
                <span className="text-foreground">About</span>
                <span className="text-accent-primary"> Me</span>
              </h1>
              
              <div className="space-y-6 text-foreground-muted font-sans">
                <p className="text-lg leading-relaxed">
                  I'm VJ SHAM, a professional Visual Jockey based in [Your City]. 
                  With over [X] years of experience in live visual performance, 
                  I transform events into immersive audiovisual experiences.
                </p>
                
                <p>
                  My journey began in underground clubs, where I discovered 
                  the power of synchronized visuals to elevate music and create 
                  unforgettable moments on the dance floor.
                </p>
                
                <p>
                  Today, I work with clubs, festivals, corporate events, and 
                  private clients worldwide, bringing creative visions to life 
                  through cutting-edge visual technology.
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-8">
                <div className="text-center p-3 sm:p-4 bg-surface rounded-xl border border-surface-elevated">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-accent-primary">5+</span>
                  <p className="font-mono text-xs text-foreground-muted mt-1">Years Experience</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-surface rounded-xl border border-surface-elevated">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-accent-secondary">200+</span>
                  <p className="font-mono text-xs text-foreground-muted mt-1">Events</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-surface rounded-xl border border-surface-elevated">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-accent-highlight">50+</span>
                  <p className="font-mono text-xs text-foreground-muted mt-1">Venues</p>
                </div>
              </div>
              
              {/* Skills */}
              <div className="mt-12">
                <h2 className="font-mono text-lg font-bold text-foreground mb-4">Specializations</h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Resolume Arena",
                    "Modul8",
                    "TouchDesigner",
                    "VDMX",
                    "After Effects",
                    "Blender",
                    "3D Mapping",
                    "Live Mixing",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-surface border border-surface-elevated rounded-full font-mono text-xs text-foreground-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
