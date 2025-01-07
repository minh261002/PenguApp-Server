import mongoose, { Document, Schema } from "mongoose";
import { ActiveStatus } from "~/constants/enum";

export interface SliderItem extends Document {
  title: string;
  slider_id: typeof Schema.Types.ObjectId;
  href: string;
  position: number;
  image: string;
  status: string;
}

const sliderItemSchema: Schema = new Schema(
  {
    title: { type: String, required: true }, 
    slider_id: { type: Schema.Types.ObjectId, required: true },
    href: { type: String, required: false },
    position: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
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

const SliderItemModel = mongoose.model<SliderItem>("SliderItem", sliderItemSchema);
export default SliderItemModel;
