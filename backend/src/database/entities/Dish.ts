import { Entity, Property, Unique, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';

export enum DishType {
  STARTER = 'starter',
  MAIN = 'main',
  DESSERT = 'dessert',
  BEVERAGE = 'beverage',
}

@Entity({ tableName: 'dishes' })
export class DishEntity {
  constructor(init: {
    id?: string;
    name: string;
    dishType: DishType;
    price: number;
    likes?: number;
  }) {
    this.id = init.id ?? v4();
    this.name = init.name;
    this.dishType = init.dishType;
    this.price = init.price;
    this.likes = init.likes ?? 0;
  }

  @PrimaryKey({ columnType: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property({ columnType: 'varchar(255)', nullable: false })
  @Unique()
  name: string;

  @Property({ columnType: 'dish_type_enum', name: 'dish_type', nullable: false })
  dishType: DishType;

  @Property({ columnType: 'real', nullable: false })
  price: number;

  @Property({ columnType: 'integer', default: 0 })
  likes: number;
}
