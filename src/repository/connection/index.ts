import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/sdn");
    console.log("Đã kết nối tới MongoDB");
  } catch (error) {
    console.error("Lỗi kết nối tới MongoDB:", error);
  }
};

export default connectDB;