import { Media } from './media';

export interface LayoutSeo {
  id?: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalURL?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: Media | null;
  structuredData?: string;
  noindex?: boolean;
  nofollow?: boolean;
};
