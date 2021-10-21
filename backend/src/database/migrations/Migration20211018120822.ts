import { Migration } from '@mikro-orm/migrations';

export class Migration20211018120822 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "ingredients" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null);',
    );
    this.addSql('alter table "ingredients" add constraint "ingredients_pkey" primary key ("id");');
    this.addSql(
      'alter table "ingredients" add constraint "ingredients_name_unique" unique ("name");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "ingredients";');
  }
}
