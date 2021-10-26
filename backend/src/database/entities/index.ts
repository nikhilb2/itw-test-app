import { DishEntity, DishType } from './Dish';
import { DishIngredientEntity } from './DishIngredient';
import { IngredientEntity } from './Ingredient';
import { BasketEntity } from './Basket';
import { BasketDishEntity } from './BasketDish';

export const entities = [
  DishEntity,
  IngredientEntity,
  DishIngredientEntity,
  BasketEntity,
  BasketDishEntity,
];

export {
  DishEntity,
  IngredientEntity,
  DishIngredientEntity,
  DishType,
  BasketEntity,
  BasketDishEntity,
};
