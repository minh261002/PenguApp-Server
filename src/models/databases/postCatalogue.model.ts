import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";

export interface PostCatalogue extends Document {
  name: string;
  slug: string;
  image: string;
  description: string;
  show_menu: boolean;
  show_home: boolean;
  parent: mongoose.Types.ObjectId | null;  
}

const postCatalogueSchema: Schema = new Schema(
  {
    name: { type: String, required: true }, 
    slug: { type: String, required: true, unique: true }, 
    image: { type: String },  
    description: { type: String, default: null },  
    show_menu: { type: Boolean, default: false },
    show_home: { type: Boolean, default: false },
    parent: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'PostCatalogue', 
      default: null 
    },
  },
  {
    timestamps: true,  
    versionKey: false,  
  }
);

postCatalogueSchema.pre('save', function (next) {
  const doc = this as unknown as PostCatalogue;
  if (doc.isModified('name') || doc.isNew) {
    doc.slug = slugify(doc.name, { lower: true, strict: true }); 
  }
  next();
});


const PostCatalogueModel = mongoose.model<PostCatalogue>("PostCatalogue", postCatalogueSchema);
export default PostCatalogueModel;
