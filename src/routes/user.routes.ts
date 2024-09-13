import express from 'express';
import { getUser, updateUser, deleteUser, createUser } from '../controllers/user.controller';
import { createUserValidations, updateUserValidations, validate, validateObjectId } from '../middlewares/user.validation.middleware';

const router = express.Router();


router.post('/', createUserValidations(), validate, createUser);
router.get('/:id', validateObjectId, getUser);
router.patch('/:id', validateObjectId, updateUserValidations(), validate, updateUser);
router.delete('/:id', validateObjectId, deleteUser);

export default router;
