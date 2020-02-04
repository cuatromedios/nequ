import * as request from 'supertest'
import {getRepository} from 'typeorm'
import {User} from '../src/user/user.entity'
import {build, hasKeys, Suite} from './test-utils'

describe('Authentication (e2e)', () => {
  let suite: Suite
  beforeAll(async () => suite = await build())
  beforeEach(async () => await suite.runner.startTransaction())
  afterEach(async () => await suite.runner.rollbackTransaction())
  afterAll(async () => await suite.app.close())

  it('/api/login (POST)', async () => {
    const repo = getRepository(User, suite.db.name)
    const user = repo.merge(new User(), {
      email: 'test@nequ.dev',
      password: '12345678',
      first_name: 'Ne',
      last_name: 'Qu'
    })
    await repo.save(user)
    let token: string
    await request(suite.app.getHttpServer())
      .post('/api/login')
      .send({email: 'test@nequ.dev', password: '12345678'})
      .expect(201)
      .expect(hasKeys(['token']))
      .expect(res => token = res.body.token)

    // Check that it can be used to log in
    await request(suite.app.getHttpServer())
      .get('/api/me')
      .set({'Authorization': `Bearer ${token}`})
      .expect(200)
      .expect(hasKeys(['name', 'email']))
  })
})
