import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

//main class, additionally builds and sets-up SwaggerAPI @ /api
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("Small CRUD Nestjs REST API")
    .setDescription("API that provides base functionality to CRUD requests")
    .setVersion("1.0")
    .addTag("products")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api",app, document);

  await app.listen(3000);
}
bootstrap();
