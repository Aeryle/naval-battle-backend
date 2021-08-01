import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PublicUser } from 'src/@types/users';

describe('AppController (e2e)', () => {
  const userProperties: (keyof PublicUser)[] = [
    'id',
    'username',
    'email',
    'createdAt',
    'updatedAt',
  ];

  let app: INestApplication;

  let user: PublicUser | undefined;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(({ body: usersBody }) => {
        usersBody.map((user: PublicUser) => {
          // noinspection DuplicatedCode
          expect(user).toHaveProperty(userProperties[0]);
          expect(user).toHaveProperty(userProperties[1]);
          expect(user).toHaveProperty(userProperties[2]);
          expect(user).toHaveProperty(userProperties[3]);
          expect(user).toHaveProperty(userProperties[4]);
        });

        user = usersBody[Math.ceil(Math.random() * usersBody.length)];
      });
  });

  it('/users/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .expect(200)
      .expect(({ body: userBody }) => {
        // noinspection DuplicatedCode
        expect(userBody).toHaveProperty(userProperties[0]);
        expect(userBody).toHaveProperty(userProperties[1]);
        expect(userBody).toHaveProperty(userProperties[2]);
        expect(userBody).toHaveProperty(userProperties[3]);
        expect(userBody).toHaveProperty(userProperties[4]);
      });
  });
});
