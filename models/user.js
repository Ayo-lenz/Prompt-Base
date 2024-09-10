import { Schema, model, models } from "mongoose";


// this code explains the information i want the user to provide while signing in
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exist!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

const User = models.User || model('User', UserSchema);

export default User;

/*
**** Usually if we are working with a regular express backend we say something like the function below
  const User = model('User', UserSchema);

  export default User;

********we do this if we are working with a regular always on and running backend server
// The "models object is provided by the Mongoose library ans stores all the registered models"
// If a model named "User" already exists in the models object, it assigns that existing model to 
the "User" variable.
// This prevent redefining the model and ensures that the existing model is reused.

// If a model named "User" does not exist in the "models" object, the "model" function from 
Mongoose is called to create a new model.
// The newly created model is then assigned to the "User" variable.

*/