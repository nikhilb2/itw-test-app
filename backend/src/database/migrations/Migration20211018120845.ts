import { Migration } from '@mikro-orm/migrations';

export class Migration20211018120845 extends Migration {
  async up(): Promise<void> {
    this.addSql(`create type "dish_type_enum" as enum ('starter', 'main', 'dessert', 'beverage');`);
    this.addSql(
      'create table "dishes" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "dish_type" dish_type_enum not null, "price" real not null, "likes" integer not null default 0);',
    );
    this.addSql('alter table "dishes" add constraint "dishes_pkey" primary key ("id");');
    this.addSql('alter table "dishes" add constraint "dishes_name_unique" unique ("name");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "dishes";');
    this.addSql(`drop type if exists "dish_type_enum";`);
  }
}
