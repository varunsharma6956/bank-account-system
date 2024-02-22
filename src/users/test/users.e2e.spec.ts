import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersModule } from '../users.module';
import * as request from 'supertest';

describe('UsersController (End-to-End)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [UsersModule], // Use the UsersModule directly
    }).compile();

    try {
      app = moduleFixture.createNestApplication();
      await app.init();
    } catch (error) {
      console.error('Failed to initialize Nest application:', error);
      throw error; // Rethrow the error to fail the test
    }
  });

  it('should return users', async () => {
    const response = await request(app.getHttpServer()).get('/users');
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});
