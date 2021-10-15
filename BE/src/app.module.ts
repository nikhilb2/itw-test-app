import { Module } from '@nestjs/common';
import { AppController, DishesController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, DishesController],
  providers: [AppService],
})
export class AppModule {}
