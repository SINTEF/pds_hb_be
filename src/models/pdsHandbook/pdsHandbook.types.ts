import { Document } from 'mongoose';

export interface IPdsHandbook {
  chapters: [
    {
      id: number;
      text?: string;
      editedBy?: string;
      lastUpdated?: Date;
    }
  ];
}

export interface IPdsHandbookDocument extends IPdsHandbook, Document {}
