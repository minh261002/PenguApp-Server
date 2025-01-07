import mongoose, { Document, Schema } from "mongoose";
import { ActiveStatus } from "~/constants/enum";

export interface Slider extends Document {
  name: string;
  key: string;
  description: string;  
  status: string;
}

const sliderSchema: Schema = new Schema(
  {
    name: { type: String, required: true }, 
    key: { type: String, required: true, unique: true }, 
    description: { type: String, default: null },  
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

const SliderModel = mongoose.model<Slider>("Slider", sliderSchema);
export default SliderModel;
