import { User } from './user';

export interface Review {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title?: string;
  rating?: number;
  text?: string;
  isApproved?: boolean;
  user?: User | null;
};
