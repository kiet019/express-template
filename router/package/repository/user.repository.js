import {  userModel } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtString, saltRounds } from "../config.js";
import { getToken } from "../util.js";
export class UserRepository {
  // Find a user by ID
  async findUserById(userId) {
    return await userModel.findById(userId);
  }

  // Find a user by username
  async findUserByUsername(username) {
    return await userModel.findOne({ username });
  }

  async checkUserExist(username) {
    const user = await this.findUserByUsername(username);
    return user !== null;
  }
  async updatePassword(
    userId,
    oldPassword,
    newPassword){
    if (newPassword && newPassword.length === 0) {
      throw new Error("New password is not empty");
    }
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    const user = (await this.findUserById(userId)) ;
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      throw new Error("Old password is not match");
    }
    return await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          password: hashedPassword,
        },
      },
      {
        new: true,
      }
    );
  }

  // Update a user by ID
  async updateUser(
    userId,
    updateData
  ) {
    if (updateData.YOB <= 0) {
      throw new Error("Year of age is more than 0");
    }
    if (updateData.name.length === 0) {
      throw new Error("Name is not empty");
    }
    return await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: updateData.name,
          YOB: updateData.YOB,
        },
      },
      {
        new: true,
      }
    );
  }

  // List all users
  async getAllUsers() {
    return await userModel.find();
  }

  async getAllNonAdminUsers() {
    return await userModel.find({ isAdmin: false });
  }

  async registerUser(userData) {
    // Hash the user's password using bcrypt
    if (userData.username.length === 0) {
      throw new Error("Username is not empty");
    }
    if (userData.name.length === 0) {
      throw new Error("Name is not empty");
    }
    if (userData.YOB <= 0) {
      throw new Error("YOB is more than 0");
    }
    if (userData.password.length < 6) {
      throw new Error("Password must have at least 6 character");
    }
    if (await this.checkUserExist(userData.username)) {
      throw new Error("Username is exist");
    }
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Create a new user with the hashed password
    const user = new userModel({
      username: userData.username,
      password: hashedPassword,
      name: userData.name,
      YOB: userData.YOB,
      isAdmin: false,
    });

    return await user.save();
  }

  async loginUser(username, password) {
    try {
      const user = (await userModel.findOne({ username })) ;

      if (!user) {
        throw new Error("Incorrect username");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Incorrect password");
      }

      const token = jwt.sign({ userId: user._id }, jwtString, {
        expiresIn: "1h",
      });

      return token;
    } catch (error) {
      throw error;
    }
  }
  async verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtString, (err, decoded) => {
        if (err) {
          console.log(err);
          reject(new Error("You must login first"));
        } else {
          resolve(decoded);
        }
      });
    });
  }
  async getAuthorization(req) {
    const token = req.get("Authorization");
    if (!token) {
      throw new Error("Unauthenticated");
    }
    const decoded = (await this.verifyToken(token)) ;
    if (!decoded) {
      throw new Error("Token expired");
    }
    const user = await this.findUserById(decoded.userId);
    return user;
  }
  async getViewAuthorization(req) {
    const token = getToken(req);
    if (token === undefined || token.length === 0) {
      throw new Error("Not logged in");
    }
    const decode = (await this.verifyToken(token)) ;
    const user = await this.findUserById(decode.userId);
    return user;
  }
}
