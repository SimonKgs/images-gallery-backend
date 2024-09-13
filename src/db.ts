// db.ts
import { MongoClient } from 'mongodb';

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function connectToDatabase() {
    
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to database");

    // Specify the database to use
    return client.db("myDatabase");

  } catch (error) {
    console.error("Failed to connect to the database", error);
    throw error;
  }
}
