import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed URLs
  const urlPromises = Array.from({ length: 10 }).map(() => {
    return prisma.url.create({
      data: {
        title: faker.internet.domainName(),
        description: faker.lorem.sentence(),
        originalUrl: faker.internet.url(),
        code: faker.string.alphanumeric(6),
        amountOfAccesses: faker.number.int({ min: 0, max: 1000 }),
        status: "Active", // Assumindo que UrlStatus enum tem "Active"
        expiresAt: faker.date.future(),
        ownerId: "cm0zrx52o0000xqn6x3zu9u1h",
      },
    });
  });

  const urls = await Promise.all(urlPromises);

  // Seed Historics
  const historicPromises = urls.map((url) => {
    return prisma.historic.create({
      data: {
        isAnonymous: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        urlId: url.id,
        userId: "cm0zrx52o0000xqn6x3zu9u1h",
      },
    });
  });

  await Promise.all(historicPromises);
}

main()
  .then(() => console.log("Seeding complete!"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
