import mongoose, { Document, Schema } from "mongoose";
import { ActiveStatus } from "~/constants/enum"; 

interface ProductVariant extends Document {
  name: string;
  size: string;
  color: string;
  price: number;
  sale_price: number;
  stock: number;
  status: keyof typeof ActiveStatus;  
}

export interface Product extends Document {
  name: string;
  slug: string;
  image: string;
  gallery: string[];
  description: string;
  category_id: mongoose.Types.ObjectId;
  variants: ProductVariant[];
  status: keyof typeof ActiveStatus; 
}

var productVariationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sale_price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(ActiveStatus),
    default: ActiveStatus.ACTIVE,
  },
});

var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  gallery: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  category_id: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  variants: [productVariationSchema],
  status: {
    type: String,
    required: true,
    enum: Object.values(ActiveStatus),
    default: ActiveStatus.ACTIVE,
  },
});

const ProductModel = mongoose.model<Product>("Product", productSchema);
export default ProductModel;
