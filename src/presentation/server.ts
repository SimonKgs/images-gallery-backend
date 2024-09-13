import express from 'express';
import cors from 'cors';
import UserModel from '../models/user.model';
import authRoutes from '../routes/auth.routes';
import userRoutes from '../routes/user.routes';
import mainRoutes from '../routes/main.routes';

// Import the function that connects to the database
import { connectToDatabase } from '../db';

// Function to insert a user
async function insertUser() {
  try {
    const user = new UserModel({
      username: 'juan',
      email: 'juan@example.com',
      passwordHash: '$2b$10$...', // This should be a hashed password
      profileImage: 'http://127.0.0.1/assets/images/juan.jpg',
      images: ['http://127.0.0.1/assets/images/photo1.jpg'],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await user.save();
    console.log('Inserted user with id:', result._id);
    return result; // Return the result to use in the route
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error; // Propagate the error
  }
}

export class Server {
  private app = express();

  async start() {
    try {
      // Connect to the database
      await connectToDatabase();

      // Enable CORS
      this.app.use(cors());

      // Middleware to parse JSON
      this.app.use(express.json());

      // Serve static files if needed
      this.app.use(express.static('public'));

      // Use routes
      this.app.use('/auth', authRoutes);
      this.app.use('/user', userRoutes);
      this.app.use('/', mainRoutes);

      // Start the server
      this.app.listen(5000, () => {
        console.log(`Server running on port ${5000}`);
      });
    } catch (error) {
      console.error('Error starting server:', error);
    }
  }
}
