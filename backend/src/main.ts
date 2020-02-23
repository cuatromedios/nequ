import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {ValidationPipe} from '@nestjs/common'
import {GlobalExceptionsFilter} from './common/filters/exceptions.filter'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import {EntityNotFoundFilter} from './common/filters/entity-not-found.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  app.useGlobalFilters(
    new GlobalExceptionsFilter(),
    new EntityNotFoundFilter()
  )

  const options = new DocumentBuilder()
    .setTitle('NeQu API')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000)
}

bootstrap()
