import jsonwebtoken from 'jsonwebtoken';
import { IUserDocument } from '../models/user/user.types';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../config/.env') });

interface Ijsonwebtoken {
  token: string;
  expiresIn: string;
}

export const issueJWT = (user: IUserDocument): Ijsonwebtoken => {
  const _id = user._id;
  const { username, userGroupType, email, phoneNr, companyName } = user;

  const expiresIn = '1d';
  const SECRET_KEY = process.env.SECRET_KEY;
  if (!SECRET_KEY) throw Error('Could not find key');

  const payload = {
    sub: _id,
    iat: Math.floor(Date.now() / 1000),
    username,
    userGroupType,
    email,
    phoneNr,
    companyName,
  };

  const signedToken = jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn });
  return {
    token: 'Bearer ' + signedToken,
    expiresIn,
  };
};
