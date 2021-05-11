import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import { loadEnvConfig } from "@next/env";

expect.extend(toHaveNoViolations);

export default async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
