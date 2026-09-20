import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, BookOpen, History, Settings } from 'lucide-react';

export const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { label: 'SCANNER', path: '/', icon: ShieldCheck, activeBg: 'bg-[#D02020]' },
    { label: 'GUIDE', path: '/tips', icon: BookOpen, activeBg: 'bg-[#1040C0]' },
    { label: 'HISTORY', path: '/history', icon: History, activeBg: 'bg-[#F0C020]' },
    { label: 'SETTINGS', path: '/settings', icon: Settings, activeBg: 'bg-[#121212]' },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F0F0F0] border-t-2 sm:border-t-4 border-[#121212] shadow-[0px_-4px_0px_0px_#121212] pb-safe"
    >
      <div className="grid grid-cols-4 divide-x-2 divide-[#121212]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-all cursor-pointer ${
                isActive
                  ? `${item.activeBg} ${item.activeBg === 'bg-[#F0C020]' ? 'text-[#121212]' : 'text-white'} font-bold shadow-inner`
                  : 'text-[#121212] hover:bg-[#E0E0E0]'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
