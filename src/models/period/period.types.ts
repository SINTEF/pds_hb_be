import { Document } from 'mongoose';

type TStatus = 'published' | 'approved' | 'not approved' | 'not reviewed';

export interface IPeriod {
  tag: string;
  startDate: Date;
  endDate: Date;
  company: string;
  numberOfTests?: number;
  created?: Date;
}

export interface IPeriodDocument extends IPeriod, Document {}
