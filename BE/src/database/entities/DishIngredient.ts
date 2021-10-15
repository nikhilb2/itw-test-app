import {
  Entity,
  ManyToOne,
  Cascade,
  PrimaryKeyType,
  Unique,
  PrimaryKey,
} from '@mikro-orm/core';
import { DishEntity } from './Dish';
import { IngredientEntity } from './Ingredient';

@Entity({ tableName: 'dish_ingredients' })
@Unique({ properties: ['dish', 'ingredient'] })
export class DishIngredientEntity {
  constructor(init: Pick<DishIngredientEntity, keyof DishIngredientEntity>) {
    this.dish = init.dish;
    this.ingredient = init.ingredient;
  }

  @ManyToOne({
    primary: true,
    entity: () => DishEntity,
    name: 'dish_id',
    cascade: [Cascade.ALL],
    nullable: false,
    columnType: 'uuid',
  })
  dish: DishEntity;

  @ManyToOne({
    primary: true,
    entity: () => IngredientEntity,
    name: 'ingredient_id',
    cascade: [Cascade.ALL],
    nullable: false,
    columnType: 'uuid',
  })
  ingredient: IngredientEntity;

  [PrimaryKeyType]: [string, string];
}
