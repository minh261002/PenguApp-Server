import mongoose, { Document, Schema } from "mongoose";

export interface Province extends Document {
  name: string; 
  slug: string;
  type: string; 
  name_with_type: string; 
  code: string;
}

const provinceSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    name_with_type: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const ProvinceModel = mongoose.model<Province>("Province", provinceSchema);
export default ProvinceModel;
