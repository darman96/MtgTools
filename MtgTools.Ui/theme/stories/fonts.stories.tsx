import type { Meta, StoryObj } from "@storybook/preact";
import { Box, Code, Heading, Separator, Stack, Text } from "@chakra-ui/react";

const FONT_FAMILIES = [
  {
    label: "body",
    fontFamily: "body",
  },
  {
    label: "heading",
    fontFamily: "heading",
  },
  {
    label: "sans",
    fontFamily: "sans",
  },
  {
    label: "serif",
    fontFamily: "serif",
  },
  { label: "display", fontFamily: "display" },
  {
    label: "fantasy",
    fontFamily: "fantasy",
  },
] as const;

const SAMPLE_TEXT = "Spellbook — Crazy Fredrick bought many very exquisite opal jewels.";
const LETTERS_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LETTERS_LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS_SYMBOLS = "0123456789 — ! ? &amp; / ( ) [ ]";

const FontPreview = ({ label, fontFamily }: { label: string; fontFamily: string }) => {
  return (
    <Stack
      gap={3}
      p={5}
      borderWidth="1px"
      borderColor="border.emphasized"
      borderRadius="l3"
      bg="bg.panel"
    >
      <Stack gap={1}>
        <Code alignSelf="start">fontFamily=&quot;{fontFamily}&quot;</Code>
        <Text fontSize="sm" color="fg.muted">
          {label}
        </Text>
      </Stack>

      <Text fontFamily={fontFamily} fontSize="2xl" lineHeight="shorter">
        {SAMPLE_TEXT}
      </Text>

      <Separator />

      <Text fontFamily={fontFamily} fontSize="md">
        {LETTERS_UPPER}
      </Text>
      <Text fontFamily={fontFamily} fontSize="md">
        {LETTERS_LOWER}
      </Text>
      <Text fontFamily={fontFamily} fontSize="md">
        {NUMBERS_SYMBOLS}
      </Text>
    </Stack>
  );
};

const meta = {
  title: "Typography/Font Families",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Comparison: Story = {
  render: () => (
    <Stack gap={6} maxW="5xl" p={4}>
      <Box>
        <Heading size="lg">Font family comparison</Heading>
        <Text color="fg.muted" mt={2}>
          Compare the configured UI font tokens side by side in the active theme.
        </Text>
      </Box>

      <Stack gap={4}>
        {FONT_FAMILIES.map((font) => (
          <FontPreview key={font.label} {...font} />
        ))}
      </Stack>
    </Stack>
  ),
};

export const Roles: Story = {
  render: () => (
    <Stack gap={6} maxW="4xl" p={4}>
      <Box>
        <Heading size="lg">Semantic font roles</Heading>
        <Text color="fg.muted" mt={2}>
          Preview the default body and heading roles alongside the decorative accent families.
        </Text>
      </Box>

      <Stack gap={5}>
        <Box>
          <Text fontSize="sm" color="fg.muted" mb={2}>
            Heading role
          </Text>
          <Heading fontFamily="heading" size="2xl">
            MTG Tools Deck Builder
          </Heading>
        </Box>

        <Box>
          <Text fontSize="sm" color="fg.muted" mb={2}>
            Body role
          </Text>
          <Text fontFamily="body" fontSize="lg">
            Organize your collection, tune mana curves, and compare lists with a readable interface.
          </Text>
        </Box>

        <Box>
          <Text fontSize="sm" color="fg.muted" mb={2}>
            Display accent
          </Text>
          <Text fontFamily="display" fontSize="3xl">
            The Vault of Relics
          </Text>
        </Box>

        <Box>
          <Text fontSize="sm" color="fg.muted" mb={2}>
            Fantasy accent
          </Text>
          <Text fontFamily="fantasy" fontSize="2xl">
            Arcane Catalogue
          </Text>
        </Box>
      </Stack>
    </Stack>
  ),
};
