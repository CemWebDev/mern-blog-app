import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../modules/auth/auth.model.js';

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const githubId = profile.id;
      const email = profile.emails?.[0]?.value;
      let user = await User.findOne({ githubId });
      if (!user) {
        user = await User.create({
          username: profile.username,
          email,
          githubId,
        });
      }
      return done(null, user);
    }
  )
);
