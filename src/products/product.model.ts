import * as mongoose from "mongoose";

//Product Schema, dictates the structure of a product Schema
export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, required: true },
  dateCreated: {type: Date, default: Date.now}
});

//interface for ProductModel, sets the structure of ProductModel for use in ts
export interface Product extends mongoose.Document {
  id: string;
  name: string;
  price: number;
  available: boolean;
  dateCreated: string;
}
