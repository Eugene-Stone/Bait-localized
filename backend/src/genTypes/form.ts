

export interface Form {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title?: string;
  description?: string;
  submitUrl?: string;
  successMessage?: string;
  errorMessage?: string;
  fields?: any;
};
