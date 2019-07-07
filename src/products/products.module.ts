import { Module } from "@nestjs/common";
import { MongooseModule, getModelToken } from "@nestjs/mongoose";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductSchema } from "./product.model";

//Products module, imports ProductSchema, connects products controller and provider
@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService,
  {
    provide: getModelToken("Product"),
    useValue: ProductSchema
  }
  ],
})
export class ProductsModule {}
