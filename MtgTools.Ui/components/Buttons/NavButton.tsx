import { Button, ButtonProps, HStack } from "@chakra-ui/react";
import useStyles from "@components/Buttons/NavButton.styles";
import { PropsWithChildren } from "preact/compat";
import { JSX } from "preact";

export interface NavButtonProps extends ButtonProps {
  isActive?: boolean;
  href: string;
  Icon?: JSX.Element;
}

export const NavButton: React.FC<PropsWithChildren<NavButtonProps>> = (props) => {
  const { href, children, Icon, ...restProps } = props;
  const style = useStyles(props);
  return (
    <Button {...style} {...restProps}>
      <a href={href}>
        {Icon ? (
          <HStack justifyContent={"start"} w={"full"}>
            {Icon}
            {children}
          </HStack>
        ) : (
          <>{children}</>
        )}
      </a>
    </Button>
  );
};
