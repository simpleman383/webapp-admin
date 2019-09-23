import express from 'express'
import userapi from '../../../api/users'
import { nextTick } from 'q';

const router = express.Router();

router
    .get('/users', (req, res) => userapi.getUsers(req, res))
    .get('/users/:username', (req, res) => userapi.getUser(req, res))
    .post('/users', (req, res) => userapi.saveUser(req, res))
    .put('/users/:username', (req, res) => userapi.updateUser(req, res))
    .delete('/users', (req, res) => userapi.deleteUsers(req, res))
    .delete('/users/:username', (req, res) => userapi.deleteUser(req, res))



export default router;