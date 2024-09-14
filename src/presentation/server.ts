import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import {authRoutes, imageRoutes, userRoutes} from '../routes';

// function that connects to the database
import { connectToDatabase } from '../db';

// Load the environment variables
dotenv.config();

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
      this.app.use('/images', imageRoutes);

      // Start the server
      const PORT = process.env.PORT || 5001;

      this.app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Error starting server:', error);
    }
  }
}
