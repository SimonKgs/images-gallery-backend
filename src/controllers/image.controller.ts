import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import ImageModel from '../models/image.model';
import { Image } from '../interfaces/image.interface';
import { getImageUrl, updateImageUrls } from '../utils/imageUtils';


//* GET ALL IMAGES
async function getAllImages(req: Request, res: Response) {

    try {

      // return all public images
      const images = await ImageModel.find({ isPrivate: false})

      // To convert the route of the images
      const fullImages = updateImageUrls(req, images);

      res.status(201).json({
        ok: true,
        images: fullImages
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

    // Updating the routes of the images
    const fullImages = updateImageUrls(req, images);

    res.status(201).json({
      ok: true,
      images: fullImages
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

    console.log("PATH: ", file.filename);
    
    // Create a new image instance
    const newImage = new ImageModel({
      title: req.body.title,
      image: file.filename, // now only store the name to scalability
      user: userId,
      isPrivate: isPrivateBool,
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

//* EDIT IMAGE
async function editImage(req: Request, res: Response) {
  
  try {
    const img_id  = req.params.img_id

    if (!img_id) res.status(400).json({ message: 'No id found' });
    
    const { title, isPrivate } = req.body;

    // Get the image stored to see if I can update if it exist
    // and if it is private 
    const existingImage = await ImageModel.findById(img_id);

    if (!existingImage) {
      return res.status(404).send('Image not found');
    }

    // it is not enough to check if a value comes also 
    // if it comes this needs to be a valid value for now lets limit to two
    // "on" because it comes like that from a form sometimes and the correct true
    // and if not match a correct value to update i need to keep the existing valui 
    let isPrivateReq: boolean;

    if (isPrivate === 'on' || isPrivate === true) {
      isPrivateReq = true;
    } else if (isPrivate === 'off' || isPrivate === false) {
      isPrivateReq = false;
    } else {
      isPrivateReq = existingImage.isPrivate;
    }

    console.log(isPrivateReq)

    // Update the image correctly and return the new image values
    const updatedImage = await ImageModel.findByIdAndUpdate(
      img_id,
      {
        title: title || existingImage.title,
        isPrivate: isPrivateReq,
        updatedAt: new Date()
      },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      image: updatedImage
    });

  } catch (error) {
    console.error('Error updating the image:', error);
    res.status(500).send('Internal Server Error');
  }
}


//* DELETE IMAGE
async function deleteImage (req: Request, res: Response) {
  
  try {

    const { id, img_id } = req.params

    if (!id || !img_id) res.status(400).json({ message: 'No id found' });

    const deletedImage: Image | null = await ImageModel.findByIdAndDelete(img_id);
    
    if (!deletedImage) {
      return res.status(404).send('Image not found');
    }

    const { image: imagePath } = deletedImage;

    // Resolve the absolute path of the image
    const fullPath = path.join(__dirname, '..', '..', 'public', 'assets', 'uploads', path.basename(imagePath)); 
  
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