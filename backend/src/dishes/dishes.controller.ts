import { EntityManager, QueryOrder } from '@mikro-orm/core';
import { Controller, Get, Post, Body, Param, Delete, Patch, UseInterceptors } from '@nestjs/common';
import { dropUndefined } from 'src/utils/misc';

import { DishEntity, DishIngredientEntity, IngredientEntity } from '../database/entities';

import { CreateDishDTO, DishParams, UpdateDishDTO } from './dto/dish.dto';
import { PgQueryErrorInterceptor } from './interceptors';

@Controller('dishes')
@UseInterceptors(PgQueryErrorInterceptor)
export class DishesController {
  constructor(private readonly entityManager: EntityManager) {}

  @Get()
  async findAll() {
    const dishes = await this.entityManager.find(
      DishEntity,
      {},
      { orderBy: { name: QueryOrder.ASC } },
    );
    const dishIngredients = await this.entityManager.find(
      DishIngredientEntity,
      { dish: { id: { $in: dishes.map((dish) => dish.id) } } },
      { populate: ['ingredient'] },
    );

    return dishes.map((dish) => ({
      ...dish,
      ingredients: dishIngredients
        .filter((dishIngredients) => dishIngredients.dish.id === dish.id)
        .map((dishIngredients) => dishIngredients.ingredient),
    }));
  }

  @Get(':id')
  async findOne(@Param() { id }: DishParams) {
    const dish = await this.entityManager.findOne(DishEntity, { id });

    // Dish with given id not found.
    if (dish === null) {
      return null;
    }

    const dishIngredients = await this.entityManager.find(
      DishIngredientEntity,
      { dish: { id } },
      { populate: ['ingredient'] },
    );

    return {
      ...dish,
      ingredients: dishIngredients.map((dishIngredient) => dishIngredient.ingredient),
    };
  }

  @Post()
  async createDish(@Body() body: CreateDishDTO) {
    await this.entityManager.transactional(async (em) => {
      const dish = new DishEntity({
        name: body.name,
        dishType: body.dishType,
        price: body.price,
      });

      const dishIngredients = body.ingredientsIds.map((ingredientId) => {
        return new DishIngredientEntity({
          dish,
          ingredient: em.getReference(IngredientEntity, ingredientId),
        });
      });

      em.persist([dish, ...dishIngredients]);
    });
  }

  @Patch(':id')
  async updateDish(@Param() { id }: DishParams, @Body() body: UpdateDishDTO) {
    await this.entityManager.transactional(async (em) => {
      const dish = await this.entityManager.findOneOrFail(DishEntity, id);

      // Update dish details.
      em.assign(
        dish,
        dropUndefined({
          name: body.name,
          dishType: body.dishType,
          price: body.price,
          likes: body.likes,
        }),
      );

      em.persist(dish);

      if (Array.isArray(body.ingredientsIds)) {
        const dishIngredientsToRemove = await this.entityManager.find(DishIngredientEntity, {
          dish: { id },
        });

        // Remove all previous dish ingredients.
        em.remove(dishIngredientsToRemove);

        // Add new dish ingredients.
        em.persist(
          body.ingredientsIds.map((ingredientId) => {
            return new DishIngredientEntity({
              dish,
              ingredient: em.getReference(IngredientEntity, ingredientId),
            });
          }),
        );
      }
    });
  }

  @Delete(':id')
  async deleteDish(@Param() { id }: DishParams) {
    await this.entityManager.nativeDelete(DishEntity, id);
  }
}
