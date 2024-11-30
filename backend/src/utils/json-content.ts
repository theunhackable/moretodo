import type { ZodSchema } from "@/utils/types";

const jsonContent = <T extends ZodSchema>(schema: T, description: string) => {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
  };
};

export default jsonContent;
