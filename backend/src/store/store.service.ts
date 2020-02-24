import {HttpException, Injectable} from '@nestjs/common'
import * as crypto from 'crypto'
import * as AWS from 'aws-sdk'

@Injectable()
export class StoreService {
  async put(file): Promise<string> {
    let hash = crypto.createHash('sha1')
    hash.setEncoding('hex')
    hash.write(file.buffer)
    hash.end()
    const checksum = hash.read()
    let extension = file.originalname.split(/\./g).slice(-1)
    extension = String(extension).toLowerCase()
    const name = `${checksum}.${extension}`

    const s3 = new AWS.S3({
      region: process.env.S3_REGION,
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET,
      endpoint: process.env.S3_ENDPOINT,
    })

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: name,
      Body: file.buffer,
      ACL: 'public-read'
    }
    try {
      await s3.upload(params).promise()
    } catch (e) {
      throw new HttpException({
        'message': 'file_upload_failed',
        'data': e.message
      }, 503)
    }

    return name
  }
}
