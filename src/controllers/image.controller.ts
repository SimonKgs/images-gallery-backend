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
    const file = req.file;

    // console.log(req.file); // For the uploaded file
    // console.log(req.body); // For the form fields

    // Check if the image is uploaded
    if (!file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Check for title in the body
    if (!req.body.title) {
      return res.status(400).json({ message: 'img title is required' });
    }

    // Convert isPrivate to boolean
    const isPrivateBool = req.body.isPrivate === 'on' || req.body.isPrivate === 'true';
    
    // Create a new image instance
    const newImage = new ImageModel({
      title: req.body.title,
      image: file.path, // Store the image path
      user: userId,
      isPrivate: isPrivateBool, // Default to false if not provided
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save the image to the database
    const result: Image = await newImage.save();

    // Destructure and send a clean response
    const { title, image, isPrivate, user, _id: id } = result.toObject();

    // Respond with the created image details
    res.status(201).json({
      ok: true,
      id,
      title,
      image, // Path to the saved image
      isPrivate,
      user,
    });

  } catch (error) {
    console.error('Error uploading the image:', error);
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