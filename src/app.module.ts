import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "./products/products.module";

//imports ProductsModule, connects to mongoDB via mongoose to "store" database
@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      "mongodb+srv://newUser:39HLxz8s8rDnWAwr@products-adq8j.mongodb.net/store?retryWrites=true&w=majority",
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
