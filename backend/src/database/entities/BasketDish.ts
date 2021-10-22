import { Entity, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { DishEntity } from './Dish';
import { BasketEntity } from './Basket';

@Entity({ tableName: 'basket_dish' })
export class BasketDishEntity {
  constructor(init: { id?: string; basket_id: BasketEntity; dish_id: DishEntity }) {
    this.id = init.id ?? v4();
    this.basket_id = init.basket_id;
    this.dish_id = init.dish_id;
  }

  @PrimaryKey({ columnType: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @ManyToOne({
    primary: true,
    entity: () => BasketEntity,
    name: 'dish_id',
    onUpdateIntegrity: 'cascade',
    onDelete: 'cascade',
    nullable: false,
    columnType: 'uuid',
  })
  basket_id: BasketEntity;

  @ManyToOne({
    primary: true,
    entity: () => DishEntity,
    name: 'dish_id',
    onUpdateIntegrity: 'cascade',
    onDelete: 'cascade',
    nullable: false,
    columnType: 'uuid',
  })
  dish_id: DishEntity;
}
