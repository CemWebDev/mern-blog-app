import express from 'express';
import { registerCtrl, loginCtrl } from './auth.controller.js';
import { signToken } from '../../utils/jwt.js';
import passport from 'passport';

const router = express.Router();

router.post('/register', registerCtrl);
router.post('/login', loginCtrl);

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'], session: false })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    const token = signToken(req.user);
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

export default router;
