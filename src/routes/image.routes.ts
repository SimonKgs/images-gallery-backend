import express from 'express';
import { getAllImages, getUserImages, uploadImage, editImage, deleteImage } from '../controllers/image.controller';
import { imageExtensionValidationMiddleware, updateImageValidations, uploadImageValidations, validateImg } from '../middlewares/image.middleware';
import { authOwnershipMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

// I will permit any user to see all the public images
// but for the fields related to the user I use the authMiddlewares to check the user
router.get('/',  getAllImages);
router.get('/user/:id', authOwnershipMiddleware, getUserImages);
router.post('/user/:id',
    uploadImageValidations(),
    authOwnershipMiddleware,
    imageExtensionValidationMiddleware,
    validateImg, 
    uploadImage
);
router.patch('/user/:id/images/:img_id/edit',
    updateImageValidations(),
    authOwnershipMiddleware,
    imageExtensionValidationMiddleware,
    validateImg,
    editImage
);
router.delete('/user/:id/images/:img_id', authOwnershipMiddleware, deleteImage);

export default router;