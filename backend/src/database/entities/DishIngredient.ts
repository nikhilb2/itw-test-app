import { Entity, ManyToOne, PrimaryKeyType, Unique } from '@mikro-orm/core';

import { DishEntity } from './Dish';
import { IngredientEntity } from './Ingredient';

@Entity({ tableName: 'dish_ingredients' })
@Unique({ properties: ['dish', 'ingredient'] })
export class DishIngredientEntity {
  constructor(init: { dish: DishEntity; ingredient: IngredientEntity }) {
    this.dish = init.dish;
    this.ingredient = init.ingredient;
  }

  [PrimaryKeyType]: [string, string];

  @ManyToOne({
    primary: true,
    entity: () => DishEntity,
    name: 'dish_id',
    onUpdateIntegrity: 'cascade',
    onDelete: 'cascade',
    nullable: false,
    columnType: 'uuid',
  })
  dish: DishEntity;

  @ManyToOne({
    primary: true,
    entity: () => IngredientEntity,
    name: 'ingredient_id',
    onUpdateIntegrity: 'cascade',
    onDelete: 'cascade',
    nullable: false,
    columnType: 'uuid',
  })
  ingredient: IngredientEntity;
}
