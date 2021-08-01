// noinspection DuplicatedCode

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import * as faker from 'faker';
import * as request from 'supertest';
import { PublicUser } from '../src/@types/users';
import AppModule from '../src/app.module';

describe('AppController (e2e)', () => {
  const userProperties: (keyof PublicUser)[] = [
    'id',
    'username',
    'email',
    'createdAt',
    'updatedAt',
  ];

  const postPayload: Prisma.UserCreateInput = {
    username: faker.internet.userName().slice(0, 15),
    email: faker.internet.email(),
    password: 'HelloWorld!',
  };

  const patchPayload: Prisma.UserUpdateInput = {
    username: faker.internet.userName().slice(0, 15),
    email: faker.internet.email(),
  };

  let app: INestApplication;

  let user: PublicUser | undefined;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post(`/users`)
      .send(postPayload)
      .expect(201)
      .expect(({ body }) => {
        expect(body).toHaveProperty(userProperties[0]);
        expect(body).toHaveProperty(userProperties[1], postPayload.username);
        expect(body).toHaveProperty(userProperties[2], postPayload.email);
        expect(body).toHaveProperty(userProperties[3]);
        expect(body).toHaveProperty(userProperties[4]);
      });
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(({ body: usersBody }) => {
        usersBody.forEach((userBody: PublicUser) => {
          expect(userBody).toHaveProperty(userProperties[0]);
          expect(userBody).toHaveProperty(userProperties[1]);
          expect(userBody).toHaveProperty(userProperties[2]);
          expect(userBody).toHaveProperty(userProperties[3]);
          expect(userBody).toHaveProperty(userProperties[4]);
        });

        user = usersBody[Math.ceil(Math.random() * usersBody.length)];
      });
  });

  it('/users/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty(userProperties[0]);
        expect(body).toHaveProperty(userProperties[1]);
        expect(body).toHaveProperty(userProperties[2]);
        expect(body).toHaveProperty(userProperties[3]);
        expect(body).toHaveProperty(userProperties[4]);
      });
  });

  it('/users/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch(`/users/${user.id}`)
      .send(patchPayload)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty(userProperties[0]);
        expect(body).toHaveProperty(userProperties[1], patchPayload.username);
        expect(body).toHaveProperty(userProperties[2], patchPayload.email);
        expect(body).toHaveProperty(userProperties[3]);
        expect(body).toHaveProperty(userProperties[4]);
      });
  });

  it('/users/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete(`/users/${user.id}`).expect(204);
  });
});
