import type { ComponentChildren } from 'preact';
import type { Meta, StoryObj } from '@storybook/preact-vite';
import {
AbsoluteCenter,
AspectRatio,
Badge,
Bleed,
Blockquote,
Box,
Center,
Circle,
Code,
Container,
Em,
Flex,
Float,
Grid,
Group,
Heading,
Highlight,
HStack,
Kbd,
Mark,
Progress,
ProgressCircle,
Separator,
Show,
SimpleGrid,
Skeleton,
SkeletonCircle,
SkeletonText,
Spacer,
Spinner,
Square,
Stack,
Status,
Sticky,
Strong,
Text,
VStack,
VisuallyHidden,
Wrap,
} from '@chakra-ui/react';

const meta = {
title: 'Chakra/Primitives/Layout',
tags: ['autodocs'],
parameters: {
layout: 'padded',
},
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

type SectionProps = {
title: string;
description?: string;
children: ComponentChildren;
};

function Section({ title, description, children }: SectionProps) {
return (
<Stack gap="4">
<VStack align="start" gap="1">
<Heading size="md">{title}</Heading>
{description ? <Text color="fg.muted">{description}</Text> : null}
</VStack>
<Box borderWidth="1px" rounded="xl" bg="bg.panel" p="5">
{children}
</Box>
</Stack>
);
}

function Surface({ children }: { children: ComponentChildren }) {
return (
<Center minH="20" rounded="lg" borderWidth="1px" bg="bg.subtle" p="4">
{children}
</Center>
);
}

export const LayoutSystems: Story = {
render: () => (
<Stack gap="8" width="min(100%, 72rem)">
<Section
title="Box, Flex, Grid and SimpleGrid"
description="Foundational layout primitives keep spacing, alignment and responsiveness predictable."
>
<Stack gap="6">
<HStack align="stretch" gap="4" wrap="wrap">
<Box minW="14rem" flex="1" rounded="lg" bg="blue.subtle" color="blue.fg" p="4">
<Heading size="sm" mb="2">
Box
</Heading>
<Text>Use Box as the base surface for cards, panels and custom compositions.</Text>
</Box>
<Flex
minW="18rem"
flex="2"
align="center"
gap="3"
rounded="lg"
borderWidth="1px"
bg="bg.subtle"
p="4"
>
<Badge colorPalette="blue">Flex</Badge>
<Text fontWeight="medium">Collection summary</Text>
<Spacer />
<Badge variant="outline">Search</Badge>
<Badge variant="subtle" colorPalette="green">
Synced
</Badge>
</Flex>
</HStack>

<Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap="4">
<Box rounded="lg" bg="purple.subtle" p="4" minH="20">
Browse
</Box>
<Box rounded="lg" bg="orange.subtle" p="4" minH="20">
Filters
</Box>
<Box rounded="lg" bg="green.subtle" p="4" minH="20">
Insights
</Box>
<Box rounded="lg" bg="blue.subtle" p="4" minH="20">
Actions
</Box>
</Grid>

<SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="4">
{['Commander deck', 'Collection sync', 'Price alerts', 'Shared lists'].map((item) => (
<Surface key={item}>
<Text fontWeight="medium">{item}</Text>
</Surface>
))}
</SimpleGrid>
</Stack>
</Section>

<Section
title="Stack, HStack, VStack, Group, Wrap and Separator"
description="Directional stacks make recurring UI clusters easier to build and scan."
>
<Stack gap="5">
<HStack align="start" gap="6" wrap="wrap">
<Stack gap="3" minW="12rem">
<Text fontWeight="semibold">Stack</Text>
<Badge alignSelf="start">Decks</Badge>
<Text color="fg.muted">Mana curve</Text>
<Text color="fg.muted">Card draw</Text>
</Stack>

<VStack align="stretch" gap="3" minW="12rem">
<Text fontWeight="semibold">VStack</Text>
<Surface>Overview</Surface>
<Surface>Activity</Surface>
</VStack>

<Stack gap="3" minW="16rem">
<Text fontWeight="semibold">HStack + Separator</Text>
<HStack rounded="lg" borderWidth="1px" bg="bg.subtle" p="3" gap="4">
<Text>Browse</Text>
<Separator orientation="vertical" height="4" />
<Text>Decks</Text>
<Separator orientation="vertical" height="4" />
<Text>Settings</Text>
</HStack>
</Stack>
</HStack>

<Group attached alignSelf="start">
<Badge variant="solid" colorPalette="purple">
Collection
</Badge>
<Badge variant="solid" colorPalette="green">
432 cards
</Badge>
</Group>

<Wrap gap="3">
{['Artifacts', 'Ramp', 'Removal', 'Draft', 'Budget', 'Tokens'].map((tag) => (
<Badge key={tag} variant="surface" colorPalette="blue">
{tag}
</Badge>
))}
</Wrap>
</Stack>
</Section>

<Section
title="Container"
description="Container keeps readable max-widths out of one-off layout code."
>
<Box bg="bg.subtle" rounded="xl" py="8">
<Container maxW="3xl">
<Stack gap="3">
<Badge alignSelf="start" colorPalette="teal">
Contained content
</Badge>
<Heading size="lg">Readable surfaces stay easier to scan</Heading>
<Text color="fg.muted">
The layout can stretch with the viewport while the content remains comfortable to read.
</Text>
</Stack>
</Container>
</Box>
</Section>
</Stack>
),
};

export const PositioningAndComposition: Story = {
render: () => (
<Stack gap="8" width="min(100%, 72rem)">
<Section
title="Center, Square, Circle, AspectRatio and AbsoluteCenter"
description="Dedicated composition helpers remove repeated positioning boilerplate."
>
<Stack gap="6">
<HStack gap="4" wrap="wrap">
<Center w="7rem" h="7rem" rounded="xl" bg="bg.subtle" borderWidth="1px">
<Text fontWeight="medium">Center</Text>
</Center>
<Square size="7rem" rounded="xl" bg="purple.subtle" color="purple.fg">
Square
</Square>
<Circle size="7rem" bg="blue.subtle" color="blue.fg">
Circle
</Circle>
</HStack>

<SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
<AspectRatio ratio={16 / 9} rounded="xl" overflow="hidden" borderWidth="1px">
<Center bgGradient="to-br" gradientFrom="purple.500" gradientTo="pink.400" color="white">
Preview surface
</Center>
</AspectRatio>

<Box position="relative" rounded="xl" borderWidth="1px" minH="12rem" bg="bg.subtle">
<AbsoluteCenter axis="both">
<Badge colorPalette="blue">AbsoluteCenter</Badge>
</AbsoluteCenter>
</Box>
</SimpleGrid>
</Stack>
</Section>

<Section
title="Bleed, Float and Sticky"
description="These helpers are useful for callouts, badges and anchored sub-sections."
>
<Stack gap="6">
<Box rounded="xl" borderWidth="1px" bg="bg.panel" p="6">
<Text fontWeight="medium" mb="2">
Bleed can let content escape padded shells.
</Text>
<Bleed inline="6" blockEnd="6">
<Box bg="orange.subtle" color="orange.fg" px="6" py="4">
Full-width release note strip
</Box>
</Bleed>
</Box>

<Box position="relative" rounded="xl" borderWidth="1px" bg="bg.subtle" p="6">
<Float placement="top-end" offset="4">
<Badge colorPalette="green">Live</Badge>
</Float>
<Heading size="sm" mb="2">
Float badge
</Heading>
<Text color="fg.muted">Use Float for chips, counts and lightweight status markers.</Text>
</Box>

<Box rounded="xl" borderWidth="1px" maxH="14rem" overflow="auto">
<Sticky top="0" bg="bg.panel" borderBottomWidth="1px" px="4" py="3">
<Text fontWeight="semibold">Sticky section header</Text>
</Sticky>
<Stack gap="3" p="4">
{Array.from({ length: 6 }, (_, index) => (
<Box key={index} rounded="lg" bg="bg.subtle" p="3">
Release checklist item {index + 1}
</Box>
))}
</Stack>
</Box>
</Stack>
</Section>
</Stack>
),
};

export const TypographyAndFeedback: Story = {
render: () => (
<Stack gap="8" width="min(100%, 72rem)">
<Section
title="Heading, Text, Em, Strong, Mark, Highlight, Code and Kbd"
description="Typography primitives let rich content stay expressive without custom CSS."
>
<Stack gap="4">
<Heading size="lg">Deck publishing guidelines</Heading>
<Text color="fg.muted">
Use <Em>emphasis</Em>, <Strong>important emphasis</Strong>, and <Mark>marks</Mark> to direct attention.
</Text>
<Text>
<Highlight query={['Commander', 'Sideboard']} styles={{ px: '1.5', py: '0.5', rounded: 'sm', bg: 'yellow.subtle' }}>
Commander exports should include Sideboard notes and a short matchup summary.
</Highlight>
</Text>
<HStack gap="3" wrap="wrap">
<Code>npm run build-storybook</Code>
<Kbd>Shift</Kbd>
<Kbd>Tab</Kbd>
</HStack>
</Stack>
</Section>

<Section
title="Blockquote, Show and VisuallyHidden"
description="Semantic helpers make accessibility and content presentation easier to maintain."
>
<Stack gap="5">
<Blockquote.Root>
<Blockquote.Icon />
<Blockquote.Content>
The fastest way to improve a Storybook is to show real compositions instead of isolated atoms.
</Blockquote.Content>
<Blockquote.Caption>Design system review</Blockquote.Caption>
</Blockquote.Root>

<Show when>
<Badge alignSelf="start" colorPalette="green">
Visible content from Show
</Badge>
</Show>

<Box as="span" display="inline-flex" alignItems="center" gap="2" fontWeight="medium">
Star
<VisuallyHidden>Add deck to favorites</VisuallyHidden>
</Box>
</Stack>
</Section>

<Section
title="Spinner, Skeleton, Progress, ProgressCircle, Status and Badge"
description="Loading and status primitives are useful for both waiting states and long-running tasks."
>
<Stack gap="6">
<HStack gap="6" wrap="wrap">
<Spinner size="sm" color="blue.solid" />
<Status.Root colorPalette="green">
<Status.Indicator />
<Text>Collection synced</Text>
</Status.Root>
<Badge variant="surface" colorPalette="purple">
Preview build ready
</Badge>
</HStack>

<SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
<Stack gap="3">
<SkeletonCircle size="12" />
<Skeleton height="4" />
<SkeletonText noOfLines={3} gap="2" />
</Stack>

<Stack gap="5">
<Progress.Root value={72}>
<HStack justify="space-between">
<Progress.Label>Thumbnail queue</Progress.Label>
<Progress.ValueText />
</HStack>
<Progress.Track>
<Progress.Range />
</Progress.Track>
</Progress.Root>

<ProgressCircle.Root value={64} size="lg" colorPalette="teal" alignSelf="start">
<ProgressCircle.Circle>
<ProgressCircle.Track />
<ProgressCircle.Range />
</ProgressCircle.Circle>
<ProgressCircle.ValueText />
</ProgressCircle.Root>
</Stack>
</SimpleGrid>
</Stack>
</Section>
</Stack>
),
};
