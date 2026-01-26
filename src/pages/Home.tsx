import { 
  NebulaScene, 
  HUDNav, 
  HUDPanel, 
  HUDProgressBar, 
  HoloIcon, 
  PlatformButton 
} from "@/components/hud";
import { Pyramid, Castle, Gem, Shield } from "lucide-react";
import dragonEgg from "@/assets/dragon-egg.png";
import crystalCluster from "@/assets/crystal-cluster.png";

const Home = () => {
  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <header className="pt-4 px-4">
          <HUDNav />
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-6">
          {/* Top Section: Logo/Crystal Left + Hero Panel Right */}
          <div className="grid lg:grid-cols-12 gap-6 items-start mb-8">
            {/* Left: Large Crystal with PLAYIQ Logo */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              {/* Large floating crystal */}
              <div className="relative animate-float">
                <img 
                  src={crystalCluster} 
                  alt="PlayIQ Crystal" 
                  className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-[0_0_60px_hsl(185,100%,50%,0.6)]"
                />
                {/* Multi-layer glow effect */}
                <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" />
              </div>
              
              {/* PLAYIQ Logo below crystal */}
              <div className="relative mt-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest text-glow-primary">
                  <span className="text-primary">PLAY</span>
                  <span className="text-foreground">IQ</span>
                </h1>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent blur-sm" />
              </div>
            </div>

            {/* Right: Hero Panel with Dragon Egg */}
            <div className="lg:col-span-7">
              <HUDPanel variant="hero" className="relative h-full">
                <div className="flex items-center gap-8 p-2">
                  {/* Dragon Egg - positioned to overlap panel edge */}
                  <div className="relative flex-shrink-0 animate-float -ml-8" style={{ animationDelay: '0.5s' }}>
                    <img 
                      src={dragonEgg} 
                      alt="Dragon Egg" 
                      className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain drop-shadow-[0_0_40px_hsl(300,85%,55%,0.5)]"
                    />
                    {/* Circular energy rings */}
                    <div className="absolute inset-0 border-2 border-secondary/30 rounded-full animate-pulse-glow" />
                    <div className="absolute inset-2 border border-primary/20 rounded-full" />
                    {/* Glow platform */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-secondary/30 blur-xl rounded-full" />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 pr-4">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-3">
                      Your First
                      <br />
                      <span className="text-primary text-glow-primary">Character Awaits</span>
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground mb-6">
                      Set in or hold dragon with your pulse and hoist/guide dragon egg.
                    </p>
                    <button className="relative px-8 py-3 rounded-lg bg-primary/20 border border-primary/60 text-primary font-bold tracking-wider uppercase transition-all duration-300 hover:bg-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] glow-primary">
                      Start Now
                    </button>
                  </div>
                </div>
              </HUDPanel>
            </div>
          </div>

          {/* Middle Section: Progress Panel + Hologram Icons */}
          <div className="grid lg:grid-cols-12 gap-6 mb-10">
            {/* Progress Panel - Left side */}
            <div className="lg:col-span-3">
              <HUDPanel variant="small">
                <div className="space-y-4">
                  <HUDProgressBar 
                    label="Progress Bars" 
                    value={50} 
                    max={1100} 
                    color="primary"
                    size="md"
                  />
                  <HUDProgressBar 
                    label="Challenge" 
                    value={10} 
                    max={10} 
                    color="accent"
                    size="md"
                  />
                </div>
              </HUDPanel>
            </div>

            {/* Hologram Icons - Right side, spread across */}
            <div className="lg:col-span-9 flex items-center justify-center lg:justify-end">
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
                <HoloIcon 
                  icon={Pyramid} 
                  label="Pyramid Power" 
                  color="tertiary"
                  size="lg"
                />
                <HoloIcon 
                  icon={Castle} 
                  label="Tower of Strength" 
                  color="secondary"
                  size="lg"
                />
                <HoloIcon 
                  icon={Gem} 
                  label="Booen Ultps" 
                  color="secondary"
                  size="lg"
                />
                <HoloIcon 
                  icon={Shield} 
                  label="Challenges" 
                  color="accent"
                  size="lg"
                />
              </div>
            </div>
          </div>

          {/* Bottom Section: Platform CTAs */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 lg:gap-32 pt-4">
            <PlatformButton size="lg" variant="primary">
              Start Scanning
            </PlatformButton>
            
            <PlatformButton size="md" variant="secondary">
              Scan Pattern
            </PlatformButton>
          </div>
        </main>

        {/* Footer spacer */}
        <div className="h-12" />
      </div>
    </NebulaScene>
  );
};

export default Home;