import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { CreateDishDTO, DishDTO } from './dishDTOs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}


@Controller('dishes')
export class DishesController {
  @Get()
  findAll(): string {
    return 'this action returns all dishes';
  }

  @Get(':id')
  findOne(@Param('id') id: DishDTO): string {
    return `this action return dish N°${id}`;
  }

  @Post()
  createDish(@Body() body: CreateDishDTO): string {
    return "this action create a new dish";
  }

  //DELETE
  //PATCH
}