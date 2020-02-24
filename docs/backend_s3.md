# Storage in S3 💿

NeQu includes a module to easily upload files to either AWS S3 or
digital ocean spaces, just fill the .env variables with the corresponding
credentials and import the `StoreModule`, inject StoreService in your 
service and you will be able to use the put method to store a file

## Example:

```typescript
export class UploadController {

  constructor(private readonly store: StoreService) {
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file', {limits: {fileSize: 104857600}}))
  async upload(@UploadedFile() file) {
    return {name: await this.store.put(file)}
  }
}
```
