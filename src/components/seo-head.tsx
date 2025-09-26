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
      },
      {
        "@type": "PropertyValue",
        "name": "Retailer",
        "value": "First Impression - Authorized Dealer"
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
        "name": "First Impression",
        "alternateName": "First Impression Painting Services",
        "description": "Authorized Asian Paints dealer and professional painting services in Udaipur"
      },
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      "itemCondition": "https://schema.org/NewCondition",
      "warranty": {
        "@type": "WarrantyPromise",
        "warrantyScope": "https://schema.org/MaterialWarranty",
        "description": "First Impression quality guarantee on all paint products"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Satisfied Customer"
        },
        "reviewBody": "First Impression provides excellent quality paints with professional service. Highly recommended!"
      }
    ]
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
      "name": "First Impression",
      "alternateName": "First Impression Painting Services",
      "description": "Authorized Asian Paints dealer and professional painting services in Udaipur, Rajasthan",
      "slogan": "Creating Lasting First Impressions",
      "knowsAbout": [
        "Professional Painting Services",
        "Color Consultation",
        "Digital Color Visualization",
        "Asian Paints Products",
        "Interior Design"
      ]
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
      "availability": "https://schema.org/InStock",
      "warranty": {
        "@type": "WarrantyPromise",
        "warrantyScope": "https://schema.org/ServiceWarranty",
        "description": "First Impression quality guarantee on all painting services"
      }
    },
    "additionalProperty": [
      ...(service.duration ? [{
        "@type": "PropertyValue",
        "name": "Typical Duration",
        "value": service.duration
      }] : []),
      {
        "@type": "PropertyValue",
        "name": "Service Provider",
        "value": "First Impression - Certified Professionals"
      },
      {
        "@type": "PropertyValue",
        "name": "Experience",
        "value": "10+ Years"
      },
      {
        "@type": "PropertyValue",
        "name": "Technology",
        "value": "Digital Color Visualization"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5"
    }
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
      "name": article.author || "First Impression Team",
      "worksFor": {
        "@type": "Organization",
        "name": "First Impression",
        "@id": "https://first-impression.com/#business"
      }
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://first-impression.com/#business",
      "name": "First Impression",
      "alternateName": "First Impression Painting Services",
      "description": "Authorized Asian Paints dealer and professional painting services in Udaipur, Rajasthan",
      "logo": {
        "@type": "ImageObject",
        "url": "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
        "width": 200,
        "height": 200
      },
      "url": "https://first-impression.com",
      "sameAs": [
        "https://www.facebook.com/FirstImpressionPaints",
        "https://www.instagram.com/first_impression_paints",
        "https://www.youtube.com/@FirstImpressionPaints"
      ]
    },
    "datePublished": article.publishDate,
    "dateModified": article.modifiedDate || article.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    },
    "keywords": [
      "First Impression",
      "painting services Udaipur",
      "Asian Paints dealer",
      "color consultation",
      "professional painters"
    ],
    "about": [
      {
        "@type": "Thing",
        "name": "Painting Services",
        "description": "Professional painting and design services"
      },
      {
        "@type": "Thing", 
        "name": "Color Consultation",
        "description": "Expert color advice and digital visualization"
      }
    ]
  };
}

// Brand schema generator for First Impression
export function generateBrandSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": "https://first-impression.com/#brand",
    "name": "First Impression",
    "alternateName": [
      "First Impression Painting Services",
      "First Impressions Painting Services",
      "First Impression Paint Store",
      "First Impressions Paint Store",
      "First Impression Asian Paints Dealer",
      "First Impressions Asian Paints Dealer",
      "First Impression Color Studio",
      "First Impressions Color Studio"
    ],
    "description": "First Impression is the premier Asian Paints dealer and professional painting services provider in Udaipur, Rajasthan. We specialize in color consultation, digital visualization, and expert painting services for residential and commercial projects.",
    "url": "https://first-impression.com",
    "logo": "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
    "slogan": "Creating Lasting First Impressions",
    "founder": {
      "@type": "Organization",
      "name": "First Impression Team"
    },
    "foundingDate": "2020",
    "knowsAbout": [
      "Professional Painting Services",
      "Color Consultation",
      "Digital Color Visualization", 
      "Asian Paints Products",
      "Interior Design",
      "Exterior Painting",
      "Texture Painting",
      "Commercial Painting",
      "Residential Painting"
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Udaipur",
        "containedInPlace": {
          "@type": "State",
          "name": "Rajasthan"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "First Impression Services & Products",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Professional Painting Services",
            "description": "Expert interior and exterior painting services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Color Consultation",
            "description": "Digital color visualization and expert advice"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Asian Paints Products",
            "description": "Authorized dealer of premium Asian Paints products"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5"
    },
    "award": [
      "Best Asian Paints Dealer Udaipur",
      "Top Paint Store Rajasthan", 
      "Certified Painting Professionals",
      "Digital Color Technology Leader",
      "Most Trusted Paint Dealer Udaipur"
    ]
  };
}

// Local Business schema generator specifically for First Impression
export function generateFirstImpressionBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://first-impression.com/#business",
    "name": "First Impression",
    "alternateName": [
      "First Impression Painting Services",
      "First Impression Paint Store",
      "First Impression Asian Paints Dealer",
      "First Impression JSW Dealer",
      "Badala Paints",
      "Badala Paints Udaipur"
    ],
    "description": "First Impression (formerly Badala Paints) is Udaipur's leading Asian Paints and JSW dealer and professional painting services provider. We offer expert color consultation, digital visualization tools, premium paint products, and certified painting professionals for residential and commercial projects.",
    "url": "https://first-impression.com",
    "telephone": "+91-XXXXXXXXXX",
    "email": "contact@first-impression.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Udaipur",
      "addressLocality": "Udaipur", 
      "addressRegion": "Rajasthan",
      "postalCode": "313001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.5712",
      "longitude": "73.6915"
    },
    "openingHours": ["Mo-Sa 09:00-18:00"],
    "priceRange": "$$",
    "paymentAccepted": "Cash, Card, UPI, Bank Transfer",
    "currenciesAccepted": "INR",
    "areaServed": {
      "@type": "City",
      "name": "Udaipur",
      "containedInPlace": {
        "@type": "State",
        "name": "Rajasthan"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "First Impression Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Interior Painting Services",
            "description": "Professional interior painting with premium Asian Paints products"
          },
          "priceRange": "₹15-50 per sq ft"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Exterior Painting Services", 
            "description": "Weather-resistant exterior painting with guaranteed quality"
          },
          "priceRange": "₹20-60 per sq ft"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Color Consultation",
            "description": "Expert color advice with digital visualization technology"
          },
          "priceRange": "₹500-2000"
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/FirstImpressionPaints",
      "https://www.instagram.com/first_impression_paints", 
      "https://www.youtube.com/@FirstImpressionPaints"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5"
    },
    "award": [
      "Best Asian Paints Dealer Udaipur",
      "Best JSW Dealer Udaipur",
      "Top Paint Store Rajasthan",
      "Most Trusted Paint Dealer",
      "Digital Color Technology Leader"
    ]
  };
}
