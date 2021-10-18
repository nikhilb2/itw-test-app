import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { DishesController } from './dishes/dishes.controller';
import { config } from './database/config';

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  controllers: [DishesController],
})
export class AppModule {}
