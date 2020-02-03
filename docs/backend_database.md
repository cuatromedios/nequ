# NeQu Database migrations 🗃

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
