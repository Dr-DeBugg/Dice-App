import { z } from "zod";

const hexColorRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

export const schema = z.object({
  sides: z.string({
    required_error: "Please select a side count.",
  }),
  color: z
    .string()
    .trim()
    .min(1, {
      message: "Please pick a color.",
    })
    .refine((val) => hexColorRegex.test(val), {
      message: "Invalid hex color code.",
    }),
});
