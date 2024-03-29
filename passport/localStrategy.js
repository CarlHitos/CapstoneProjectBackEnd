const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');
const { validoPass } = require('../utils/auth');

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secreto',
    },
    async function (jwtPayload, done) {
      try {
        const user = await User.findById(jwtPayload.user);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);


passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async function (email, password, done) {
      
      try {
        let user = await User.findOne({ email }).select('+password');
        if (!user) {
          console.log('Usuario no encontrado');
          return done(null, false);
        }
        
        if (!validoPass(password, user.password.hash, user.password.salt)) {
          console.log('Contraseña incorrecta');
          return done(null, false);
        }
        console.log('Login correcto');

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
