import type { Config } from "jest";

export default function (): Config {
  return {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
      "\\.(css|less|scss|gif|ttf|eot|svg|png|jpg)$": "identity-obj-proxy",
    },
    rootDir: "src",
  };
}
