import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const appOutDir = path.resolve(dirname, ".dist/app");

// https://vitejs.dev/config/
export default defineConfig(() => {
  const isStorybook = process.env.STORYBOOK === "true";

  return {
    plugins: [preact(isStorybook ? {} : {})],
    resolve: {
      alias: {
        "@": path.resolve(dirname, "."),
        "@app": path.resolve(dirname, "app"),
        "@components": path.resolve(dirname, "components"),
      },
    },
    build: {
      outDir: appOutDir,
      emptyOutDir: true,
    },
  };
});
