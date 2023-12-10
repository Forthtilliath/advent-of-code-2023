import { z } from "zod";

export const argumentsSchema = z.object({
  day: z.coerce.number(),
  file: z.enum(["input", "sample"]).default("input"),
  asArray: z.coerce.boolean().default(true),
  separated: z.coerce.boolean().default(false),
});

export function getArguments() {
  const args = process.argv.slice(4).reduce((obj, arg) => {
    const [key, value] = arg.split("=");
    return {
      ...obj,
      [key]: value || true,
    };
  }, {});
  return argumentsSchema.parse(args);
}
