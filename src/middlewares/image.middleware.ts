import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import path from 'path';

// List of allowed extensions
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']; 

// Middleware to validate image extension
export const imageExtensionValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  
    const imagePath = req.body.image;

    if (!imagePath) {
        return res.status(400).send('No image provided');
    }

    // with path i can extract the path easier
    const extension = path.extname(imagePath).toLowerCase();

    // Check if the extension is in the list of allowed extensions
    if (!allowedExtensions.includes(extension)) {
        return res.status(400).send('Invalid file type');
    }

    next();
};


export const uploadImageValidations = () => [
    body('title')
        .isString()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 20 }).withMessage('Image title must be between 3 and 20 characters'),
    body('image')
        .isString()
        .notEmpty().withMessage('Image is required'),
    body('isPrivate')
        .optional()
        .isBoolean()
  ];
  
export const updateImageValidations = () => [
body('title')
    .optional()
    .isString()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 20 }).withMessage('Image title must be between 3 and 20 characters'),
body('image')
    .optional()
    .isString()
    .notEmpty().withMessage('Image is required'),
body('isPrivate')
    .optional()
    .isBoolean()
];


export const validateImg = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};