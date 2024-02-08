import mongoose from "mongoose";
import { nanoid } from "nanoid";
const HOST_NAME = process.env.HOST_NAME || 'http://localhost:3000';
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: `${HOST_NAME}/${nanoid(10)}`,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("ShortUrl", shortUrlSchema)