import express from 'express';
import passport from 'passport';
import authRouter from './auth';
import usersRouter from './users';
import glossaryRouter from './glossary';

const router = express.Router();

router
    .use(passport.initialize())
    .use(passport.session())
    .use(authRouter)
    .use(usersRouter)
    .use(glossaryRouter)

export default router;