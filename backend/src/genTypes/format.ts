import { SharedLocaleField } from './sharedLocaleField';

export interface Format {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title?: string;
  slug?: string;
  translations?: SharedLocaleField[] | null;
};
