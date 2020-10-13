import { Document } from 'mongoose';

export interface IPdsHandbook {
  chapterId: string;
  text?: string;
  editedBy?: string;
  lastUpdated?: Date;
}

export interface IPdsHandbookDocument extends IPdsHandbook, Document {}
