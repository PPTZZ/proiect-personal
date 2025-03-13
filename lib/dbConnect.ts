import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect("mongodb://localhost:27017/SlimMom");
    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;
