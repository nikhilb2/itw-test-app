import { Entity, Property, Unique, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'ingredients' })
export class IngredientEntity {
  constructor(init: Pick<IngredientEntity, 'name'>) {
    this.name = init.name;
  }

  @PrimaryKey({ columnType: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string = v4();

  @Property({ columnType: 'varchar(255)', nullable: false })
  @Unique()
  name: string;
}
