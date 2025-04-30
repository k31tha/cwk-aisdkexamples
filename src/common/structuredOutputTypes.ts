import { z } from "zod";

export const FootballClubs = z.object({
  clubs: z.array(z.object({ clubName: z.string(), postcode: z.string() })),
});

export type StructuredResponse = z.infer<typeof FootballClubs>;
