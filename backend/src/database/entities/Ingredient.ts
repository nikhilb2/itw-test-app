import { Entity, Property, Unique, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'ingredients' })
export class IngredientEntity {
  constructor(init: { id?: string; name?: string }) {
    this.id = init.id ?? v4();
    this.name = init.name;
  }

  @PrimaryKey({ columnType: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property({ columnType: 'varchar(255)', nullable: false })
  @Unique()
  name: string;
}
