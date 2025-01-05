
import { Document, Model, Schema } from "mongoose";



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
