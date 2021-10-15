import { Entity, Property, Unique, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';

export enum DishType {
  starter = 'starter',
  main = 'main',
  dessert = 'dessert',
  beverage = 'beverage',
}

@Entity({ tableName: 'dishes' })
export class DishEntity {
  constructor(
    init: Pick<DishEntity, 'name' | 'dishType' | 'price'> & { likes?: number },
  ) {
    this.name = init.name;
    this.dishType = this.dishType;
    this.price = init.price;
    this.likes = init.likes;
    this.id = v4();
  }

  @PrimaryKey({ columnType: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property({ columnType: 'varchar(255)', nullable: false })
  @Unique()
  name: string;

  @Property({ columnType: 'dish_type_enum', nullable: false })
  dishType: DishType;

  @Property({ columnType: 'real', nullable: false })
  price: number;

  @Property({ columnType: 'integer', default: 0 })
  likes: number;
}
