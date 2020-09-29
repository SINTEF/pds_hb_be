import passport from 'passport';
import passportLocal from 'passport-local';

// import { User, UserType } from '../models/User';
import { UserModel } from '../models';
//import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((UserModel, done) => {
  done(undefined, UserModel.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});

/*
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    UserModel.findOne({ email: email.toLowerCase() }, (err, user: any) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(undefined, false, { message: `Email ${email} not found.` });
      }
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(undefined, user);
        }
        return done(undefined, false, { message: 'Invalid email or password.' });
      });
    });
  })
);

/**
 * Login Required middleware.
 */

// export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//   if (req.isAuthenticated()) {
//       return next();
//   }
//   res.redirect("/login");
// };

/**
 * Authorization Required middleware.
 */
// export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
//   const provider = req.path.split("/").slice(-1)[0];

//   const user = req.user as UserDocument;
//   if (_.find(user.tokens, { kind: provider })) {
//       next();
//   } else {
//       res.redirect(`/auth/${provider}`);
//   }
// };
