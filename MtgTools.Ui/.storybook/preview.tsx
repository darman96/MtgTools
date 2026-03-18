import "../theme/font-imports";
import type { Preview } from "@storybook/preact-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import { ChakraProvider } from "@chakra-ui/react";
import { default as theme } from "../theme";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider value={theme}>
        <Story />
      </ChakraProvider>
    ),
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "dark",
    }),
  ],
};

export default preview;
