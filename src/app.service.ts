//Default app.service

import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {

  //Function for GET at app.controller, returns "Hello World!"
  getHello(): string {
    return "Hello World!";
  }
}
