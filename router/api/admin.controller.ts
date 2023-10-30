import express from "express";
import { UserRepository } from "../package/repository/user.repository.ts";
import { User } from "../package/model/user.ts";

const adminRouter = express.Router();

const userRepository = new UserRepository();

adminRouter.post("/get-all-user", async (req, res) => {
  try {
    const user = (await userRepository.getAuthorization(req)) as User;

    if (!user.isAdmin) {
      throw new Error("Unauthorized");
    }
    
    const userList = await userRepository.getAllUsers()
    res.json(userList)
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default adminRouter;
