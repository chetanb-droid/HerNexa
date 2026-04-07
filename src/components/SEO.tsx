import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  schema?: object | object[];
}

export default function SEO({
  title = "HerNexa - Women's Wellness & Health Insights",
  description = "Empowering women with expert health advice, wellness tips, and medical insights. Your global resource for evergreen health content.",
  canonical = "https://hernexa.com",
  ogImage = "https://picsum.photos/seed/hernexa/1200/630",
  ogType = 'website',
  schema
}: SEOProps) {
  const fullTitle = `${title} | HerNexa`;
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* AI Optimization (AIO) & Semantic Hints */}
      <meta name="keywords" content="women's health, wellness, reproductive health, nutrition, mental health, evergreen health advice" />
      <meta name="author" content="HerNexa Editorial Team" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* JSON-LD Schema Markup */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
