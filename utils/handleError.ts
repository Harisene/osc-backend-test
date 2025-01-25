import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

function handleError(error: unknown) {
  console.error(error);
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.meta) {
      const cause = (error.meta as any).cause as string;
      throw new Error(cause);
    }
    throw new Error(error.message);
  } else if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error("Something went wrong");
  }
}

export default handleError;
