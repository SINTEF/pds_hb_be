import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config({ path: path.resolve(__dirname, './.env') });

interface IToken {
  sub: string;
  iat: number;
  username: string;
  userGroupType: string;
  email: string;
  phoneNr: string;
  companyName: string;
  exp: number;
}

interface IChecks {
  checkAdmin?: boolean;
  checkCompany?: boolean;
  checkAdminOrCompany?: boolean;
  checkAdminOrUser?: boolean;
  checkAdminOrUsername?: boolean;
  companyName?: string;
  userId?: string;
  username?: string;
}

const performChecks = (req: express.Request, checks: IChecks) => {
  const token = req.headers.authorization?.split(' ')[1];
  const secret_key = process.env.SECRET_KEY;

  if (token && typeof token === 'string' && secret_key) {
    const decoded_token = jsonwebtoken.verify(token, secret_key) as IToken;
    const { checkAdmin, checkCompany, checkAdminOrCompany, checkAdminOrUser, checkAdminOrUsername, companyName, userId, username } = checks;

    if (checkAdmin) {
      if (decoded_token.userGroupType !== 'admin') return false;
    } else if (checkCompany) {
      if (decoded_token.companyName !== companyName) return false;
    } else if (checkAdminOrCompany) {
      if (!(decoded_token.userGroupType === 'admin' || decoded_token.companyName === companyName)) return false;
    } else if (checkAdminOrUser) {
      if (!(decoded_token.userGroupType === 'admin' || decoded_token.sub === userId)) return false;
    } else if (checkAdminOrUsername) {
      if (!(decoded_token.userGroupType === 'admin' || decoded_token.username === username)) return false;
    }
    return true;
  }
  return false;
};

export const checkAuthorization = (req: express.Request, res: express.Response, checks: IChecks): boolean => {
  const authorized = performChecks(req, checks);
  if (!authorized) {
    res.status(400).send({
      success: false,
      message: 'Unauthorized',
    });
  }
  return authorized;
};
