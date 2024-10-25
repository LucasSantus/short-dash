import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

async function main() {
  await Promise.all([prisma.link.deleteMany(), prisma.event.deleteMany()]);

  const users = await prisma.user.findMany();

  if (!users.length) {
    console.error("Usuários não encontrados!");

    return null;
  }

  for (const user of users) {
    const urlPromises = Array.from({ length: getRandomInt(2, 20) }).map(async () => {
      const link = await prisma.link.create({
        data: {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          originalUrl: faker.internet.url(),
          code: faker.string.alphanumeric(8),
          status: faker.helpers.arrayElement(["Active", "Inactive"]),
          expiresAt: faker.date.future(),
          ownerId: user.id,
        },
      });

      const eventPromises = Array.from({ length: getRandomInt(100, 500) }).map(() =>
        prisma.event.create({
          data: {
            isAnonymous: faker.datatype.boolean(),
            linkId: link.id,
            userId: user.id,
            createdAt: faker.date.between({
              from: "2024-01-01",
              to: "2024-12-01",
            }),
          },
        })
      );

      await Promise.all(eventPromises);
    });

    await Promise.all(urlPromises);
  }

  console.info("Seeding concluído com sucesso!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
