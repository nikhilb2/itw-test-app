import { Entity, PrimaryKeyType, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { DishEntity } from './Dish';
import { BasketEntity } from './Basket';

@Entity({ tableName: 'basket_dish' })
@Unique({ properties: ['basket_id', 'dish_id'] })
export class BasketDishEntity {
  constructor(init: { basket_id: BasketEntity; dish_id: DishEntity }) {
    this.basket_id = init.basket_id;
    this.dish_id = init.dish_id;
  }

  [PrimaryKeyType]: [string, string];

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

  @Property({ columnType: 'integer', default: 1 })
  quantity: number;
}
