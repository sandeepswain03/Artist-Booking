import mongoose, { Mongoose, ConnectOptions } from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // Check if already connected
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    // Ensure all environment variables are set
    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASSWORD;
    const dbHost = process.env.DB_HOST;
    const dbName = process.env.DB_NAME;

    if (!dbUser || !dbPassword || !dbHost || !dbName) {
      throw new Error("Database credentials are not properly set in environment variables.");
    }

    // Connect to MongoDB
    const db: Mongoose = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );

    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected Successfully");
  } catch (error: unknown) {
    console.error("DB Connection Failed", error);

    // Handle more specific errors if needed
    if (error instanceof Error && error.name === 'MongoNetworkError') {
      console.error("Network error while connecting to MongoDB. Check your network and connection string.");
    }

    // Optional: exit the process on failure in non-development environments
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

export default dbConnect;
