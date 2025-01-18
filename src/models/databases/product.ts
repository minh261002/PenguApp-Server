import mongoose, { Document, Schema } from "mongoose";
import { ActiveStatus } from "~/constants/enum";

interface ProductVariant extends Document {
  name: string;
  size: string;
  color: string;
  price: number;
  sale_price: number;
  stock: number;
  status: string;
}

export interface Product extends Document {
  name: string;
  slug: string;
  image: string;
  gallery: string[];
  description: string;
  category_id: mongoose.Types.ObjectId;
  variants: ProductVariant[];
  status: string;
}