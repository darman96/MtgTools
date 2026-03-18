import type { Meta, StoryObj } from "@storybook/preact";
import { NavButton } from "./NavButton";
import { ButtonGroup } from "@chakra-ui/react";

const meta = {
  title: "Components/Buttons/NavButton",
  component: NavButton,
  tags: ["autodocs"],
} satisfies Meta<typeof NavButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const handleClick = (e: MouseEvent) => {
  e.preventDefault();
};

export const Default: Story = {
  render: (props) => (
    <NavButton href="#" isActive={false} onClick={handleClick}>
      Home
    </NavButton>
  ),
};

export const WithIcon: Story = {
  render: (props) => (
    <NavButton href="#" isActive={false} onClick={handleClick} Icon={<span>🏠</span>}>
      Home
    </NavButton>
  ),
};

export const Active: Story = {
  render: (props) => (
    <NavButton href="#" isActive={true} onClick={handleClick}>
      Home
    </NavButton>
  ),
};

export const ActiveWithIcon: Story = {
  render: (props) => (
    <NavButton href="#" isActive={true} onClick={handleClick} Icon={<span>🏠</span>}>
      Home
    </NavButton>
  ),
};

export const Disabled: Story = {
  render: (props) => (
    <NavButton href="#" isActive={false} onClick={handleClick} disabled>
      Home
    </NavButton>
  ),
};

export const DisabledWithIcon: Story = {
  render: (props) => (
    <NavButton href="#" isActive={false} onClick={handleClick} Icon={<span>🏠</span>} disabled>
      Home
    </NavButton>
  ),
};

export const Group: Story = {
  render: (props) => (
    <ButtonGroup>
      <NavButton href="#" isActive={false} onClick={handleClick}>
        Home
      </NavButton>
      <NavButton href="#" isActive={true} onClick={handleClick}>
        Vault
      </NavButton>
    </ButtonGroup>
  ),
};
