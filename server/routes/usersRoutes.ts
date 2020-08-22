import express from 'express';
import { user_sign_in, user_sign_up } from '../controllers/usersControllers';

const usersRoutes = express.Router();

usersRoutes.post('/signin', user_sign_in);
usersRoutes.post('/signup', user_sign_up);

export default usersRoutes;
