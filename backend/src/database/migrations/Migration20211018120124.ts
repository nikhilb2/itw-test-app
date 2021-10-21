import { Migration } from '@mikro-orm/migrations';

export class Migration20211018120124 extends Migration {
  async up(): Promise<void> {
    this.addSql('create extension "pgcrypto";');
  }

  async down(): Promise<void> {
    this.addSql('drop extension if exists "pgcrypto";');
  }
}
