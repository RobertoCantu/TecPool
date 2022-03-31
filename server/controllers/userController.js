import asyncHandler from "express-async-handler"; // Middleware handling exceptions inside async express routes

// Models

import User from "../models/userModel.js";

// Utils

import generateToken from "../utils/generateToken.js";

//@description     Creates the user
//@route           POST /users/createUser
//@access          Public
const createUser = asyncHandler(async(req, res) => {
  const { name, lastName, email, phone, password } = req.body;

  // Valite if user already exists on db
  const userExists = await User.findOne({email});

  if(userExists){
    res.status(400);
    throw new Error("User al ready exists on db") // TODO: handle error in a different way
  }

  // Create new user on db
  const user = await User.create({
    name,
    lastName,
    email,
    phone,
    password,
  })

  // User successfully created on db
  if(user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id), // Send token to frontend for uthenticate user to our backend
    })
  } else {
    res.status(400);
    throw new Error("Error ocurred while creating user")
  }
})

//@description     Auth the user
//@route           POST /users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user on db
  const user = await User.findOne({ email });

  // If user exists and password is correct
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      lastName: user.lastnAME,
      phone: user.phone,
      email: user.email,
      token: generateToken(user._id),
    });
  } else { // User not found or incorrect password
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

export { createUser, authUser };
