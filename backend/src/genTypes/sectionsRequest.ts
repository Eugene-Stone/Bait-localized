import { Form } from './form';

export interface SectionsRequest {
  id?: number;
  title?: string;
  description?: string;
  form?: Form | null;
  anchor?: string;
};
