import { User } from './user';
import { Course } from './course';

export interface Comment {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title?: string;
  text?: string;
  isApproved?: boolean;
  user?: User | null;
  course?: Course | null;
};
