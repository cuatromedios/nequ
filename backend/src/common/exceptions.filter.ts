import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common'
import {Response} from 'express'

@Catch(HttpException)
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    let status = exception.getStatus()

    if (process.env.APP_ENV === 'local') console.log(exception.message)

    // Process validation errors
    if (status === 400) {
      return response
        .status(422)
        .json({
          statusCode: 422,
          error: 'Bad Request',
          validation_error: true,
          message: exception.message.message
        })
    }

    response
      .status(status)
      .json(exception.message)
  }
}
