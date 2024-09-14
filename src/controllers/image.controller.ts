import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import ImageModel from '../models/image.model';
import { Image } from '../interfaces/image.interface';


//* GET ALL IMAGES
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

//* GET USER IMAGES
async function getUserImages(req: Request, res: Response) {
  try {

    const userId: string = req.params.id;
    
    // return all images of the user
    const images = await ImageModel.find({ user: userId})

    res.status(201).json({
      ok: true,
      images
    });

  } catch (error) {
    console.error('Error loading the images:', error);
    res.status(500).send('Internal Server Error');
  }
}


//* UPLOAD IMAGE
async function uploadImage(req: Request, res: Response) {


  try {
    const userId: string = req.params.id;
    const file = req.file;

    // Check if the image is uploaded
    if (!file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Check for title in the body
    if (!req.body.title) {
      return res.status(400).json({ message: 'img title is required' });
    }

    // Convert isPrivate to boolean, it comes 
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

//TODO: EDIT IMAGE
async function editImage(req: Request, res: Response) {
  // Handle registration logic
}


//* DELETE IMAGE
async function deleteImage (req: Request, res: Response) {
  
  try {

    const { id, img_id } = req.params

    if (!id || !img_id) return;


    const deletedImage: Image | null = await ImageModel.findByIdAndDelete(img_id);
    
    if (!deletedImage) {
      return res.status(404).send('Image not found');
    }

    const { image: imagePath } = deletedImage;

    // Resolve the absolute path of the image
    const fullPath = path.resolve(imagePath);

    // Delete the image file
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error('Error deleting the file:', err);
        return res.status(500).send('Error deleting the file');
      }

      // console.log('File deleted:', fullPath);
      res.status(200).json({
        ok: true,
        message: `Image ${img_id} deleted successfully`
      });
    });
  } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).send('Internal Server Error');
  }

}


export {
    getAllImages,
    getUserImages,
    uploadImage,
    editImage,
    deleteImage
}