import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await Promise.all([prisma.link.deleteMany(), prisma.event.deleteMany()]);

  // Criar múltiplos usuários fictícios de forma paralela
  const user = await prisma.user.findUnique({
    where: {
      email: "",
    },
  });

  if (!user) {
    console.error("Usuário não encontrado!");
    return null;
  }

  // Criar múltiplas URLs e históricos de forma paralela
  const urlPromises = Array.from({ length: 8 }).map(async () => {
    const link = await prisma.link.create({
      data: {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        originalUrl: faker.internet.url(),
        code: faker.string.alphanumeric(8),
        status: faker.helpers.arrayElement(["Active", "Inactive"]),
        expiresAt: faker.date.future(),
        ownerId: user.id,
        amountOfAccesses: faker.number.int({
          min: 0,
          max: 2000,
        }),
      },
    });

    // Criar múltiplos históricos para cada URL de forma paralela
    const eventPromises = Array.from({ length: 20 }).map(() =>
      prisma.event.create({
        data: {
          isAnonymous: faker.datatype.boolean(),
          linkId: link.id,
          userId: user.id,
          createdAt: faker.date.between({
            from: "2024-09-01",
            to: "2024-10-01",
          }),
        },
      })
    );

    await Promise.all(eventPromises);
  });

  await Promise.all(urlPromises);

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
