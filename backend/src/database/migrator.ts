import { MikroORM } from '@mikro-orm/core';

import { config } from './config';

/**
 * @see https://mikro-orm.io/docs/migrations#using-the-migrator-programmatically
 */

const [command = ''] = process.argv.slice(2);

if (!/^(up|down|down-all|create)$/.test(command)) {
  throw new Error('Invalid or missing command.');
}

async function runMigrator() {
  const orm = await MikroORM.init({ ...config, debug: true });
  const migrator = orm.getMigrator();

  switch (command) {
    // runs migrations up to the latest
    case 'up': {
      await migrator.up();
      break;
    }

    // migrates one step down
    case 'down': {
      await migrator.down();
      break;
    }

    // reverts all migrations
    case 'down-all': {
      await migrator.down({ to: 0 });
      break;
    }

    // creates migration file
    case 'create': {
      await migrator.createMigration();
      break;
    }

    default: {
      throw new Error('Invalid or missing command.');
    }
  }

  await orm.close(true);
}

runMigrator();
