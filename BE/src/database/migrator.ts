import { MikroORM } from '@mikro-orm/core';
import { entities } from './entities';
import { join } from 'path';

(async () => {
  const orm = await MikroORM.init({
    entities,
    type: 'postgresql',
    dbName: 'test_database',
    port: 5432,
    host: 'localhost',
    user: 'test_user',
    password: 'test_password',
    debug: true,
    migrations: {
      tableName: 'db_migrations',
      path: join(__dirname, 'migrations'),
      disableForeignKeys: false,
    },
  });

  const generator = orm.getSchemaGenerator();
  await generator.dropSchema();
  await generator.createSchema();
  await generator.updateSchema();

  const migrator = orm.getMigrator();
  await migrator.down({ to: 0 });
  await migrator.createMigration();
  await migrator.up();
  await orm.close(true);
})();
