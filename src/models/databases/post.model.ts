import mongoose, { Document, Schema } from "mongoose";
import { ActiveStatus } from "~/constants/enum";

export interface Post extends Document {
  title: string;
  category_id: mongoose.Types.ObjectId;
  slug: string;
  image: string;
  content: string;
  is_featured: boolean;
  parent: mongoose.Types.ObjectId | null;  
  status: string;
}

const postSchema: Schema = new Schema(
  {
    title: { type: String, required: true }, 
    category_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'PostCatalogue', 
      required: true
    },
    slug: { type: String, required: true, unique: true }, 
    image: { type: String, default: null },  
    content: { type: String, default: null },  
    is_featured: { type: Boolean, default: false },
    status: {
      type: String,
      required: true,
      enum: Object.values(ActiveStatus),
      default: ActiveStatus.ACTIVE,
    },
  },
  {
    timestamps: true,  
    versionKey: false,  
  }
);

const PostModel = mongoose.model<Post>("Post", postSchema);
export default PostModel;
