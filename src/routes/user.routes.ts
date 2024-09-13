import express from 'express';
import { getUser, updateUser, deleteUser, createUser } from '../controllers/user.controller';
import { createUserValidations, updateUserValidations, validate, validateObjectId } from '../middlewares/user.validation.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();


router.post('/', createUserValidations(), validate, createUser);
router.get('/:id', authMiddleware, validateObjectId, getUser);
router.patch('/:id', authMiddleware, validateObjectId, updateUserValidations(), validate, updateUser);
router.delete('/:id', authMiddleware, validateObjectId, deleteUser);



export default router;
