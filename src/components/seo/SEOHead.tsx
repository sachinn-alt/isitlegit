import { useEffect } from 'react';
import { SEOProps } from '@/types';

const BASE_URL = 'https://isitlegit.app';
const SITE_NAME = 'IsItLegit';

export const SEOHead = ({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  ogImage = '/og-image.png',
  schema,
}: SEOProps) => {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
    document.title = fullTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Canonical Tag
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 4. Update Open Graph Tags
    const ogTags: Record<string, string> = {
      'og:title': fullTitle,
      'og:description': description,
      'og:type': ogType,
      'og:url': canonicalUrl,
      'og:site_name': SITE_NAME,
      'og:image': `${BASE_URL}${ogImage}`,
    };

    for (const [prop, val] of Object.entries(ogTags)) {
      let ogMeta = document.querySelector(`meta[property="${prop}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', prop);
        document.head.appendChild(ogMeta);
      }
      ogMeta.setAttribute('content', val);
    }

    // 5. Update Twitter Card Tags
    const twitterTags: Record<string, string> = {
      'twitter:card': 'summary_large_image',
      'twitter:title': fullTitle,
      'twitter:description': description,
      'twitter:image': `${BASE_URL}${ogImage}`,
    };

    for (const [name, val] of Object.entries(twitterTags)) {
      let twMeta = document.querySelector(`meta[name="${name}"]`);
      if (!twMeta) {
        twMeta = document.createElement('meta');
        twMeta.setAttribute('name', name);
        document.head.appendChild(twMeta);
      }
      twMeta.setAttribute('content', val);
    }

    // 6. Inject Schema.org JSON-LD structured data
    const existingSchemaScript = document.getElementById('json-ld-route-schema');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'json-ld-route-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const s = document.getElementById('json-ld-route-schema');
      if (s) s.remove();
    };
  }, [title, description, canonicalPath, ogType, ogImage, schema]);

  return null;
};
