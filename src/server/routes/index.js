import express from 'express';
import bodyParser from 'body-parser';
import administrationRouter from './admin';

const router = express.Router();

router
    .use(bodyParser.json())
    .use('/admin', administrationRouter);

export default router;