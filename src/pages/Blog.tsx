import { NebulaScene, HUDNav, HUDPanel } from "@/components/hud";
import { ArrowLeft, Rocket, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <header className="pt-4 px-4">
          <HUDNav />
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-6">
          {/* Back Link */}
          <Link 
            to="/home" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Page Header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              PlayIQ <span className="text-primary text-glow-primary">Blog</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              STEM learning tips, creative building ideas, and updates from the PlayIQ universe
            </p>
          </header>

          {/* Coming Soon Panel */}
          <section aria-label="Blog launch announcement">
            <HUDPanel variant="hero" glowColor="primary" className="max-w-2xl mx-auto text-center">
              <div className="space-y-6 py-8">
                <div className="flex justify-center">
                  <div className="relative">
                    <Rocket className="w-16 h-16 text-primary animate-float" />
                    <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl" />
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Launching Soon!
                </h2>
                
                <p className="text-muted-foreground leading-relaxed">
                  We're preparing exciting content about STEM education, creative building projects, 
                  and the science behind magnetic construction. Our blog will feature hands-on activities, 
                  learning guides, and inspiration for young builders.
                </p>

                <div className="flex items-center justify-center gap-2 text-primary">
                  <Bell className="w-5 h-5" />
                  <span className="font-medium">Check back soon for updates!</span>
                </div>
              </div>
            </HUDPanel>
          </section>

          {/* Upcoming Topics Preview */}
          <section aria-label="Upcoming blog topics" className="mt-12">
            <h2 className="text-xl font-bold text-foreground text-center mb-6">
              Coming <span className="text-secondary">Topics</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <HUDPanel variant="small" glowColor="secondary">
                <h3 className="font-bold text-foreground mb-2">STEM Learning Guides</h3>
                <p className="text-sm text-muted-foreground">
                  Age-appropriate activities that teach physics, geometry, and engineering concepts
                </p>
              </HUDPanel>
              
              <HUDPanel variant="small" glowColor="primary">
                <h3 className="font-bold text-foreground mb-2">Build Challenges</h3>
                <p className="text-sm text-muted-foreground">
                  Step-by-step projects from simple structures to complex space stations
                </p>
              </HUDPanel>
              
              <HUDPanel variant="small" glowColor="accent">
                <h3 className="font-bold text-foreground mb-2">Parent Resources</h3>
                <p className="text-sm text-muted-foreground">
                  Tips for screen-free play and maximizing educational value
                </p>
              </HUDPanel>
            </div>
          </section>
        </main>

        {/* Footer spacer */}
        <div className="h-12" />
      </div>
    </NebulaScene>
  );
};

export default Blog;
