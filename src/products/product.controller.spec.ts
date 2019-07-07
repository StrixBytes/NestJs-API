import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { Model } from "mongoose";
import { Product } from "./product.model";
import { Module } from "@nestjs/common";



describe("ProductsController",() => {
    let productsController: ProductsController;
    let productsService: ProductsService;

    beforeEach(() => {
        productsService = new ProductsService(this.productModel);
        productsController = new ProductsController(productsService);
    });

    describe("getProducts",() => {
        it("should return all products",async () => {
            const result = Promise.resolve({ id: "string", name: "string", price: 2, available: true, dateCreated: "string" }[0]);
            jest.spyOn(productsService,"getProducts").mockImplementation(()=>result);
            expect(await productsController.getAllProducts()).toBe(result)
        })
    })
})