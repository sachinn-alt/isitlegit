import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const schemaItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://isitlegit.app/',
    },
    ...items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: item.label,
      item: item.path ? `https://isitlegit.app${item.path}` : undefined,
    })),
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: schemaItems,
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#121212] py-2 mb-2"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 px-2 py-1 bg-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] hover:bg-[#F0C020] transition-colors"
      >
        <Home className="w-3.5 h-3.5" strokeWidth={2.5} />
        <span>CONSOLE</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={idx} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-[#121212]" strokeWidth={3} />
            {isLast || !item.path ? (
              <span className="px-2 py-1 bg-[#121212] text-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#D02020]" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="px-2 py-1 bg-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] hover:bg-[#F0C020] transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
