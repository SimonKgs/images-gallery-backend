import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/user.model';
import { generateToken } from '../utils/jwt';

export const loginUser = async (req: Request, res: Response) => {

  try {

    const { email, password } = req.body;

    // Find user
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    res.json({
      ok: true,
      token,
      id: user._id,
      username: user.username,
      email: user.email,
    });

  } catch (error) {

    console.error('Error logging in user:', error);
    res.status(500).send('Internal Server Error');

  }
};
