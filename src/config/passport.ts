import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, './.env') });

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
  //ignoreExpiration: false,
};

passport.use(
  new Strategy(options, (jwt_payload, done) => {
    UserModel.findOne({ _id: jwt_payload.sub }, function (err, user) {
      if (err) return done(err, false);
      if (!user) return done(null, false);
      return done(null, user);
    });
  })
);
