import { Media } from './media';
import { Direction } from './direction';
import { Level } from './level';
import { Format } from './format';
import { Comment } from './comment';
import { SharedSeo } from './sharedSeo';

export interface Course {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title?: string;
  slug?: string;
  description?: string;
  image?: Media | null;
  text?: any;
  price?: number;
  duration?: string;
  direction?: Direction | null;
  level?: Level | null;
  formats?: Format[] | null;
  comments?: Comment[] | null;
  seo?: SharedSeo | null;
};
