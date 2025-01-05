import mongoose, { Document, Schema } from "mongoose";

export interface District extends Document {
  name: string;
  type: string;
  slug: string;
  name_with_type: string;
  path: string;
  path_with_type: string;
  code: string;
  parent_code: string;
}

const districtSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    name_with_type: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    path_with_type: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    parent_code: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const DistrictModel = mongoose.model<District>("District", districtSchema);
export default DistrictModel;
