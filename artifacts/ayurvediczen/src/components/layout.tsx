import { Link, useLocation } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <span className="font-serif text-xl font-semibold tracking-tight text-primary">AyurvedicZen</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location === '/dashboard' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full relative">
        {children}
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground mt-auto border-t border-border/40">
        <div className="container mx-auto px-4 max-w-5xl">
          <p>© {new Date().getFullYear()} AyurvedicZen. A tranquil journey to self-discovery.</p>
        </div>
      </footer>
    </div>
  );
}
