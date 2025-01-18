import mongoose, { Document, Schema } from "mongoose";
import { ActiveStatus } from "~/constants/enum";

export interface PostCatalogue extends Document {
  name: string;
  slug: string;
  image: string;
  description: string;
  show_menu: boolean;
  show_home: boolean;
  status: string;
}

const postCatalogueSchema: Schema = new Schema(
  {
    name: { type: String, required: true }, 
    slug: { type: String, required: true, unique: true }, 
    image: { type: String, default: null },  
    description: { type: String, default: null },  
    show_menu: { type: Boolean, default: false },
    show_home: { type: Boolean, default: false },
    status: {
      type: String,
      required: true,
      enum: Object.values(ActiveStatus),
      default: ActiveStatus.ACTIVE,
    }
  },
  {
    timestamps: true,  
    versionKey: false,  
  }
);

const PostCatalogueModel = mongoose.model<PostCatalogue>("PostCatalogue", postCatalogueSchema);
export default PostCatalogueModel;
