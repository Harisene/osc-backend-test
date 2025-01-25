function handleError(error: unknown) {
  console.error(error);
  if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error("Something went wrong");
  }
}

export default handleError;
