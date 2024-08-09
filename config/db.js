import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connected successfully ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDb ${error}`.bgRed.white);
  }
};

export default connectDB;
