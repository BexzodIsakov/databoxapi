const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      min: 1,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    address: {
      street: { type: String, default: "", trim: true },
      city: { type: String, default: "", trim: true },
      state: { type: String, default: "", trim: true },
      zipCode: { type: String, default: "", trim: true },
      country: { type: String, default: "", trim: true },
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const count = await this.constructor.countDocuments();
      this.id = count + 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
