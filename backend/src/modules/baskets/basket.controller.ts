import { EntityManager } from '@mikro-orm/core';
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';

import { BasketEntity, BasketDishEntity } from '../../database/entities';

import { BasketParams } from './dto/basket.dto';
import { PgQueryErrorInterceptor } from '../interceptors';

@Controller('baskets')
@UseInterceptors(PgQueryErrorInterceptor)
export class BasketController {
  constructor(private readonly entityManager: EntityManager) {}

  @Get('current')
  async getCurrentNonPayed() {
    const currentBasket = await this.entityManager.findOne(BasketEntity, { payed: false });

    if (currentBasket === null) {
      return await this.entityManager.transactional(async (em) => {
        em.persist([new BasketEntity({})]);
      });
    }

    const basketDishes = await this.entityManager.find(
      BasketDishEntity,
      {
        basket: { id: currentBasket.id },
      },
      { populate: ['dish'] },
    );

    return {
      ...currentBasket,
      dishes: basketDishes.map((basketDish) => basketDish.dish),
    };
  }

  @Get(':id')
  async findOne(@Param() { id }: BasketParams) {
    const basket = await this.entityManager.findOne(BasketEntity, { id });

    // Dish with given id not found.
    if (basket === null) {
      return null;
    }

    const basketDishes = await this.entityManager.find(
      BasketDishEntity,
      {
        basket: { id },
      },
      { populate: ['dish'] },
    );

    return {
      ...basket,
      dishes: basketDishes.map((basketDish) => basketDish.dish),
    };
  }
}
