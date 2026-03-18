import type { StorybookConfig } from "@storybook/preact-vite";

const config: StorybookConfig = {
  addons: ["@storybook/addon-themes"],
  stories: ["../**/*.stories.@(ts|tsx)"],
  framework: {
    name: "@storybook/preact-vite",
    options: {},
  },
  staticDirs: ["../public"],
  refs: {
    "@chakra-ui/react": {
      disable: true,
    },
  },
};

export default config;
