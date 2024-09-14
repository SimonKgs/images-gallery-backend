import mongoose, { Schema } from "mongoose";
import { Image } from "../interfaces/image.interface";

const imageSchema = new Schema<Image>({
    title: { type: String, required: true },
    image: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPrivate: { type: Boolean, default: false },
  }, {
    // I can use this to create createdAt and updatedAt fields automatically
    timestamps: true, 
  });
  
  const ImageModel = mongoose.model<Image>('Image', imageSchema);
  
  export default ImageModel;