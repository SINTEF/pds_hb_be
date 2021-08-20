import { Document } from 'mongoose';

export interface IComment {
  company: string;
  notificationNumber: string;
  content: string;
  author?: string;
  created?: Date;
}

export interface ICommentDocument extends IComment, Document {}
