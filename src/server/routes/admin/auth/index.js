import express from 'express';
import passport from '../../../config/auth'
import { response, error } from '../../../utils';

const router = express.Router();

router.post('/login', (req, res) => {
    const { login, password } = req.body;
    
    if (!login || !password) {
        return response.error(res)(error.WRONG_CREDENTIALS);
    }

    return passport.authenticate('local', { session: false }, (err, user, info) => {
        
        if (err) {
            return response.error(res)(error.WRONG_CREDENTIALS);
        }


        if (user) {
            return response.success(res)(user.toAuthJSON())
        }


        return response.error(res)(error.WRONG_CREDENTIALS);
    } )(req, res)


})


export default router;