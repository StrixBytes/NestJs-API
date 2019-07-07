import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./product.model";

//Products Service/Provider all functions for routes at products.controller are here.
@Injectable()
export class ProductsService {
  constructor(
    //Injecting a Product Model.
    @InjectModel("Product") readonly productModel: Model<Product>,
  ) {}

  //A Function to Create a product, takes name, price and available and saves it as a new Product.
  async insertProduct(name: string, price: number, available:boolean) {
    const newProduct = new this.productModel({
      name,
      price,
      available
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  //A Function to Read all products. Displays id, name, price, available, dateCreated to the user.
  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id:prod.id,
      name:prod.name,
      price:prod.price,
      available:prod.available,
      dateCreated:prod.dateCreated
    }));
  }

  //A function to Read a user with a passed on id(productID). Displays id, name, price, available, dateCreated to the user.
  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id:product.id,
      name:product.name,
      price:product.price,
      available:product.available,
      dateCreated:product.dateCreated
    };
  }

  //A function to Update a user with a passed on id(productID). Can accept and update name, price, available.
  async updateProduct(
    productId: string,
    name:string,
    price:number,
    available:boolean
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (name) {
      updatedProduct.name = name;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (available!=null) {
      updatedProduct.available = available;
    }
    updatedProduct.save();
  }

  //A function to Delete a user with a passed on id(prodID).
  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException("Could not find product.");
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException("Could not find product.");
    }
    if (!product) {
      throw new NotFoundException("Could not find product.");
    }
    return product;
  }
}
