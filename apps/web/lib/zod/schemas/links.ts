import { z } from "zod";
import { parseUrlSchema } from "./utils";

export const getUrlQuerySchema = z.object({
  url: parseUrlSchema,
});
