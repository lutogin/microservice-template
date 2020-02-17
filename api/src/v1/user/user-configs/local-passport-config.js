import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userDao from '../user-daos/user-dao';
import passwordService from '../user-helpers/user-password-helper';

const getLocalBehavior = dao =>
  async function localStrategyBehaviorPro(email, password, done) {
    try {
      const message = 'Incorrect authentication data';
      const user = await dao.getWithAuth({ email });
      if (!user) {
        return done(null, false, message);
      }
      if (!(user.auth && user.auth.passwordHash) || !passwordService.valid(user, password)) {
        return done(null, false, message);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  };

const options = {
  usernameField: 'email',
  passwordField: 'password',
};

const makeLocalStratagy = dao => new LocalStrategy(options, getLocalBehavior(dao));

const localStrategy = makeLocalStratagy(userDao);

passport.use('local', localStrategy);
