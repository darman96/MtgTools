import { StackProps } from "@chakra-ui/react";
import UseStyles from "@/lib/UseStyles";

const useStyles: UseStyles<StackProps> = () => ({
  as: "header",
  background: "bg.subtle",
  borderBottomWidth: "1px",
  borderBottomColor: "border.emphasized",
  paddingX: 6,
  paddingY: 3,
  justifyContent: "space-between",
  alignItems: "center",
});

export default useStyles;
