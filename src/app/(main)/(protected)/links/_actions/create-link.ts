// "use server";

// import { messages } from "@/constants/messages";
// import { prismaClient } from "@/lib/prisma";
// import { protectedActionClient } from "@/lib/safe-action";
// import { createNewCode } from "@/utils/create-new-code";
// import { z } from "zod";

// export const createLinkAction = protectedActionClient
//   .schema(
//     z.object({
//       title: z.string({ message: messages.form.REQUIRED_FIELD }),
//       description: z.string().optional(),
//       originalUrl: z.string({ message: messages.form.REQUIRED_FIELD }),
//     }),
//   )
//   .action(
//     async ({
//       parsedInput: { title, description, originalUrl },
//       ctx: { user },
//     }) => {
//       let code: string;
//       let isUniqueCode: boolean;

//       do {
//         code = createNewCode();

//         const codeIfExists = await prismaClient.url.findUnique({
//           where: {
//             code,
//           },
//         });

//         isUniqueCode = !!codeIfExists;
//       } while (isUniqueCode);

//       const shortUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

//       const newLink = await prismaClient.url.create({
//         data: {
//           title,
//           description,
//           code,
//           originalUrl,
//           shortUrl,
//           ownerId: user.id,
//         },
//       });

//       return newLink;
//     },
//   );
