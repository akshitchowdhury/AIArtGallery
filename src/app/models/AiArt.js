import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    productId: {
      type: Number, // Assuming product ID from the dummy API is a number
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    hasfavorited: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true } // Use default _id field
);

const AiArtSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    posts: [postSchema], // Array of posts
  },
  { timestamps: true }
);

const AiArt = mongoose.models.AiArt || mongoose.model("AiArt", AiArtSchema);
export default AiArt;
