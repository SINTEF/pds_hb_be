import { model } from 'mongoose';
import { ICommentDocument } from './comment.types';
import { CommentSchema } from './comment.schema';

export const CommentModel = model<ICommentDocument>('comment', CommentSchema);
