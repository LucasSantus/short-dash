import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.error("Usuário dasdasd");

  await Promise.all([prisma.url.deleteMany(), prisma.historic.deleteMany()]);

  // Criar múltiplos usuários fictícios de forma paralela
  const user = await prisma.user.findUnique({
    where: {
      email: "lucas.santuuuus@gmail.com",
    },
  });

  if (!user) {
    console.error("Usuário não encontrado!");
    return null;
  }

  // Criar múltiplas URLs e históricos de forma paralela
  const urlPromises = Array.from({ length: 5 }).map(async () => {
    const url = await prisma.url.create({
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

    // Criar múltiplos históricos para cada URL de forma paralela
    const historicPromises = Array.from({ length: 500 }).map(() =>
      prisma.historic.create({
        data: {
          isAnonymous: faker.datatype.boolean(),
          urlId: url.id,
          userId: user.id,
        },
      })
    );

    await Promise.all(historicPromises);
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
