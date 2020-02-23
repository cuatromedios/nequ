import {IsInt, IsOptional, Min} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
import {Expose, Transform} from 'class-transformer'

export class PaginationDto {
  @Transform(n => parseInt(n))
  @IsOptional() @IsInt() @Min(1)
  @ApiProperty({example: 25, required: false})
  take: number
  @Transform(n => parseInt(n))
  @IsOptional() @IsInt() @Min(0)
  @ApiProperty({example: '0', required: false})
  skip: number

  @Expose()
  get params() {
    if (!this.take) {
      this.take = parseInt(process.env.PAGINATION_DEFAULT_N) || 25
    }
    if (!this.skip) this.skip = 0
    return {take: this.take, skip: this.skip}
  }
}
