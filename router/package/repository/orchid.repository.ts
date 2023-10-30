import { commentModel, Comment } from "../model/comment.ts";
import { Orchid, orchidModel } from "../model/orchid.ts";

class OrchidRepository {
  async userGetAllOrchids() {
    const orchids = await orchidModel
      .find({}, "name image")
      .populate("category", "categoryName")

      .exec();
    return orchids;
  }
  async adminGetAllOrchids() {
    const orchids = await orchidModel
      .find()
      .populate("category")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "user", // Thay 'User' bằng tên của model người dùng trong ứng dụng của bạn
        },
      })
      .exec();
    return orchids;
  }
  async getOrchidsByCategory(categoryId: string) {
    const orchids = await orchidModel.find({ category: categoryId }).exec();
    return orchids;
  }
  async getOrchidById(orchidId: string) {
    const orchid = await orchidModel
      .findById(orchidId)
      .populate("category")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "user", // Thay 'User' bằng tên của model người dùng trong ứng dụng của bạn
        },
      })
      .exec();
    return orchid;
  }

  async createOrchid(orchidData: {
    name: string;
    image: string;
    isNatural: boolean;
    origin: string;
    category: string;
  }) {
    const newOrchid = await orchidModel.create(orchidData);
    return newOrchid;
  }

  async updateOrchid(
    orchidId: string,
    updateData: {
      name: string;
      image: string;
      isNatural: boolean;
      origin: string;
      category: string;
    }
  ) {
    const updatedOrchid = await orchidModel
      .findByIdAndUpdate(orchidId, updateData, { new: true })
      .populate("category")
      .exec();
    return updatedOrchid;
  }
  async searchOrchidByName(keyword: string) {
    const orchids = await orchidModel
      .find({ name: { $regex: keyword, $options: "i" } })
      .populate("category")
      .exec();
    return orchids;
  }

  async deleteOrchid(orchidId: string): Promise<boolean> {
    const result = await orchidModel.findByIdAndDelete(orchidId).exec();
    return result !== null;
  }
  async findOrchidByName(name: string) {
    const orchid = await orchidModel.find({ name }).populate("category").exec();
    return orchid;
  }

  // Hàm để tạo comment
  async createComment(
    orchidId: string,
    authorId: string,
    commentData: {
      comment: string;
      rating: number;
    }
  ) {
    const orchid = await orchidModel.findById(orchidId);

    if (commentData.comment.length === 0) {
      throw new Error("Comment is not empty");
    }
    if (!orchid) {
      throw new Error("Orchid is not existed");
    }

    const existingComment = orchid.comments.find(
      //@ts-ignore
      (comment) => comment.author._id === authorId
    );

    if (existingComment) {
      throw new Error("User already comment");
    }
    const newComment = new commentModel({
      rating: commentData.rating,
      comment: commentData.comment,
      author: authorId,
    });
    orchid.comments.push(newComment);

    const updatedOrchid = await orchid.save();
    return updatedOrchid;
  }

  // Hàm để xóa comment
  async deleteComment(orchidId: string, commentId: any, authorId: any) {
    const orchid = await orchidModel.findById(orchidId);

    if (!orchid) {
      throw new Error("Orchid is not existed");
    }

    // Kiểm tra xem comment có tồn tại trong cây phát sáng này không
    const existingCommentIndex = orchid.comments.findIndex(
      (comment) => comment._id === commentId
    );

    if (existingCommentIndex === -1) {
      throw new Error("Cannot find comment");
    }

    // Kiểm tra xem người gửi yêu cầu xóa comment có phải là tác giả của comment không
    if (
      //@ts-ignore
      orchid.comments[existingCommentIndex].author._id !== authorId
    ) {
      throw new Error("User cannot delete this comment");
    }

    // Xóa comment khỏi mảng comments
    orchid.comments.splice(existingCommentIndex, 1);

    const updatedOrchid = await orchid.save();
    return updatedOrchid;
  }
}

export default OrchidRepository;
