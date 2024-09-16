import { Request } from 'express';
import { Image } from '../interfaces/image.interface';

// get the full URL for a single image
export function getImageUrl(req: Request, imagePath: string): string {
  return `${req.protocol}://${req.get('host')}/assets/uploads/${imagePath.replace('\\', '/')}`;
}

// update the path of the images
export function updateImageUrls(req: Request, images: Image[]): Image[] {
  return images.map(image => ({
    ...image.toObject(),
    image: getImageUrl(req, image.image)
  }));
}