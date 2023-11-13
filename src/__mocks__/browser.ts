import { setupWorker } from "msw/browser";
import { frontendHandlers } from "./handlers/frontend";

export const worker = setupWorker(...frontendHandlers);
