import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'basket' })
export class BasketEntity {
  constructor(init: { id?: string; discount_rate: number }) {
    this.id = init.id ?? v4();
    this.discount_rate = init.discount_rate ?? 0;
  }

  @PrimaryKey({ columnType: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property({ columnType: 'integer', default: 0 })
  discount_rate: number;
}
