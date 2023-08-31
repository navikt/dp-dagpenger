import { setupWorker } from "msw";
import { frontendHandlers } from "./handlers/frontend";

export const worker = setupWorker(...frontendHandlers);
