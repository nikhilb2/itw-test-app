import { join } from 'path';
import { Options } from '@mikro-orm/core';
import { Logger } from '@nestjs/common';

import { entities } from './entities';

const logger = new Logger('MikroORM');

export const config: Options = {
  entities,
  type: 'postgresql',
  dbName: 'test_database',
  port: 5432,
  host: 'localhost',
  user: 'test_user',
  debug: true,
  logger: logger.debug.bind(logger),
  password: 'test_password',
  migrations: {
    tableName: 'db_migrations',
    path: join(__dirname, 'migrations'),
    disableForeignKeys: false,
  },
};
