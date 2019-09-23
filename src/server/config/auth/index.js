import passport from 'passport';
import local from 'passport-local';
import jwt from 'express-jwt';
import Users from '../schemas/users';

const LocalStrategy = local.Strategy;





passport.use(new LocalStrategy({ usernameField: 'login' },(username, password, done) => {      
        Users.findOne({ username })
          .then(user => {

            if(!user || !user.validatePassword(password)) {
                return done(true, null, null);
            }

            return done(null, user);
          })
          .catch(err => done(err));

}))


const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),

  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

export default passport;

export { auth }