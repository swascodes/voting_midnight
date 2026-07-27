import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Vote, Activity, Info, Home as HomeIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Vote', path: '/vote', icon: Vote },
    { name: 'Results', path: '/results', icon: Activity },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden bg-background text-gray-200">
      {/* Background Animated Cyber Forest */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="cyber-grid"></div>
        {/* Generate multiple fireflies with random positions/delays */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="firefly" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `-${Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Midnight Vote</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>Powered by Midnight Network</p>
        </div>
      </footer>
      </div>
    </div>
  );
}
