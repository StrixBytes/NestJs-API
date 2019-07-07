import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ProductsService } from "./products.service";

//Products Controller, all Product routes are here.
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  //(Post) Route to CREATE a product at /product, requires name, price, available. Creation date is set automatically.
  @Post("product")
  async addProduct(
    @Body("name") prodName: string,
    @Body("price") prodPrice: number,
    @Body("available") prodAvail: boolean
  ) {
    const generatedId = await this.productsService.insertProduct(prodName, prodPrice, prodAvail);
    return { id: generatedId };
  }

  //(Get) Route to READ all existing products at /products, requires no body.
  @Get("products")
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  //(Get) Route to READ a selected product at /product/:id . :id is the ID of the desired product. No body.
  @Get("product/:id")
  getProduct(@Param("id") prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  //(Put) Route to UPDATE a selected product at product/:id . :id is the ID of the desired product. Can update: name, price, available.
  @Put("product/:id")
  async updateProduct(
    @Param("id") prodId: string,
    @Body("name") prodName: string,
    @Body("price") prodPrice: number,
    @Body("available") prodAvail: boolean
  ) {
    await this.productsService.updateProduct(prodId, prodName, prodPrice, prodAvail);
    return null;
  }

  //(Delete) Route to DELETE a selected product at product/:id . :id is the ID of the desired product. No body.
  @Delete("product/:id")
  async removeProduct(@Param("id") prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
