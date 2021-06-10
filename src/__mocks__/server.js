import { setupServer } from "msw/node";
import { backendHandlers } from "./handlers/backend";

export const server = setupServer(...backendHandlers);
