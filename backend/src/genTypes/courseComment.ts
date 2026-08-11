import { User } from './user';

export interface CourseComment {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title?: string;
  text?: string;
  isApproved?: boolean;
  users_permissions_user?: User | null;
};
