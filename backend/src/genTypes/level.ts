import { SharedLocaleField } from './sharedLocaleField';
import { Course } from './course';

export interface Level {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title?: string;
  slug?: string;
  translations?: SharedLocaleField[] | null;
  courses?: Course[] | null;
};
