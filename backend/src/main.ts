import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {ValidationPipe} from '@nestjs/common'
import {GlobalExceptionsFilter} from './common/exceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  app.useGlobalFilters(new GlobalExceptionsFilter())
  await app.listen(3000)
}

bootstrap()
