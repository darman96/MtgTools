import * as React from "preact/compat";
import { PropsWithChildren } from "preact/compat";
import { ThemeProvider } from "@components/ProviderStack/ThemeProvider";
import { LocationProvider } from "preact-iso";

export interface ProviderStackProps {}

export const ProviderStack: React.FC<PropsWithChildren<ProviderStackProps>> = (props) => {
  const { children } = props;
  return (
    <ThemeProvider>
      <LocationProvider>{children}</LocationProvider>
    </ThemeProvider>
  );
};

export default ProviderStack;
