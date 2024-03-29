import mongoose from "mongoose";

const connection = {};

export const connectToDb = async () => {
  try {
    // Check if there is already a connection
    if (connection.isConnected) {
      console.log("Using existing database connection");
      return;
    }
    
    // Connect to the MongoDB database using the URI from the environment variable
    const db = await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });


    connection.isConnected = db.connections[0].readyState;

    console.log("Connected to MongoDB");
  } catch (error) {
  
    console.error("Error connecting to MongoDB:", error.message);
  }
};
