import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  schema?: object | object[];
}

export default function SEO(props: SEOProps) { 
  return null; 
}
