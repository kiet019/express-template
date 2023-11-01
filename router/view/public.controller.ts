import { Router } from "express";
import { UserRepository } from "../package/repository/user.repository.ts";
import {
  getMessage,
  getPageParams,
  getToken,
  setToken,
} from "../package/util.ts";
import OrchidRepository from "../package/repository/orchid.repository.ts";

const publicRouter = Router();
const userRepository = new UserRepository();
const orchidRepository = new OrchidRepository();

publicRouter
  .get("/", async (req, res) => {
    try {
      const orchidsList = await orchidRepository.userGetAllOrchids();
      console.log({ ...getPageParams(req, [], []), orchidsList });
      res.render("index", { ...getPageParams(req, [], []), orchidsList });
    } catch (error: any) {
      res.redirect("/view");
    }
  })
  .get("/login", async (req, res) => {
    try {
      const { error } = getMessage(req);
      res.render("login", getPageParams(req, error, []));
    } catch (error) {}
  })
  .get("/signup", async (req, res) => {
    try {
      const { error } = getMessage(req);
      res.render("signup", getPageParams(req, error, []));
    } catch (error) {
      res.redirect("/view");
    }
  })
  .get("/details/:id", async (req, res) => {
    try {
      const id = req.params.id;
      let alreadyComment = false;
      const { error } = getMessage(req);
      const orchid = await orchidRepository.getOrchidById(id);
      try {
        const decode = (await userRepository.verifyToken(
          getToken(req)
        )) as unknown as any;
        if (
          orchid?.comments.find((value) => value.author?._id == decode.userId)
        ) {
          alreadyComment = true;
        }
      } catch (error) {}
      if (orchid === null) {
        throw new Error("Cannot find orchid")
      }
      res.render("details", {
        ...getPageParams(req, error, []),
        orchid,
        alreadyComment,
      });
    } catch (error) {
      res.redirect("/view");
    }
  })
  .get("/search/:name", async (req, res) => {
    try {
      const name = req.params.name;
      const orchidsList = await orchidRepository.searchOrchidByName(name);
      res.render("search", {
        ...getPageParams(req, [], []),
        orchidsList,
        name,
      });
    } catch (error) {
      res.redirect("/view");
    }
  })
  .get("/account", async (req, res) => {
    try {
      const { error, success } = getMessage(req);
      const user = await userRepository.getViewAuthorization(req);
      console.log(user);
      res.render("account", { ...getPageParams(req, [], []), user });
    } catch (error) {
      res.redirect("/view");
    }
  })
  .get("/account/update", async (req, res) => {
    try {
      const { error, success } = getMessage(req);
      const user = await userRepository.getViewAuthorization(req);
      res.render("account-update", {
        ...getPageParams(req, error, success),
        user,
      });
    } catch (error) {
      res.redirect("/view");
    }
  })
  .get("/account/update-password", async (req, res) => {
    try {
      const { error, success } = getMessage(req);
      const user = await userRepository.getViewAuthorization(req);
      res.render("account-update-password", {
        ...getPageParams(req, error, success),
      });
    } catch (error) {
      res.redirect("/view");
    }
  })
  .post("/logout", (req, res) => {
    try {
      setToken(res, "");
      res.json({
        redirect: "/view",
      });
    } catch (error: any) {
      console.log(error);
      res.json({});
    }
  })
  .post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const token = await userRepository.loginUser(username, password);
      if (token !== null) {
        const user = await userRepository.findUserByUsername(username);
        setToken(res, token);
        res.json({
          redirect: user?.isAdmin ? "/view/admin" : "/view",
        });
      }
    } catch (error: any) {
      console.log(error.message);
      res.json({ redirect: `/view/login?error=${error.message}` });
    }
  })
  .post("/signup", async (req, res) => {
    try {
      const userData = req.body;
      const user = await userRepository.registerUser(userData);
      res.json({
        redirect: "/view",
      });
    } catch (error: any) {
      console.log(error.message);
      res.json({ redirect: `/view/signup?error=${error.message}` });
    }
  })
  .post("/comment", async (req, res) => {
    const { id, rating, comment } = req.body;
    try {
      const decode = (await userRepository.verifyToken(
        getToken(req)
      )) as unknown as any;
      const data = await orchidRepository.createComment(id, decode.userId, {
        comment,
        rating,
      });
      res.json({ redirect: `/view/details/${id}?success=success` });
    } catch (error: any) {
      console.log(error.message);
      res.json({ redirect: `/view/details/${id}?error=${error.message}` });
    }
  })
  .post("/account/update", async (req, res) => {
    const { name, YOB } = req.body;
    try {
      const decode = (await userRepository.verifyToken(
        getToken(req)
      )) as unknown as any;
      const data = await userRepository.updateUser(decode.userId, {
        name,
        YOB,
      });
      res.json({ redirect: `/view/account/update?success=Update success` });
    } catch (error: any) {
      console.log(error.message);
      res.json({ redirect: `/view/account/update?error=${error.message}` });
    }
  })
  .post("/account/update-password", async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    try {
      const decode = (await userRepository.verifyToken(
        getToken(req)
      )) as unknown as any;
      if (newPassword !== confirmPassword) {
        throw new Error("Confirm password is not match");
      }
      const data = await userRepository.updatePassword(
        decode.userId,
        oldPassword,
        newPassword
      );
      res.json({
        redirect: `/view/account/update-password?success=Update success`,
      });
    } catch (error: any) {
      console.log(error.message);
      res.json({
        redirect: `/view/account/update-password?error=${error.message}`,
      });
    }
  });
export default publicRouter;
