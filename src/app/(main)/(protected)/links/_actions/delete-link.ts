// "use server";

// import { messages } from "@/constants/messages";
// import { prismaClient } from "@/lib/prisma";
// import { protectedActionClient } from "@/lib/safe-action";
// import { z } from "zod";

// export const deleteLinkAction = protectedActionClient
//   .schema(
//     z.object({
//       id: z.string({ message: messages.form.REQUIRED_FIELD }),
//     }),
//   )
//   .action(async ({ parsedInput: { id } }) => {
//     await prismaClient.url.delete({
//       where: {
//         id,
//       },
//     });

//     return {
//       ok: true,
//     };
//   });
