import Script from 'next/script';

interface SEOHeadProps {
  structuredData?: Record<string, any> | Record<string, any>[];
  pageType?: 'website' | 'article' | 'product' | 'service';
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

export function SEOHead({ structuredData, pageType = 'website', breadcrumbs }: SEOHeadProps) {
  // Generate breadcrumb structured data
  const breadcrumbStructuredData = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  // Combine all structured data
  const allStructuredData = [];
  
  if (structuredData) {
    if (Array.isArray(structuredData)) {
      allStructuredData.push(...structuredData);
    } else {
      allStructuredData.push(structuredData);
    }
  }

  if (breadcrumbStructuredData) {
    allStructuredData.push(breadcrumbStructuredData);
  }

  return (
    <>
      {allStructuredData.length > 0 && (
        <Script
          id="page-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(allStructuredData.length === 1 ? allStructuredData[0] : allStructuredData)
          }}
        />
      )}
    </>
  );
}

// Product schema generator for paint products
export function generateProductSchema(product: {
  id: string;
  name: string;
  description: string;
  price?: number;
  imageUrl?: string;
  brand?: string;
  color?: string;
  finish?: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://first-impression.com/products/${product.id}`,
    "name": product.name,
    "description": product.description,
    "image": product.imageUrl || "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Asian Paints"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Asian Paints"
    },
    "category": product.category || "Paint Products",
    "color": product.color,
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Finish",
        "value": product.finish || "Premium"
      },
      {
        "@type": "PropertyValue", 
        "name": "Application",
        "value": "Interior & Exterior"
      }
    ],
    "offers": {
      "@type": "Offer",
      "price": product.price || "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "@id": "https://first-impression.com/#business",
        "name": "First Impression"
      },
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "25",
      "bestRating": "5"
    }
  };
}

// Service schema generator
export function generateServiceSchema(service: {
  name: string;
  description: string;
  priceRange?: string;
  duration?: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "serviceType": service.serviceType || "Painting Service",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://first-impression.com/#business",
      "name": "First Impression"
    },
    "areaServed": {
      "@type": "City", 
      "name": "Udaipur",
      "containedInPlace": {
        "@type": "State",
        "name": "Rajasthan"
      }
    },
    "offers": {
      "@type": "Offer",
      "priceRange": service.priceRange || "$$",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "additionalProperty": service.duration ? [{
      "@type": "PropertyValue",
      "name": "Typical Duration",
      "value": service.duration
    }] : []
  };
}

// Article schema generator for blog posts or content pages
export function generateArticleSchema(article: {
  title: string;
  description: string;
  publishDate: string;
  modifiedDate?: string;
  author?: string;
  imageUrl?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.imageUrl || "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
    "author": {
      "@type": "Person",
      "name": article.author || "First Impression Team"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://first-impression.com/#business",
      "name": "First Impression",
      "logo": {
        "@type": "ImageObject",
        "url": "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png"
      }
    },
    "datePublished": article.publishDate,
    "dateModified": article.modifiedDate || article.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };
}
