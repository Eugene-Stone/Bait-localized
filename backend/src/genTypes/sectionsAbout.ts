import { Media } from './media';

export interface SectionsAbout {
  id?: number;
  title?: string;
  description?: string;
  text?: any;
  image?: Media | null;
  anchor?: string;
};
