import { Document, Model, Schema } from "mongoose";
import slugify from "slugify";

export const buildTree = async <T extends Document>(
  model: Model<T>, 
  parentId: string | null
): Promise<any> => {
  const items = await model.find({ parent: parentId });
  const tree = await Promise.all(items.map(async (item) => {
    const children = await buildTree(model, item._id as string); 
    return {
      ...item.toObject(),
      children,
    };
  }));
  return tree;
};

export const createSlug = (name: string): string => {
  return slugify(name, {
    replacement: '-',  
    remove: undefined, 
    lower: true,      
    strict: false,    
    locale: 'vi',     
    trim: true        
  });
}