import express from 'express';
import { getAllImages, getUserImages, uploadImage, editImage, deleteImage } from '../controllers/image.controller';

const router = express.Router();

router.get('/', getAllImages);
router.get('/user/:id', getUserImages);
router.post('/user/:id', uploadImage);
router.put('/user/:id/images/:img_id/edit', editImage);
router.delete('/user/:id/images/:img_id', deleteImage);

export default router;