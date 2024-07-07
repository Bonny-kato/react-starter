import { setupWorker } from "msw/browser";
import handlers from "~/mocks/handlers.ts";

export const worker = setupWorker(...handlers);
