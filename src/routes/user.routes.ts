import express from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/user.controller';

const router = express.Router();

// User routes
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// User images routes
router.post('/:id/images', (req, res) => {
  // Handle image upload logic
});
router.put('/:id/images/:img_id/edit', (req, res) => {
  // Handle image editing logic
});

export default router;
