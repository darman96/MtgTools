import { PropsWithChildren } from "preact/compat";
import { Box } from "@chakra-ui/react";
import { TitleBar } from "@components/TitleBar";

export interface LayoutProps {}

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <TitleBar />
      <Box as="main" flex="1" p={6}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
