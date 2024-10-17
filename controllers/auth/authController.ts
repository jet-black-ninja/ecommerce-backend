import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

const saltRounds = process.env.BC_SALT || 12;

// Register User
const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { userName, email, password } = req.body;

  // Check if password is undefined or empty
  if (!password) {
    res.status(400).json({
      success: false,
      message: 'Password is required',
    });
    return;
  }
  // Debugging log

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      res.status(409).json({
        success: false,
        message: 'User Already exists with the same email. Please try again',
      });
      return;
    }

    // Hash password using bcrypt with 12 salt rounds
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: 'Registration Successful',
    });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({
      success: false,
      message: 'Some Error in Registration',
    });
  }
};

// Login User
const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      res.status(401).json({
        success: false,
        message: 'User not found, please register first',
      });
      return;
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid Password',
      });
      return;
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      `${process.env.TOKEN_SECRET_KEY}`,
      { expiresIn: process.env.TOKEN_EXPIRE_TIME }
    );

    res.cookie('token', token, { httpOnly: true, secure: false }).json({
      success: true,
      message: 'Login Successful',
      user: {
        email: checkUser.email,
        userName: checkUser.userName,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Some Error in Login',
    });
  }
};

// Logout User
const logoutUser = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('token').json({
    success: true,
    message: 'Logged Out User',
  });
};

// Auth Middleware
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized, No Token Provided',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY as string);
    req.user = decoded; // Now TypeScript knows about req.user
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({
      success: false,
      message: 'Invalid Token',
    });
  }
};

export { registerUser, loginUser, logoutUser, authMiddleware };
