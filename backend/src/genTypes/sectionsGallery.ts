import { Gallery } from './gallery';

export interface SectionsGallery {
  id?: number;
  title?: string;
  description?: string;
  gallery?: Gallery | null;
  anchor?: string;
};
