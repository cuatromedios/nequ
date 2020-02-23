# NeQu Database migrations 🗃

NeQu preferred database is PostgreSQL, it's configured to use
the default connection settings, to change them edit the .env file

## Initial configurations

To create a database configured for the defaults of nequ run the following:
```sql
CREATE DATABASE nequ;
CREATE ROLE nequ WITH LOGIN PASSWORD 'nequ';
ALTER DATABASE nequ OWNER TO nequ;
```

Make sure the database isn't reachable from outside your computer/server

## TypeORM

NeQu uses TypeORM as its ORM and it's configured by 
default to use migrations from the `/backend/database/migrations` 
directory, there are several preconfigured commands to
manage migrations, they are ran through npm.

From the backend directory:

| Command | Description |
|---------|-------------|
|`npm run migrate` | Run all pending migrations |
|`npm run migration:create migration_name`  | Creates a new migration file |
|`npm run migration:revert` | Reverts the last ran migration |
|`npm run migration:refresh` | Undos **all** migrations and then runs them again|

Entities should be added to `/backend/database/config.ts` to be able to use them
inside modules

## Seeds

Seeds should be created through a migration, if the 
seed is for testing, the `APP_ENV` variable can be
checked inside the up method of the migration

Example:

```typescript
import {MigrationInterface, QueryRunner} from 'typeorm'

export class stagingSeed9999999999999 implements MigrationInterface {
  public async up(run: QueryRunner): Promise<any> {
    const runIn = ['staging', 'local']
    if (!runIn.includes(process.env.APP_ENV)) return
    // ... run the seeder
  }
}
```
