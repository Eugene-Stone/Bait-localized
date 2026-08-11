import { Media } from './media';

export interface Footer {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title?: string;
  logo?: Media | null;
  topText?: any;
  bottomText?: any;
  copyright?: string;
};
