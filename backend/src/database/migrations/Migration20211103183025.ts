import { Migration } from '@mikro-orm/migrations';

export class Migration20211103183025 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "basket" ("id" uuid not null default gen_random_uuid(), "payed" boolean not null default false);');
    this.addSql('alter table "basket" add constraint "basket_pkey" primary key ("id");');

    this.addSql('create table "ingredients" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null);');
    this.addSql('alter table "ingredients" add constraint "ingredients_pkey" primary key ("id");');
    this.addSql('alter table "ingredients" add constraint "ingredients_name_unique" unique ("name");');

    this.addSql('create table "dishes" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "dish_type" text check ("dish_type" in (\'starter\', \'main\', \'dessert\', \'beverage\')) not null, "price" real not null, "likes" integer not null default 0);');
    this.addSql('alter table "dishes" add constraint "dishes_pkey" primary key ("id");');
    this.addSql('alter table "dishes" add constraint "dishes_name_unique" unique ("name");');

    this.addSql('create table "dish_ingredients" ("dish_id" uuid not null, "ingredient_id" uuid not null);');
    this.addSql('alter table "dish_ingredients" add constraint "dish_ingredients_pkey" primary key ("dish_id", "ingredient_id");');

    this.addSql('create table "basket_dish" ("basket_id" uuid not null, "dish_id" uuid not null, "quantity" integer not null default 1);');
    this.addSql('alter table "basket_dish" add constraint "basket_dish_pkey" primary key ("basket_id", "dish_id");');

    this.addSql('alter table "dish_ingredients" add constraint "dish_ingredients_dish_id_foreign" foreign key ("dish_id") references "dishes" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "dish_ingredients" add constraint "dish_ingredients_ingredient_id_foreign" foreign key ("ingredient_id") references "ingredients" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "basket_dish" add constraint "basket_dish_basket_id_foreign" foreign key ("basket_id") references "basket" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "basket_dish" add constraint "basket_dish_dish_id_foreign" foreign key ("dish_id") references "dishes" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "dish_ingredients" add constraint "dish_ingredients_dish_id_ingredient_id_unique" unique ("dish_id", "ingredient_id");');

    this.addSql('alter table "basket_dish" add constraint "basket_dish_basket_id_dish_id_unique" unique ("basket_id", "dish_id");');
  }

}
