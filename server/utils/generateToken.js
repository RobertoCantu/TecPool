import jwt from "jsonwebtoken";

// Generate and return encrypted token
const generateToken = (id) => { // User id from db
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;