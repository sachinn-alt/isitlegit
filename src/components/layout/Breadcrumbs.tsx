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
      className="flex items-center space-x-2 text-xs text-slate-400 py-3 mb-2"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Link
        to="/"
        className="inline-flex items-center gap-1 hover:text-slate-200 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Scanner</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={idx} className="flex items-center space-x-2">
            <ChevronRight className="w-3 h-3 text-slate-600" />
            {isLast || !item.path ? (
              <span className="text-slate-200 font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-slate-200 transition-colors"
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
