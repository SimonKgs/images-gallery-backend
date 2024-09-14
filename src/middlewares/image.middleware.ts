import { body, validationResult } from 'express-validator';

export const uploadImageValidations = () => [
    body('title')
        .isString()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 20 }).withMessage('Image title must be between 3 and 20 characters'),
  ];
  
export const updateImageValidations = () => [
    body('title')
        .optional()
        .isString()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 20 }).withMessage('Image title must be between 3 and 20 characters'),
];


export const validateImg = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};