import { Entity, PrimaryKeyType, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { DishEntity } from './Dish';
import { BasketEntity } from './Basket';

@Entity({ tableName: 'basket_dish' })
@Unique({ properties: ['basket', 'dish'] })
export class BasketDishEntity {
  constructor(init: { basket: BasketEntity; dish: DishEntity }) {
    this.basket = init.basket;
    this.dish = init.dish;
  }

  [PrimaryKeyType]: [string, string];

  @ManyToOne({
    primary: true,
    entity: () => BasketEntity,
    name: 'basket_id',
    onUpdateIntegrity: 'cascade',
    onDelete: 'cascade',
    nullable: false,
    columnType: 'uuid',
  })
  basket: BasketEntity;

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

  @Property({ columnType: 'integer', default: 1 })
  quantity: number;
}
