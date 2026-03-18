import * as React from "preact/compat";
import { PropsWithChildren } from "preact/compat";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import {
  ColorModeProvider,
  ColorModeProviderProps,
} from "@components/ProviderStack/ColorModeProvider";

export interface ThemeProviderProps extends ColorModeProviderProps {}

export const ThemeProvider: React.FC<PropsWithChildren<ThemeProviderProps>> = (props) => {
  return (
    <ChakraProvider value={theme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
};
