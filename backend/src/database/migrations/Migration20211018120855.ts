import { Migration } from '@mikro-orm/migrations';

export class Migration20211018120855 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "dish_ingredients" ("dish_id" uuid not null, "ingredient_id" uuid not null);',
    );
    this.addSql(
      'alter table "dish_ingredients" add constraint "dish_ingredients_pkey" primary key ("dish_id", "ingredient_id");',
    );

    this.addSql(
      'alter table "dish_ingredients" add constraint "dish_ingredients_dish_id_foreign" foreign key ("dish_id") references "dishes" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "dish_ingredients" add constraint "dish_ingredients_ingredient_id_foreign" foreign key ("ingredient_id") references "ingredients" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "dish_ingredients" add constraint "dish_ingredients_dish_id_ingredient_id_unique" unique ("dish_id", "ingredient_id");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "dish_ingredients";');
  }
}
