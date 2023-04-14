import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('home')
  async home() {
    return { roomId: 10 };
  }
}
