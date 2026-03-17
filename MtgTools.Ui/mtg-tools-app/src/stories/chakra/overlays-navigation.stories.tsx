import type { ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';
import type { Meta, StoryObj } from '@storybook/preact-vite';
import {
Accordion,
ActionBar,
Alert,
Box,
Breadcrumb,
Button,
ButtonGroup,
Checkbox,
Clipboard,
CloseButton,
Collapsible,
Dialog,
Drawer,
EmptyState,
HoverCard,
HStack,
Input,
Link,
Menu,
Pagination,
Popover,
Portal,
Stack,
Steps,
Tabs,
Text,
Tooltip,
VStack,
} from '@chakra-ui/react';

const meta = {
title: 'Chakra/Overlays & Navigation',
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

const accordionItems = [
{
value: 'alerts',
title: 'Match alerts',
text: 'Tune which price spikes, deck imports or event reminders trigger notifications for the team.',
},
{
value: 'automation',
title: 'Nightly sync jobs',
text: 'Review background updates for collections, metagame snapshots and draft logs before tomorrow morning.',
},
{
value: 'sharing',
title: 'Public sharing rules',
text: 'Control which collaborators can publish deck notes, sideboard guides and collection exports.',
},
] as const;

const wizardSteps = [
{ title: 'Collection', description: 'Choose the library and formats this workflow should use.' },
{ title: 'Sync', description: 'Connect an import source and preview the latest changes.' },
{ title: 'Review', description: 'Confirm collaborators, alerts and export options before saving.' },
] as const;

function Section({ title, description, children }: SectionProps) {
return (
<Stack gap="4">
<VStack align="start" gap="1">
<Text fontSize="xl" fontWeight="semibold">
{title}
</Text>
{description ? <Text color="fg.muted">{description}</Text> : null}
</VStack>
<Box borderWidth="1px" rounded="xl" bg="bg.panel" p="5">
{children}
</Box>
</Stack>
);
}

function ReleaseNotesCollapsible() {
const [open, setOpen] = useState(false);

return (
<Collapsible.Root open={open} onOpenChange={(details) => setOpen(details.open)}>
<Stack gap="3">
<Collapsible.Trigger asChild>
<Button variant="outline" size="sm">
{open ? 'Hide' : 'Show'} release notes
</Button>
</Collapsible.Trigger>
<Collapsible.Content>
<Box rounded="lg" bg="bg.subtle" p="4">
<Text color="fg.muted">
This release adds collection import previews, richer deck sharing metadata and improved Storybook coverage.
</Text>
</Box>
</Collapsible.Content>
</Stack>
</Collapsible.Root>
);
}

function ActionBarDemo() {
const [selected, setSelected] = useState(true);

return (
<Stack gap="4">
<Checkbox.Root checked={selected} onCheckedChange={(event) => setSelected(Boolean(event.checked))}>
<Checkbox.HiddenInput />
<Checkbox.Control />
<Checkbox.Label>Show bulk action bar</Checkbox.Label>
</Checkbox.Root>
<ActionBar.Root open={selected} onOpenChange={(event) => setSelected(event.open)} closeOnInteractOutside={false}>
<Portal>
<ActionBar.Positioner>
<ActionBar.Content>
<ActionBar.SelectionTrigger>3 selected</ActionBar.SelectionTrigger>
<ActionBar.Separator />
<Button size="sm" variant="outline">
Archive
</Button>
<Button size="sm" variant="outline">
Share
</Button>
<ActionBar.CloseTrigger asChild>
<CloseButton size="sm" />
</ActionBar.CloseTrigger>
</ActionBar.Content>
</ActionBar.Positioner>
</Portal>
</ActionBar.Root>
</Stack>
);
}

export const FeedbackAndDisclosure: Story = {
render: () => (
<Stack gap="8" width="min(100%, 72rem)">
<Section
title="Alert, EmptyState, Accordion, Collapsible and Clipboard"
description="Feedback and disclosure components help explain state changes without custom plumbing."
>
<Stack gap="6">
<Alert.Root colorPalette="green" variant="surface">
<Alert.Indicator />
<Alert.Content>
<Alert.Title>Collection sync completed</Alert.Title>
<Alert.Description>224 cards were refreshed and 6 deck links were repaired.</Alert.Description>
</Alert.Content>
</Alert.Root>

<EmptyState.Root>
<EmptyState.Indicator>
<Box fontSize="2xl">∅</Box>
</EmptyState.Indicator>
<EmptyState.Content>
<EmptyState.Title>No pending imports</EmptyState.Title>
<EmptyState.Description>Drop a new deck list here to test the upload and parsing flow.</EmptyState.Description>
</EmptyState.Content>
</EmptyState.Root>

<Accordion.Root collapsible defaultValue={['automation']}>
{accordionItems.map((item) => (
<Accordion.Item key={item.value} value={item.value}>
<Accordion.ItemTrigger>
<Box flex="1">{item.title}</Box>
<Accordion.ItemIndicator />
</Accordion.ItemTrigger>
<Accordion.ItemContent>
<Accordion.ItemBody>{item.text}</Accordion.ItemBody>
</Accordion.ItemContent>
</Accordion.Item>
))}
</Accordion.Root>

<ReleaseNotesCollapsible />

<Clipboard.Root value="https://mtgtools.local/storybook/collection-sync">
<Clipboard.Label textStyle="sm" fontWeight="medium" display="inline-block" mb="1">
Story permalink
</Clipboard.Label>
<HStack>
<Clipboard.Input asChild>
<Input />
</Clipboard.Input>
<Clipboard.Trigger asChild>
<Button variant="surface" size="sm">
<Clipboard.Indicator />
<Clipboard.CopyText />
</Button>
</Clipboard.Trigger>
</HStack>
</Clipboard.Root>
</Stack>
</Section>
</Stack>
),
};

export const NavigationAndProgress: Story = {
render: () => (
<Stack gap="8" width="min(100%, 72rem)">
<Section
title="Breadcrumb, Tabs, Pagination and Steps"
description="These primitives help orient users inside flows and multi-step workspaces."
>
<Stack gap="6">
<Breadcrumb.Root>
<Breadcrumb.List>
<Breadcrumb.Item>
<Breadcrumb.Link href="#collections">Collections</Breadcrumb.Link>
</Breadcrumb.Item>
<Breadcrumb.Item>
<Breadcrumb.Link href="#featured">Featured decks</Breadcrumb.Link>
</Breadcrumb.Item>
<Breadcrumb.Item>
<Breadcrumb.CurrentLink>Artifact Primer</Breadcrumb.CurrentLink>
</Breadcrumb.Item>
</Breadcrumb.List>
</Breadcrumb.Root>

<Tabs.Root defaultValue="members" variant="outline">
<Tabs.List>
<Tabs.Trigger value="members">Members</Tabs.Trigger>
<Tabs.Trigger value="projects">Projects</Tabs.Trigger>
<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
<Tabs.Indicator />
</Tabs.List>
<Tabs.Content value="members">Manage access to shared deck notes and collections.</Tabs.Content>
<Tabs.Content value="projects">Track Storybook work, imports and desktop host integration.</Tabs.Content>
<Tabs.Content value="settings">Configure release previews, upload rules and automation.</Tabs.Content>
</Tabs.Root>

<Pagination.Root count={50} pageSize={5} defaultPage={3}>
<ButtonGroup variant="outline" size="sm">
<Pagination.PrevTrigger asChild>
<Button>Prev</Button>
</Pagination.PrevTrigger>
<Pagination.Items render={(page) => <Button variant={{ base: 'outline', _selected: 'solid' }}>{page.value}</Button>} />
<Pagination.NextTrigger asChild>
<Button>Next</Button>
</Pagination.NextTrigger>
</ButtonGroup>
</Pagination.Root>

<Steps.Root defaultStep={1} count={wizardSteps.length}>
<Steps.List>
{wizardSteps.map((step, index) => (
<Steps.Item key={step.title} index={index} title={step.title}>
<Steps.Indicator />
<Box>
<Steps.Title>{step.title}</Steps.Title>
<Steps.Description>{step.description}</Steps.Description>
</Box>
<Steps.Separator />
</Steps.Item>
))}
</Steps.List>
{wizardSteps.map((step, index) => (
<Steps.Content key={step.title} index={index}>
<Box rounded="lg" bg="bg.subtle" p="4">
{step.description}
</Box>
</Steps.Content>
))}
<Steps.CompletedContent>All steps are complete.</Steps.CompletedContent>
<ButtonGroup size="sm" variant="outline">
<Steps.PrevTrigger asChild>
<Button>Prev</Button>
</Steps.PrevTrigger>
<Steps.NextTrigger asChild>
<Button>Next</Button>
</Steps.NextTrigger>
</ButtonGroup>
</Steps.Root>
</Stack>
</Section>
</Stack>
),
};

export const SurfaceOverlays: Story = {
render: () => (
<Stack gap="8" width="min(100%, 72rem)">
<Section
title="Tooltip, HoverCard, Popover, Menu, Dialog, Drawer and ActionBar"
description="Overlay primitives cover lightweight hints through to fully trapped dialogs."
>
<Stack gap="6">
<HStack gap="4" wrap="wrap">
<Tooltip.Root>
<Tooltip.Trigger asChild>
<Button variant="outline" size="sm">
Hover for help
</Button>
</Tooltip.Trigger>
<Portal>
<Tooltip.Positioner>
<Tooltip.Content>
<Tooltip.Arrow>
<Tooltip.ArrowTip />
</Tooltip.Arrow>
Use tooltips for compact affordances and shortcuts.
</Tooltip.Content>
</Tooltip.Positioner>
</Portal>
</Tooltip.Root>

<HoverCard.Root>
<HoverCard.Trigger asChild>
<Link href="#release-checklist">Release checklist</Link>
</HoverCard.Trigger>
<Portal>
<HoverCard.Positioner>
<HoverCard.Content>
<Text fontWeight="semibold">Checklist preview</Text>
<Text color="fg.muted">Smoke test Storybook, verify imports and publish updated screenshots.</Text>
</HoverCard.Content>
</HoverCard.Positioner>
</Portal>
</HoverCard.Root>

<Popover.Root>
<Popover.Trigger asChild>
<Button variant="outline" size="sm">
Open popover
</Button>
</Popover.Trigger>
<Portal>
<Popover.Positioner>
<Popover.Content>
<Popover.Arrow />
<Popover.Body>
<Text fontWeight="semibold">Quick filters</Text>
<Input mt="3" size="sm" placeholder="Type a tag or format" />
</Popover.Body>
</Popover.Content>
</Popover.Positioner>
</Portal>
</Popover.Root>

<Menu.Root>
<Menu.Trigger asChild>
<Button variant="outline" size="sm">
Open menu
</Button>
</Menu.Trigger>
<Portal>
<Menu.Positioner>
<Menu.Content>
<Menu.Item value="rename">Rename deck</Menu.Item>
<Menu.Item value="duplicate">Duplicate</Menu.Item>
<Menu.Item value="archive">Archive</Menu.Item>
</Menu.Content>
</Menu.Positioner>
</Portal>
</Menu.Root>
</HStack>

<HStack gap="4" wrap="wrap" align="start">
<Dialog.Root>
<Dialog.Trigger asChild>
<Button colorPalette="blue">Open dialog</Button>
</Dialog.Trigger>
<Portal>
<Dialog.Backdrop />
<Dialog.Positioner>
<Dialog.Content>
<Dialog.Header>
<Dialog.Title>Publish Storybook snapshot</Dialog.Title>
</Dialog.Header>
<Dialog.Body>
<Text color="fg.muted">Ship the refreshed component catalog to the desktop preview.</Text>
</Dialog.Body>
<Dialog.Footer>
<Button variant="outline">Cancel</Button>
<Button colorPalette="blue">Publish</Button>
</Dialog.Footer>
<Dialog.CloseTrigger asChild>
<CloseButton size="sm" />
</Dialog.CloseTrigger>
</Dialog.Content>
</Dialog.Positioner>
</Portal>
</Dialog.Root>

<Drawer.Root placement="end">
<Drawer.Trigger asChild>
<Button variant="outline">Open drawer</Button>
</Drawer.Trigger>
<Portal>
<Drawer.Backdrop />
<Drawer.Positioner>
<Drawer.Content>
<Drawer.Header>
<Drawer.Title>Deck filters</Drawer.Title>
</Drawer.Header>
<Drawer.Body>
<Stack gap="3">
<Button variant="subtle">Commander</Button>
<Button variant="subtle">Draft</Button>
<Button variant="subtle">Cube</Button>
</Stack>
</Drawer.Body>
<Drawer.CloseTrigger asChild>
<CloseButton size="sm" />
</Drawer.CloseTrigger>
</Drawer.Content>
</Drawer.Positioner>
</Portal>
</Drawer.Root>
</HStack>

<ActionBarDemo />
</Stack>
</Section>
</Stack>
),
};
