import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, BookOpen, History, Settings } from 'lucide-react';

export const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Scanner', path: '/', icon: ShieldCheck },
    { label: 'Tips & Guide', path: '/tips', icon: BookOpen },
    { label: 'History', path: '/history', icon: History },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 border-t border-slate-800/80 backdrop-blur-lg px-2 py-2"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[11px] font-medium transition-colors ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
