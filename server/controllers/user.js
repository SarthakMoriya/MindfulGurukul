import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";
// SIGNUP
export const signup = async (req, res) => {
  try {
    const { username, password, email, gender, contacted, phone, city, state } =
      req.body;
    console.log(JSON.stringify(req.body.contacted));
    const existingUser = await User.findOne({ email });
    const existingPhone = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        message: "Existing User! Provide a Unique Email Address",
        ok: false,
      });
    }
    if (existingPhone) {
      return res.status(400).json({
        message: "Phone No. already in use!",
        ok: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      gender,
      contacted,
      city,
      state,
    });

    // You should not call User.save() here, as you have already created the user.

    res.status(200).json({ message: "Account Created!" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(400).json({
      message: "Error creating account",
      error: error.message,
      ok: false,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isValidUser = await User.findOne({ email });
    if (!isValidUser) {
      return res.status(403).json({
        message: "Invalid Credentials!",
        error: "Invalid Email",
        ok: false,
      });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      isValidUser.password
    );

    if (!isValidPassword) {
      return res.status(403).json({
        message: "Invalid Credentials!",
        error: "Wrong password",
        ok: false,
      });
    }

    const token = jwt.sign(
      { id: isValidUser._id, email: isValidUser.email },
      process.env.JWT_PASSWORD,
      {
        expiresIn: "1h",
      }
    );
    const { password: pass, ...others } = isValidUser._doc;

    return res.status(200).json({
      token,
      user: others,
      ok: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating account", error: error, ok: false });
  }
};
