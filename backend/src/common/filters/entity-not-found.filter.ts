import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common'
import {EntityNotFoundError} from 'typeorm/error/EntityNotFoundError'
import {Response} from 'express'

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    response.status(404).json({message: exception.message})
  }
}
