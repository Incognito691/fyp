import jwt from "jsonwebtoken";

const generateToken = (id) => {
  // Create a new token using the User's ID and our Secret Key
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" }); // expired in 30 days
};

export default generateToken;
