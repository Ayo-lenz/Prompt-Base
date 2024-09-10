import mongoose from "mongoose";
// we use mongoose to connect or hook it up to a database

let isConnected = false; // track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true); //this simply set the mongoose options, if we don't do it we wil get a warning in the console

  // now we check if we are connected
  if (isConnected) {
    console.log("MongoBD is already connected");
    return;
  }

  //if we are not already connected, we establish the connection with the try and catch block
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true;
    console.log('MongoDB connected')

  } catch (error) {
    console.log(error);
  }
};

// now we head to the mongoDB ATLAS which is an online cloud storage to our database