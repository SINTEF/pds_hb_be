import express = require('express');
import mongoose from 'mongoose';
import { IComponentDocument } from '../models/component/component.types';
import { IUserDocument } from '../models/user/user.types';

type TModel = IComponentDocument | IUserDocument;

interface IPrevous {
  page: number;
  limit: number;
}

interface INext {
  page: number;
  limit: number;
}

interface IResult {
  previous?: IPrevous;
  next?: INext;
  result: TModel[];
}

export const paginatedResults = (model: mongoose.Model<TModel>) => {
  return async (req: express.Request, res: express.Response): Promise<void> => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {} as IResult;

    // Check if we have a previous page
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    // Checks if we have a next page
    if (endIndex < model.length - 1) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    try {
      results.result = await model.find().limit(limit).skip(startIndex);
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};
