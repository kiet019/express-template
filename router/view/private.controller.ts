import { Router } from "express";
import { getMessage, getPageParams } from "../package/util.ts";
import { UserRepository } from "../package/repository/user.repository.ts";
import OrchidRepository from "../package/repository/orchid.repository.ts";
import CategoryRepository from "../package/repository/category.repository.ts";

const privateRouter = Router();
const userRepository = new UserRepository();
const orchidRepository = new OrchidRepository();
const categoryRepository = new CategoryRepository();

privateRouter
  .get("/", async (req, res) => {
    const user = await userRepository.getViewAuthorization(req);
    if (!user?.isAdmin) {
      throw new Error("Unauthorized");
    }
    res.render("admin", getPageParams(req, [], [], true));
  })
  .get("/categories", async (req, res) => {
    try {
      const { error, success } = getMessage(req);
      const user = await userRepository.getViewAuthorization(req);
      if (!user?.isAdmin) {
        throw new Error("Unauthorized");
      }
      const categoriesList = await categoryRepository.getAllCategories();
      res.render("categories", {
        ...getPageParams(req, error, success, true),
        categoriesList,
      });
    } catch (error) {
      res.redirect("/view");
    }
  })
  .get("/categories/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const { error, success } = getMessage(req);
      const user = await userRepository.getViewAuthorization(req);
      if (!user?.isAdmin) {
        throw new Error("Unauthorized");
      }
      const category = await categoryRepository.getCategoryById(id);
      res.render("categories-update", {
        ...getPageParams(req, error, success, true),
        category,
      });
    } catch (error) {
      res.redirect("/view");
    }
  })
  .get("/orchids/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const { error, success } = getMessage(req);
      const user = await userRepository.getViewAuthorization(req);
      if (!user?.isAdmin) {
        throw new Error("Unauthorized");
      }
      const orchid = await orchidRepository.getOrchidById(id);
      const categoriesList = await categoryRepository.getAllCategories();
      res.render("orchids-update", {
        ...getPageParams(req, error, success, true),
        orchid,
        categoriesList,
      });
    } catch (error) {
      res.redirect("/view");
    }
  })
  .get("/orchids", async (req, res) => {
    try {
      const { error, success } = getMessage(req);
      const user = await userRepository.getViewAuthorization(req);
      if (!user?.isAdmin) {
        throw new Error("Unauthorized");
      }
      const orchidsList = await orchidRepository.adminGetAllOrchids();
      const categoriesList = await categoryRepository.getAllCategories();
      res.render("orchids", {
        ...getPageParams(req, error, success, true),
        orchidsList,
        categoriesList,
      });
    } catch (error) {
      res.redirect("/view");
    }
  })
  .post("/orchids/create", async (req, res) => {
    const { image, name, origin, categoryName, isNatural } = req.body;
    try {
      const user = await userRepository.getViewAuthorization(req);
      if (!user?.isAdmin) {
        throw new Error("Unauthorized");
      }
      const category = await categoryRepository.getCategoryByName(categoryName);
      await orchidRepository.createOrchid({
        image,
        category: category[0]._id as unknown as string,
        isNatural,
        name,
        origin,
      });
      res.json({
        redirect: `/view/admin/orchids?success=Create success`,
      });
    } catch (error: any) {
      res.json({ redirect: `/view/admin/orchids?error=${error.message}` });
    }
  })
  .post("/categories/create", async (req, res) => {
    const { categoryName } = req.body;
    try {
      const user = await userRepository.getViewAuthorization(req);
      if (!user?.isAdmin) {
        throw new Error("Unauthorized");
      }
      await categoryRepository.createCategory({
        _id: "",
        categoryName,
      });
      res.json({
        redirect: `/view/admin/categories?success=Create success`,
      });
    } catch (error: any) {
      res.json({ redirect: `/view/admin/categories?error=${error.message}` });
    }
  })
  .post("/categories/update", async (req, res) => {
    const { categoryName, id } = req.body;
    try {
      const user = await userRepository.getViewAuthorization(req);
      if (!user?.isAdmin) {
        throw new Error("Unauthorized");
      }
      await categoryRepository.updateCategory(id, {
        categoryName,
      });
      res.json({
        redirect: `/view/admin/categories/update/${id}?success=Update success`,
      });
    } catch (error: any) {
      res.json({
        redirect: `/view/admin/categories/update/${id}?error=${error.message}`,
      });
    }
  })
  .post("/orchids/delete", async (req, res) => {
    const { id } = req.body;
    try {
      const user = await userRepository.getViewAuthorization(req);
      if (!user?.isAdmin) {
        throw new Error("Unauthorized");
      }
      await orchidRepository.deleteOrchid(id);
      res.json({
        redirect: `/view/admin/orchids?success=Create success`,
      });
    } catch (error: any) {
      res.json({ redirect: `/view/admin/orchids?error=${error.message}` });
    }
  })
  .post("/categories/delete", async (req, res) => {
    const { id } = req.body;
    try {
      const user = await userRepository.getViewAuthorization(req);
      if (!user?.isAdmin) {
        throw new Error("Unauthorized");
      }
      const orchids = await orchidRepository.getOrchidsByCategory(id);
      if (orchids.length !== 0) {
        throw new Error("You must delete all orchids");
      }
      await categoryRepository.deleteCategory(id);
      res.json({
        redirect: `/view/admin/categories?success=Create success`,
      });
    } catch (error: any) {
      res.json({ redirect: `/view/admin/categories?error=${error.message}` });
    }
  })
  .post("/orchids/update", async (req, res) => {
    const { id, image, name, origin, categoryName, isNatural } = req.body;
    try {
      const user = await userRepository.getViewAuthorization(req);
      if (!user?.isAdmin) {
        throw new Error("Unauthorized");
      }
      const category = await categoryRepository.getCategoryByName(categoryName);
      const data = await orchidRepository.updateOrchid(id, {
        category: category[0]._id as unknown as string,
        image,
        isNatural,
        name,
        origin,
      });
      res.json({
        redirect: `/view/admin/orchids/update/${id}?success=Update success`,
      });
    } catch (error: any) {
      res.json({
        redirect: `/view/admin/orchids/update/${id}?error=${error.message}`,
      });
    }
  });

export default privateRouter;
