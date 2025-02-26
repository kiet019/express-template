import { Router } from "express";
import CategoryRepository from "../package/repository/category.repository.js";
import { UserRepository } from "../package/repository/user.repository.js";

const categoryRouter = Router();

const categoryRepository = new CategoryRepository();
const userRepository = new UserRepository();

categoryRouter
  .get("/", async (req, res) => {
    try {
      const categories = await categoryRepository.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  .get("/:categoryId", async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
      const category = await categoryRepository.getCategoryById(categoryId);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  .post("/", async (req, res) => {
    try {
      const user = await userRepository.getAuthorization(req);
      const categoryData = req.body;

      if (!user?.isAdmin) {
        throw new Error("Unauthorized");
      }

      const newCategory = await categoryRepository.createCategory(categoryData);
      res.json(newCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  .put("/:categoryId", async (req, res) => {
    try {
      const user = await userRepository.getAuthorization(req);

      const categoryId = req.params.categoryId;

      if (!user?.isAdmin) {
        throw new Error("Unauthorized");
      }

      const updateData = req.body;
      const updatedCategory = await categoryRepository.updateCategory(
        categoryId,
        updateData
      );
      if (updatedCategory) {
        res.json(updatedCategory);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete("/:categoryId", async (req, res) => {
    try {
      const user = await userRepository.getAuthorization(req);

      if (!user?.isAdmin) {
        throw new Error("Unauthorized");
      }
      const categoryId = req.params.categoryId;
      if (!user?.isAdmin) {
        throw new Error("Unauthorized");
      }
      const deleted = await categoryRepository.deleteCategory(categoryId);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default categoryRouter;
