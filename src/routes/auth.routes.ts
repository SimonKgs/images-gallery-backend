import express from 'express';
import { loginUser } from '../controllers/loginUser.controller';
import { registerUser } from '../controllers/registerUser.controller';



const router = express.Router();

// Authentication routes
router.post('/login', loginUser);
router.post('/register', registerUser);

export default router