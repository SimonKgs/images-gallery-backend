import express from 'express';
import cors from 'cors';

import { connectToDatabase } from '../db';

async function insertUser() {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');
  
    const user = {
      username: 'juan',
      email: 'juan@example.com',
      passwordHash: '$2b$10$...', // This should be a hashed password
      profileImage: 'http://127.0.0.1/assets/images/juan.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  
    const result = await usersCollection.insertOne(user);
    
    // Fetch the inserted user
    const insertedUser = await usersCollection.findOne({ _id: result.insertedId });

    console.log('Inserted user:', insertedUser);
    return insertedUser;
}

export class Server {

    private app = express();

    async start() {

        // Connect to the database
        const db = await connectToDatabase();

        //* Enable CORS
        this.app.use(cors());

        //* Middlewares
        
        //* Public Folder
        this.app.use( express.static( 'public' ));

        // routes
        this.app.get( '/about', async(req, res) => {
            
           const user = await insertUser().catch(console.error);
           console.log('USER FROM ENDPOINT', user);
           
        })


        
        this.app.listen(5000, () => {
            console.log(`Server running on port ${ 5000 }`);
        })

    }

}