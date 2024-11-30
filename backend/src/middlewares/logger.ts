import { pinoLogger } from "hono-pino";
import { pino } from "pino";
import { PinoPretty } from "pino-pretty";

export function logger() {
  return pinoLogger({
    pino: pino(
      process.env.NODE_ENV === "production" ? undefined : PinoPretty(),
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
