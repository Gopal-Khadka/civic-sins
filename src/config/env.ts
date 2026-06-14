import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * Validated, typed environment. Only `VITE_`-prefixed client vars are used
 * (this is a static, no-backend site). Analytics stays off unless a key is set.
 */
export const env = createEnv({
	clientPrefix: "VITE_",
	client: {
		VITE_POSTHOG_KEY: z.string().optional(),
		VITE_POSTHOG_HOST: z.url().default("https://us.i.posthog.com"),
	},
	runtimeEnv: import.meta.env,
	emptyStringAsUndefined: true,
});
