import { categoryModel } from "../model/category.js";

class CategoryRepository {
  async getAllCategories() {
    return await categoryModel.find().exec();
  }
  async getCategoryByName(categoryName) {
    return await categoryModel.find({categoryName})
  }
  async getCategoryById(categoryId) {
    return await categoryModel.findById(categoryId).exec();
  }

  async createCategory(categoryData) {
    if (categoryData.categoryName.length === 0) {
      throw new Error("Category name is not empty");
    }
    return await categoryModel.create({
      categoryName: categoryData.categoryName,
    });
  }

  async updateCategory(categoryId, updateData ) {
    return await categoryModel
      .findByIdAndUpdate(categoryId, updateData, { new: true })
      .exec();
  }

  async deleteCategory(categoryId) {
    const result = await categoryModel.findByIdAndDelete(categoryId).exec();
    return result !== null;
  }
}

export default CategoryRepository;
