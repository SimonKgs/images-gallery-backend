import express from 'express';
import { login, register } from '../controllers/auth.controller';

const router = express.Router();

// Authentication routes
router.post('/login', login);
router.post('/register', register);

export default router