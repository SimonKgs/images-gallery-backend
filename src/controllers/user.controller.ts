import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';


import UserModel from '../models/user.model';
import { User } from '../interfaces/user.interface';

const saltRounds = 15;


//* GET USER
async function getUser(req: Request, res: Response) {

  const userId = req.params.id;

  try {

    const user: User | null = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const { username, email, profileImage } = user;

    res.json({
      ok: true,
      name: username,
      profileImage,
      email,
    });

  } catch (error) {

    console.error('Error fetching user:', error);
    res.status(500).send('Server error');

  }
}


//* CREATE USER
async function createUser(req: Request, res: Response) {

  try {

    const userData: User = req.body;

    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    
    // Create a new user instance
    const newUser = new UserModel({
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save the new user to the database
    const result = await newUser.save();

    // Destructuring the values to a clean response
    const { username, email, _id: id } = result.toObject();
    
    // Respond with the created user
    res.status(201).json({
      ok: true,
      id,
      username,
      email,
    });

  } catch (error) {

    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');

  }
}


//* UPDATE USER
async function updateUser(req: Request, res: Response) {
  const userId = req.params.id;
  const updateData: Partial<User> = req.body;

  try {

    // First check if the email is being updated
    // and if it is unique and if it is not the same as the user
    if (updateData.email) {

      const existingUser = await UserModel.findOne({ email: updateData.email });

      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    // Hash the new password if it is provided
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
      delete updateData.password; // Remove plain password field
    }

    // Set the updatedAt field to the current date
    updateData.updatedAt = new Date();

    // Perform the update, return the { new } instead the previous one
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }


    // Respond with the updated user
    res.json({
      ok: true,
      id: updatedUser._id,
      message: `User Updated Successfully ${updatedUser.email}`,
    });

  } catch (error) {

  }
}


//* DELETE USER
async function deleteUser(req: Request, res: Response) {

  const userId = req.params.id;

  try {

    // delete the suer
    const deletedUser: User | null = await UserModel.findByIdAndDelete(userId);

    // check it 
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }

    const { username, email } = deletedUser;

    res.json({
      ok: true,
      message: 'User deleted successfully',
      name: username,
      email
    })

  } catch (error) {

    console.error('Error deleting user:', error);
    res.status(500).send('Server error');

  }
  
}



export {

  createUser,
  getUser,
  updateUser,
  deleteUser,

}