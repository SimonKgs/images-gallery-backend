// controllers/registerUser.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/user.model';
import { generateToken } from '../utils/jwt';

const saltRounds = 10;

export async function registerUser(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await newUser.save();

    // Generate JWT token
    const token = generateToken(result._id.toString());

    res.status(201).json({
      ok: true,
      token,
      id: result._id,
      username: result.username,
      email: result.email,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
}
