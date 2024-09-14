import express from 'express';
import { getUser, updateUser, deleteUser, createUser } from '../controllers/user.controller';
import { createUserValidations, updateUserValidations, validate, validateObjectId } from '../middlewares/user.validation.middleware';
import { authMiddleware, authOwnershipMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();


router.post('/', createUserValidations(), validate, createUser);
router.get('/:id', authMiddleware, validateObjectId, getUser);
router.patch('/:id', authOwnershipMiddleware, validateObjectId, updateUserValidations(), validate, updateUser);
router.delete('/:id', authOwnershipMiddleware, validateObjectId, deleteUser);



export default router;
