/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

const prismaClient = new PrismaClient();

async function main() {
  const users = new Array(50).fill(undefined).map(() => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return {
      username: faker.internet.userName(firstName, lastName).slice(0, 15),
      email: faker.internet.email(firstName, lastName),
      password: 'Password1!',
    };
  });

  await Promise.all(
    users.map((user) =>
      prismaClient.user.create({
        data: {
          ...user,
          settings: {
            create: {
              theme: 'DARK',
            },
          },
        },
      }),
    ),
  );
}

main()
  .catch(console.error)
  .finally(() => prismaClient.$disconnect());
