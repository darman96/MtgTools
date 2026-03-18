import { NavButtonProps } from "@components/Buttons/NavButton";
import { ButtonProps } from "@chakra-ui/react";
import UseStyles from "@/lib/UseStyles";

const useStyles: UseStyles<ButtonProps, NavButtonProps> = (props) => ({
  asChild: true,
  fontWeight: props.isActive && !props.disabled ? "semibold" : "normal",
  size: "md",
  variant: "ghost",
  _hover:
    !props.disabled && !props.isActive
      ? {
          textDecoration: "underline",
        }
      : undefined,
});

export default useStyles;
