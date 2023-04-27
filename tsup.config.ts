import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  tsconfig: "tsconfig.json",
  bundle: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
});
