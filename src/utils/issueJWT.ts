import jsonwebtoken from 'jsonwebtoken';
import { IUserDocument } from '../models/user/user.types';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../config/.env') });

interface Ijsonwebtoken {
  token: string;
  //expiresIn: string;
}

export const issueJWT = (user: IUserDocument): Ijsonwebtoken => {
  const _id = user._id;
  const username = user.username;
  const userGroupId = user.userGroupId;
  // const expiresIn = '10s'; // TODO: '1d' -> 1 day
  const SECRET_KEY = process.env.SECRET_KEY;
  if (!SECRET_KEY) throw Error('Could not find key for jwt');

  const payload = {
    id: _id,
    iat: Date.now(),
    username,
    userGroupId,
    exp: Math.floor(Date.now() / 1000) + 20,
  };
  // console.log(payload.exp)

  const signedToken = jsonwebtoken.sign(payload, SECRET_KEY);
  return {
    token: 'Bearer ' + signedToken,
  };
};
