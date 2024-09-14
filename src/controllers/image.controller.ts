import { Request, Response } from 'express';
import ImageModel from '../models/image.model';
import { Image } from '../interfaces/image.interface';

async function getAllImages(req: Request, res: Response) {

    try {

      // return all public images
      const images = await ImageModel.find({ isPrivate: false})

      res.status(201).json({
        ok: true,
        images
      });

    } catch (error) {
      console.error('Error loading the images:', error);
      res.status(500).send('Internal Server Error');
    }
}

async function getUserImages(req: Request, res: Response) {
  // Handle registration logic
}

async function uploadImage(req: Request, res: Response) {
  try {

    const userId: string = req.params.id;
    const ImageData: Image = req.body;
    
    
    // Create a new user instance
    const newImage = new ImageModel({
      ...ImageData,
      user: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save the new user to the database
    const result: Image = await newImage.save();

    // Destructuring the values to a clean response
    const { title, image, isPrivate, user, _id: id } = result.toObject();
    
    // Respond with the created user
    res.status(201).json({
      ok: true,
      id,
      title,
      image,
      isPrivate,
      user,
    });

  } catch (error) {

    console.error('Error Uploading the image:', error);
    res.status(500).send('Internal Server Error');

  }
}

async function editImage(req: Request, res: Response) {
  // Handle registration logic
}

async function deleteImage (req: Request, res: Response) {
  // Handle registration logic
}


export {
    getAllImages,
    getUserImages,
    uploadImage,
    editImage,
    deleteImage
}