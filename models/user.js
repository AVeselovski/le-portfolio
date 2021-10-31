import mongoose from "mongoose";
import { hash } from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
});

userSchema.pre("save", async function () {
  const user = this;

  const hashedPassword = await hash(user.password, 13);
  user.password = hashedPassword;
});

export default mongoose.models.User || mongoose.model("User", userSchema);
