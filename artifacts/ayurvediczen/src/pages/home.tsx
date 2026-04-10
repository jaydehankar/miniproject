import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Leaf, Wind, Droplets } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden bg-muted/30 pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto text-center">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-both">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 tracking-wide uppercase">
              Discover Your True Nature
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground max-w-3xl mx-auto leading-[1.1] tracking-tight mb-6">
              Find balance through the ancient wisdom of Ayurveda
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Understand your unique mind-body constitution (Dosha) and learn how to nurture your natural state of health, vitality, and deep calm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/questionnaire">
                <Button size="lg" className="h-14 px-8 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Begin Free Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Intro Image / Story */}
      <section className="w-full py-20 bg-background">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000 delay-300 fill-mode-both">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl">
                <img 
                  src="/src/assets/images/hero.jpg" 
                  alt="Ayurvedic wellness herbs and oils" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent mix-blend-multiply" />
              </div>
            </div>
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-1000 delay-500 fill-mode-both">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">What is a Dosha?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                In Ayurveda, the universe is made of five elements: space, air, fire, water, and earth. These elements combine to form three life forces, or doshas—Vata, Pitta, and Kapha. 
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We each have a unique blend of these doshas. When they are in balance, we experience health and well-being. When out of balance, we experience dis-ease. Our diagnostic tool helps you uncover your current state.
              </p>
              
              <div className="grid gap-6 pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0">
                    <Wind className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Vata (Air & Space)</h3>
                    <p className="text-muted-foreground">Governs movement, creativity, and vitality.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center shrink-0">
                    <div className="w-6 h-6 rounded-full border-2 border-orange-500 flex items-center justify-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Pitta (Fire & Water)</h3>
                    <p className="text-muted-foreground">Governs digestion, metabolism, and intelligence.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center shrink-0">
                    <Droplets className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Kapha (Earth & Water)</h3>
                    <p className="text-muted-foreground">Governs structure, stability, and immunity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
