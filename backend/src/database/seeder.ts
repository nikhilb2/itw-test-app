import { MikroORM } from '@mikro-orm/core';

import { config } from './config';
import { dishes, ingredients, dishIngredients } from './data';
import { DishEntity, DishIngredientEntity, IngredientEntity } from './entities';

const argv = process.argv.slice(2);

async function runSeeder() {
  const orm = await MikroORM.init({ ...config, debug: true });

  // Allow removing all data before seeding.
  if (argv.includes('--truncate')) {
    await orm.em.getConnection().execute(`
      truncate "dish_ingredients" cascade;
      truncate "dishes" cascade;
      truncate "ingredients" cascade;
    `);
  }

  await orm.em.transactional(async (em) => {
    await em.persistAndFlush(
      dishes.map((dish) => {
        return new DishEntity({
          id: dish.id,
          name: dish.name,
          price: dish.price,
          dishType: dish.type,
        });
      }),
    );

    await em.persistAndFlush(
      ingredients.map((ingredient) => {
        return new IngredientEntity({
          id: ingredient.id,
          name: ingredient.name,
        });
      }),
    );

    await em.persistAndFlush(
      dishIngredients.map((dishIngredient) => {
        return new DishIngredientEntity({
          dish: em.getReference(DishEntity, dishIngredient.dish.id),
          ingredient: em.getReference(IngredientEntity, dishIngredient.ingredient.id),
        });
      }),
    );
  });

  await orm.close(true);
}

runSeeder();
