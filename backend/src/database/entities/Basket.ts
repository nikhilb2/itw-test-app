import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'basket' })
export class BasketEntity {
  constructor(init: { id?: string; discount: number; payed: boolean }) {
    this.id = init.id ?? v4();
    this.payed = init.payed ?? false;
  }

  @PrimaryKey({ columnType: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property({ columnType: 'boolean', default: false })
  payed: boolean;
}
