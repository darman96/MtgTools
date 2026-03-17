import type { ComponentChildren } from 'preact';
import type { Meta, StoryObj } from '@storybook/preact-vite';
import {
Badge,
Box,
Button,
Checkbox,
CheckboxCard,
CheckboxGroup,
Editable,
Field,
Fieldset,
Group,
Heading,
HStack,
IconButton,
Input,
InputAddon,
InputElement,
InputGroup,
NativeSelect,
NumberInput,
PinInput,
Portal,
RadioCard,
RadioGroup,
RatingGroup,
SegmentGroup,
Select,
SimpleGrid,
Slider,
Span,
Stack,
Switch,
TagsInput,
Text,
Textarea,
VStack,
createListCollection,
} from '@chakra-ui/react';

const meta = {
title: 'Chakra/Forms/Inputs',
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

const formatCollection = createListCollection({
items: [
{ label: 'Commander', value: 'commander' },
{ label: 'Standard', value: 'standard' },
{ label: 'Pioneer', value: 'pioneer' },
{ label: 'Cube', value: 'cube' },
],
});

const syncTargets = [
{
value: 'collection',
label: 'Collection sync',
description: 'Keep the local library mirrored from imports.',
},
{
value: 'wishlist',
label: 'Wishlist',
description: 'Track missing cards you still want to acquire.',
},
{
value: 'analytics',
label: 'Analytics',
description: 'Enable price and deck trend insights.',
},
] as const;

const automationModes = [
{
value: 'manual',
label: 'Manual review',
description: 'Approve every detected deck change before import.',
},
{
value: 'assisted',
label: 'Assisted',
description: 'Auto-suggest merges, but let players confirm.',
},
{
value: 'automatic',
label: 'Automatic',
description: 'Accept safe updates without prompts.',
},
] as const;

const segmentItems = [
{ value: 'grid', label: 'Grid' },
{ value: 'list', label: 'List' },
{ value: 'compact', label: 'Compact' },
] as const;

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

function Glyph({ children }: { children: ComponentChildren }) {
return (
<Box as="span" color="fg.muted" fontSize="sm" aria-hidden="true">
{children}
</Box>
);
}

export const TextEntryAndActions: Story = {
render: () => (
<Stack gap="8" width="min(100%, 72rem)">
<Section
title="Buttons, IconButton and direct text entry"
description="Compact action bars pair naturally with text fields, add-ons and inline editing."
>
<Stack gap="6">
<HStack gap="3" wrap="wrap">
<Button colorPalette="blue">Save profile</Button>
<Button variant="outline">Preview import</Button>
<Button variant="subtle" colorPalette="green">
Auto-fill basics
</Button>
<IconButton aria-label="Favorite deck" variant="outline">
★
</IconButton>
<IconButton aria-label="Refresh suggestions" colorPalette="purple">
↻
</IconButton>
</HStack>

<SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
<Field.Root>
<Field.Label>Deck title</Field.Label>
<Input placeholder="Esper Artifacts" />
<Field.HelperText>Use a short, searchable label for imports and saved views.</Field.HelperText>
</Field.Root>

<Field.Root>
<Field.Label>Search with InputGroup</Field.Label>
<InputGroup startElement={<Glyph>⌕</Glyph>} endElement={<Badge variant="surface">CMDR</Badge>}>
<Input placeholder="Find cards, sets or decks" />
</InputGroup>
<Field.HelperText>InputGroup handles adornments without custom layout wrappers.</Field.HelperText>
</Field.Root>

<Field.Root>
<Field.Label>InputAddon composition</Field.Label>
<Group attached width="full">
<InputAddon>https://</InputAddon>
<Input placeholder="mtgtools.local/decks/esper-artifacts" />
</Group>
<Field.HelperText>Add-ons work well for fixed prefixes and suffixes.</Field.HelperText>
</Field.Root>

<Field.Root>
<Field.Label>InputElement placement</Field.Label>
<Box position="relative">
<Input defaultValue="250" pe="10" />
<InputElement placement="end" px="3" color="fg.muted">
ms
</InputElement>
</Box>
<Field.HelperText>Use InputElement for inline units, icons and status affordances.</Field.HelperText>
</Field.Root>
</SimpleGrid>
</Stack>
</Section>

<Section
title="Textarea and Editable"
description="Long-form notes and inline edits cover the most common authoring flows."
>
<SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
<Field.Root>
<Field.Label>Notes</Field.Label>
<Textarea minH="9rem" placeholder="Capture mulligan notes, matchup plans and sideboard ideas..." />
<Field.HelperText>Textarea is ideal for comments, strategy notes and deck descriptions.</Field.HelperText>
</Field.Root>

<Field.Root>
<Field.Label>Editable title</Field.Label>
<Editable.Root defaultValue="Click to rename this deck">
<Editable.Preview minH="10" alignItems="center" px="3" rounded="md" borderWidth="1px" />
<Editable.Input px="3" />
<Editable.Control mt="3">
<HStack gap="2">
<Editable.EditTrigger asChild>
<Button size="xs" variant="outline">
Edit
</Button>
</Editable.EditTrigger>
<Editable.CancelTrigger asChild>
<Button size="xs" variant="ghost">
Cancel
</Button>
</Editable.CancelTrigger>
<Editable.SubmitTrigger asChild>
<Button size="xs" colorPalette="blue">
Apply
</Button>
</Editable.SubmitTrigger>
</HStack>
</Editable.Control>
</Editable.Root>
<Field.HelperText>Editable keeps quick renaming flows inline instead of opening a modal.</Field.HelperText>
</Field.Root>
</SimpleGrid>
</Section>
</Stack>
),
};

export const StructuredFieldCompositions: Story = {
render: () => (
<Stack gap="8" width="min(100%, 72rem)">
<Section
title="Field, Fieldset, NativeSelect, Select, NumberInput and PinInput"
description="Chakra input wrappers keep labels, helper text and selection widgets aligned."
>
<Fieldset.Root maxW="3xl">
<Fieldset.Legend>Import preferences</Fieldset.Legend>
<Fieldset.HelperText>Choose a default format, batch size and verification options.</Fieldset.HelperText>
<Fieldset.Content>
<SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
<Field.Root>
<Field.Label>Collection name</Field.Label>
<Input placeholder="Weekend paper sync" />
</Field.Root>

<Field.Root>
<Field.Label>Fallback export</Field.Label>
<NativeSelect.Root>
<NativeSelect.Field defaultValue="csv">
<option value="csv">CSV export</option>
<option value="json">JSON snapshot</option>
<option value="html">Share page</option>
</NativeSelect.Field>
<NativeSelect.Indicator />
</NativeSelect.Root>
</Field.Root>

<Select.Root collection={formatCollection} defaultValue={['commander']}>
<Select.HiddenSelect />
<Select.Label>Primary format</Select.Label>
<Select.Control>
<Select.Trigger>
<Select.ValueText placeholder="Choose format" />
</Select.Trigger>
<Select.IndicatorGroup>
<Select.Indicator />
</Select.IndicatorGroup>
</Select.Control>
<Portal>
<Select.Positioner>
<Select.Content>
{formatCollection.items.map((item) => (
<Select.Item key={item.value} item={item}>
<Select.ItemText>{item.label}</Select.ItemText>
<Select.ItemIndicator />
</Select.Item>
))}
</Select.Content>
</Select.Positioner>
</Portal>
</Select.Root>

<NumberInput.Root defaultValue="250" min={50} max={500} step={25}>
<NumberInput.Label>Cards per page</NumberInput.Label>
<NumberInput.Control>
<NumberInput.DecrementTrigger />
<NumberInput.IncrementTrigger />
</NumberInput.Control>
<NumberInput.Input />
</NumberInput.Root>

<PinInput.Root otp defaultValue={['1', '2', '4', '8']}>
<PinInput.Label>Verification code</PinInput.Label>
<PinInput.HiddenInput />
<PinInput.Control>
<PinInput.Input index={0} />
<PinInput.Input index={1} />
<PinInput.Input index={2} />
<PinInput.Input index={3} />
</PinInput.Control>
</PinInput.Root>
</SimpleGrid>
</Fieldset.Content>
</Fieldset.Root>
</Section>
</Stack>
),
};

export const SelectionControls: Story = {
render: () => (
<Stack gap="8" width="min(100%, 72rem)">
<Section
title="Checkbox, CheckboxCard, Switch, RadioGroup, RadioCard and SegmentGroup"
description="Selection controls range from compact toggles to full-width choice cards."
>
<Stack gap="6">
<HStack gap="6" wrap="wrap">
<Checkbox.Root defaultChecked>
<Checkbox.HiddenInput />
<Checkbox.Control />
<Checkbox.Label>Sync cover images</Checkbox.Label>
</Checkbox.Root>
<Switch.Root defaultChecked>
<Switch.HiddenInput />
<Switch.Control />
<Switch.Label>Enable background refresh</Switch.Label>
</Switch.Root>
</HStack>

<CheckboxGroup defaultValue={['collection']}>
<Stack gap="3">
<Text fontWeight="semibold">CheckboxCard group</Text>
<SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
{syncTargets.map((item) => (
<CheckboxCard.Root key={item.value} value={item.value} variant="outline">
<CheckboxCard.HiddenInput />
<CheckboxCard.Control>
<CheckboxCard.Content>
<CheckboxCard.Label>{item.label}</CheckboxCard.Label>
<CheckboxCard.Description>{item.description}</CheckboxCard.Description>
</CheckboxCard.Content>
<CheckboxCard.Indicator />
</CheckboxCard.Control>
</CheckboxCard.Root>
))}
</SimpleGrid>
</Stack>
</CheckboxGroup>

<SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
<RadioGroup.Root defaultValue="manual">
<RadioGroup.Label>Automation mode</RadioGroup.Label>
<VStack align="stretch" gap="3" mt="3">
{automationModes.map((item) => (
<RadioGroup.Item key={item.value} value={item.value}>
<RadioGroup.ItemHiddenInput />
<RadioGroup.ItemControl>
<RadioGroup.ItemIndicator />
</RadioGroup.ItemControl>
<Stack gap="0" ms="3">
<RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
<Text textStyle="sm" color="fg.muted">
{item.description}
</Text>
</Stack>
</RadioGroup.Item>
))}
</VStack>
</RadioGroup.Root>

<Stack gap="4">
<RadioCard.Root defaultValue="collection">
<RadioCard.Label>Primary destination</RadioCard.Label>
<HStack align="stretch" wrap="wrap">
{syncTargets.map((item) => (
<RadioCard.Item key={item.value} value={item.value}>
<RadioCard.ItemHiddenInput />
<RadioCard.ItemControl>
<RadioCard.ItemContent>
<RadioCard.ItemText>{item.label}</RadioCard.ItemText>
<RadioCard.ItemDescription>{item.description}</RadioCard.ItemDescription>
</RadioCard.ItemContent>
<RadioCard.ItemIndicator />
</RadioCard.ItemControl>
</RadioCard.Item>
))}
</HStack>
</RadioCard.Root>

<SegmentGroup.Root defaultValue="grid" size="sm">
<SegmentGroup.Indicator />
{segmentItems.map((item) => (
<SegmentGroup.Item key={item.value} value={item.value}>
<SegmentGroup.ItemHiddenInput />
<SegmentGroup.ItemText>{item.label}</SegmentGroup.ItemText>
</SegmentGroup.Item>
))}
</SegmentGroup.Root>
</Stack>
</SimpleGrid>
</Stack>
</Section>
</Stack>
),
};

export const AdvancedValueInputs: Story = {
render: () => (
<Stack gap="8" width="min(100%, 72rem)">
<Section
title="Slider, RatingGroup and TagsInput"
description="These controls are handy for tunable values, sentiment and freeform labels."
>
<SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
<Stack gap="5">
<Slider.Root defaultValue={[72]} maxW="sm" colorPalette="purple">
<HStack justify="space-between">
<Slider.Label>Confidence threshold</Slider.Label>
<Slider.ValueText />
</HStack>
<Slider.Control>
<Slider.Track>
<Slider.Range />
</Slider.Track>
<Slider.Thumbs />
<Slider.Marks marks={[0, 50, 100]} />
</Slider.Control>
</Slider.Root>

<RatingGroup.Root count={5} defaultValue={4} size="md" gap="3">
<RatingGroup.Label>Review confidence</RatingGroup.Label>
<RatingGroup.HiddenInput />
<RatingGroup.Control />
</RatingGroup.Root>
</Stack>

<Stack gap="4">
<TagsInput.Root defaultValue={['Commander', 'Artifacts', 'Budget']}>
<TagsInput.Label>Archetype tags</TagsInput.Label>
<TagsInput.Control>
<TagsInput.Items />
<TagsInput.Input placeholder="Add tag..." />
</TagsInput.Control>
<TagsInput.HiddenInput />
</TagsInput.Root>
<Span textStyle="xs" color="fg.muted" ms="auto">
Press Enter or Return to add another tag.
</Span>
</Stack>
</SimpleGrid>
</Section>
</Stack>
),
};
