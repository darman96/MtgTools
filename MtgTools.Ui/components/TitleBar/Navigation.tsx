import { ButtonGroup } from "@chakra-ui/react";
import { NavButton } from "@components/Buttons/NavButton";
import { Home, LayoutGrid, Vault } from "lucide-react";
import { useLocation } from "preact-iso";

const NAV_LINKS = [
  { label: "Home", Icon: <Home />, href: "/" },
  { label: "Vault", Icon: <Vault />, href: "/vault" },
  { label: "Deck Builder", Icon: <LayoutGrid />, href: "/deck-builder" },
];

export const Navigation: React.FC = () => {
  const { url } = useLocation();

  return (
    <ButtonGroup>
      {NAV_LINKS.map(({ label, Icon, href }) => {
        const isActive = href === "/" ? url === "/" : url.startsWith(href);
        return (
          <NavButton key={href} href={href} isActive={isActive} Icon={Icon}>
            {label}
          </NavButton>
        );
      })}
    </ButtonGroup>
  );
};

export default Navigation;
