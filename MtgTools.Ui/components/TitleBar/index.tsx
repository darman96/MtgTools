import { HStack } from "@chakra-ui/react";
import AppTitle from "@components/TitleBar/AppTitle";
import Navigation from "@components/TitleBar/Navigation";
import useStyles from "@components/TitleBar/index.styles";

export const TitleBar: React.FC = () => {
  const style = useStyles();
  return (
    <HStack {...style}>
      <AppTitle />
      <Navigation />
    </HStack>
  );
};
