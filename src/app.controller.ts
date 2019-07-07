//Default app.controller

import { Controller, Get, Header } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Returns Hello World on root URL
  @Get()
  getHello():string {
    return this.appService.getHello();
  }
}
