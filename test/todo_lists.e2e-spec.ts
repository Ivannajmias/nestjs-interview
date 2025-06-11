import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';  // Importa el módulo raíz

describe('TodoListsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/todo-lists (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/todo-lists')
      .expect(200)
      .expect([]);
  });
});
