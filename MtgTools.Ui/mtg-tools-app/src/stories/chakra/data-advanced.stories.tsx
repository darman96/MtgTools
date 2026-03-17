import type { ComponentChildren } from 'preact';
import type { Meta, StoryObj } from '@storybook/preact-vite';
import {
	Avatar,
	Box,
	Button,
	Card,
	Carousel,
	ColorPicker,
	ColorSwatch,
	Combobox,
	createListCollection,
	createTreeCollection,
	DataList,
	FileUpload,
	HStack,
	Heading,
	Image,
	Link,
	List,
	Listbox,
	Marquee,
	Portal,
	QrCode,
	ScrollArea,
	SimpleGrid,
	Splitter,
	Stack,
	Stat,
	Table,
	Tag,
	Text,
	Timeline,
	TreeView,
	parseColor,
	useFilter,
	useListCollection,
} from '@chakra-ui/react';

const owner = {
	name: 'Ari Stone',
	src: 'https://i.pravatar.cc/160?img=11',
};

const releaseRows = [
	{
		name: 'Legends Refresh',
		format: 'Commander',
		owner: 'Ari',
		status: 'Ready',
		href: 'https://example.com/legends-refresh',
	},
	{
		name: 'Vintage Cube',
		format: 'Cube',
		owner: 'Jules',
		status: 'Review',
		href: 'https://example.com/vintage-cube',
	},
	{
		name: 'Budget Tokens',
		format: 'Casual',
		owner: 'Mina',
		status: 'Draft',
		href: 'https://example.com/budget-tokens',
	},
	{
		name: 'Artifact Primer',
		format: 'Modern',
		owner: 'Ari',
		status: 'Ready',
		href: 'https://example.com/artifact-primer',
	},
] as const;

const checklist = [
	'Validate imported card metadata against the latest set release.',
	'Publish refreshed deck thumbnails and alt text for media assets.',
	'Confirm export links before cutting a release candidate.',
] as const;

const paletteSwatches = ['#7c3aed', '#ec4899', '#14b8a6', '#f59e0b', '#3b82f6'] as const;

const slideImages = [
	'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
] as const;

const tickerItems = [
	'Commander',
	'Draft League',
	'Cube Updates',
	'Collection Sync',
	'Deck Export',
	'Price Snapshot',
] as const;

const activityRows = Array.from({ length: 10 }, (_, index) => ({
	id: index + 1,
	title: `Sync batch ${index + 1}`,
	description: `Queued ${12 + index * 3} card images for validation and CDN refresh.`,
	status: index % 2 === 0 ? 'Running' : 'Waiting',
}));

const frameworkOptions = [
	{ label: 'Preact', value: 'preact' },
	{ label: 'React', value: 'react' },
	{ label: 'Solid', value: 'solid' },
	{ label: 'Vue', value: 'vue' },
	{ label: 'Svelte', value: 'svelte' },
	{ label: 'Lit', value: 'lit' },
] as const;

const mediaCollection = createListCollection({
	items: [
		{ label: 'Card Art', value: 'art', category: 'Media' },
		{ label: 'Deck Covers', value: 'covers', category: 'Media' },
		{ label: 'Rule Notes', value: 'rules', category: 'Docs' },
		{ label: 'Release Changelog', value: 'changelog', category: 'Docs' },
		{ label: 'Cube Exports', value: 'exports', category: 'Generated' },
	],
	groupBy: (item) => item.category,
});

type DemoNode = {
	id: string;
	name: string;
	children?: DemoNode[];
};

const treeCollection = createTreeCollection<DemoNode>({
	nodeToValue: (node) => node.id,
	nodeToString: (node) => node.name,
	rootNode: {
		id: 'ROOT',
		name: '',
		children: [
			{
				id: 'collections',
				name: 'Collections',
				children: [
					{ id: 'collections/cube-notes.md', name: 'Cube Notes.md' },
					{
						id: 'collections/legends',
						name: 'Legends',
						children: [
							{ id: 'collections/legends/creatures.json', name: 'Creatures.json' },
							{ id: 'collections/legends/spells.json', name: 'Spells.json' },
						],
					},
				],
			},
			{
				id: 'exports',
				name: 'Exports',
				children: [
					{ id: 'exports/commander.csv', name: 'Commander.csv' },
					{ id: 'exports/cube.json', name: 'Cube.json' },
				],
			},
			{ id: 'readme.md', name: 'README.md' },
		],
	},
});

type SectionCardProps = {
	title: string;
	description?: string;
	children: ComponentChildren;
};

function SectionCard(props: SectionCardProps) {
	const { title, description, children } = props;

	return (
		<Card.Root variant="outline" size="sm" h="full">
			<Card.Header>
				<Card.Title>{title}</Card.Title>
				{description ? <Card.Description>{description}</Card.Description> : null}
			</Card.Header>
			<Card.Body>{children}</Card.Body>
		</Card.Root>
	);
}

function ComboboxSearchDemo() {
	const { contains } = useFilter({ sensitivity: 'base' });
	const { collection, filter } = useListCollection({
		initialItems: frameworkOptions,
		filter: contains,
	});

	return (
		<Combobox.Root
			collection={collection}
			onInputValueChange={(details) => filter(details.inputValue)}
			openOnClick
			width="full"
		>
			<Combobox.Label>Select a frontend target</Combobox.Label>
			<Combobox.Control>
				<Combobox.Input placeholder="Type to filter frameworks" />
				<Combobox.IndicatorGroup>
					<Combobox.ClearTrigger />
					<Combobox.Trigger />
				</Combobox.IndicatorGroup>
			</Combobox.Control>
			<Portal>
				<Combobox.Positioner>
					<Combobox.Content>
						<Combobox.Empty>No matches found</Combobox.Empty>
						{collection.items.map((item) => (
							<Combobox.Item item={item} key={item.value}>
								{item.label}
								<Combobox.ItemIndicator />
							</Combobox.Item>
						))}
					</Combobox.Content>
				</Combobox.Positioner>
			</Portal>
		</Combobox.Root>
	);
}

function DataMediaDashboardShowcase() {
	return (
		<Stack gap="6" maxW="7xl">
			<Text textStyle="sm" color="fg.muted">
				Representative Chakra v3 data and media composition.
			</Text>

			<SimpleGrid columns={{ base: 1, xl: 2 }} gap="6">
				<Card.Root overflow="hidden" variant="elevated">
					<Image
						src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80"
						alt="Colorful tabletop play area"
						aspectRatio={16 / 9}
						objectFit="cover"
					/>
					<Card.Body gap="5">
						<HStack justify="space-between" align="start">
							<HStack gap="3" align="start">
								<Avatar.Root size="lg" shape="rounded">
									<Avatar.Fallback name={owner.name} />
									<Avatar.Image src={owner.src} />
								</Avatar.Root>
								<Stack gap="0">
									<Card.Title>Cube Night 2025</Card.Title>
									<Text textStyle="sm" color="fg.muted">
										Friday release story with curated card media.
									</Text>
								</Stack>
							</HStack>
							<Tag.Root colorPalette="green" variant="subtle">
								<Tag.Label>Live</Tag.Label>
							</Tag.Root>
						</HStack>

						<Text color="fg.muted">
							Use this as the broad dashboard story: avatar identity, media preview,
							status tags, links, summary data, lists, stats, tables, and a timeline.
						</Text>

						<HStack gap="2" flexWrap="wrap">
							{['Commander', 'Artifacts', 'Featured'].map((label) => (
								<Tag.Root key={label} variant="surface" colorPalette="purple">
									<Tag.Label>{label}</Tag.Label>
								</Tag.Root>
							))}
						</HStack>

						<DataList.Root size="sm" variant="subtle">
							<DataList.Item>
								<DataList.ItemLabel>Owner</DataList.ItemLabel>
								<DataList.ItemValue>{owner.name}</DataList.ItemValue>
							</DataList.Item>
							<DataList.Item>
								<DataList.ItemLabel>Updated</DataList.ItemLabel>
								<DataList.ItemValue>2 hours ago</DataList.ItemValue>
							</DataList.Item>
							<DataList.Item>
								<DataList.ItemLabel>Assets</DataList.ItemLabel>
								<DataList.ItemValue>36 image files</DataList.ItemValue>
							</DataList.Item>
						</DataList.Root>

						<Link
							href="https://chakra-ui.com/docs/components"
							variant="underline"
							colorPalette="teal"
							target="_blank"
							rel="noopener noreferrer"
						>
							Open Chakra component docs
						</Link>
					</Card.Body>
				</Card.Root>

				<Stack gap="6">
					<SectionCard
						title="Quick metrics"
						description="Compact stat cards using only built-in Chakra parts."
					>
						<SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
							<Stat.Root borderWidth="1px" rounded="md" p="4">
								<Stat.Label>Deck views</Stat.Label>
								<Stat.ValueText>18.4k</Stat.ValueText>
								<Stat.HelpText>
									<Stat.UpIndicator />
									12% this week
								</Stat.HelpText>
							</Stat.Root>
							<Stat.Root borderWidth="1px" rounded="md" p="4">
								<Stat.Label>Image sync</Stat.Label>
								<Stat.ValueText>94%</Stat.ValueText>
								<Stat.HelpText>
									<Stat.UpIndicator />
									3% since yesterday
								</Stat.HelpText>
							</Stat.Root>
							<Stat.Root borderWidth="1px" rounded="md" p="4">
								<Stat.Label>Warnings</Stat.Label>
								<Stat.ValueText>7</Stat.ValueText>
								<Stat.HelpText>
									<Stat.DownIndicator />
									Needs review
								</Stat.HelpText>
							</Stat.Root>
						</SimpleGrid>
					</SectionCard>

					<SectionCard
						title="Launch checklist"
						description="Simple list composition that stays readable in one file."
					>
						<List.Root as="ul" gap="2" ps="5" listStyle="disc">
							{checklist.map((item) => (
								<List.Item key={item}>{item}</List.Item>
							))}
						</List.Root>
					</SectionCard>
				</Stack>
			</SimpleGrid>

			<SectionCard
				title="Top stories table"
				description="Shows Chakra v3 table slots plus horizontal overflow handling."
			>
				<Table.ScrollArea borderWidth="1px" rounded="md">
					<Table.Root size="sm" variant="outline">
						<Table.Header>
							<Table.Row>
								<Table.ColumnHeader minW="220px">Story</Table.ColumnHeader>
								<Table.ColumnHeader minW="140px">Format</Table.ColumnHeader>
								<Table.ColumnHeader minW="120px">Owner</Table.ColumnHeader>
								<Table.ColumnHeader minW="120px">Status</Table.ColumnHeader>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{releaseRows.map((row) => (
								<Table.Row key={row.name}>
									<Table.Cell>
										<Link
											href={row.href}
											variant="underline"
											colorPalette="teal"
											target="_blank"
											rel="noopener noreferrer"
										>
											{row.name}
										</Link>
									</Table.Cell>
									<Table.Cell>{row.format}</Table.Cell>
									<Table.Cell>{row.owner}</Table.Cell>
									<Table.Cell>
										<Tag.Root
											colorPalette={
												row.status === 'Ready'
													? 'green'
													: row.status === 'Review'
														? 'orange'
														: 'gray'
											}
											variant="subtle"
										>
											<Tag.Label>{row.status}</Tag.Label>
										</Tag.Root>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table.Root>
				</Table.ScrollArea>
			</SectionCard>

			<SectionCard
				title="Publishing timeline"
				description="A narrow but representative timeline example without extra icon packages."
			>
				<Timeline.Root size="sm" variant="outline" maxW="2xl">
					{[
						['1', 'Metadata imported', 'Collection JSON refreshed from source data.'],
						['2', 'Images optimized', 'Card art thumbnails and hero media regenerated.'],
						['3', 'Storybook review', 'Interactive stories checked in light and dark themes.'],
					].map(([step, title, description]) => (
						<Timeline.Item key={step}>
							<Timeline.Connector>
								<Timeline.Separator />
								<Timeline.Indicator>{step}</Timeline.Indicator>
							</Timeline.Connector>
							<Timeline.Content>
								<Timeline.Title>{title}</Timeline.Title>
								<Timeline.Description>{description}</Timeline.Description>
							</Timeline.Content>
						</Timeline.Item>
					))}
				</Timeline.Root>
			</SectionCard>
		</Stack>
	);
}

function SelectionInputsShowcase() {
	return (
		<SimpleGrid columns={{ base: 1, xl: 3 }} gap="6" maxW="7xl">
			<SectionCard title="Color controls" description="Inline color picker plus reusable swatches.">
				<Stack gap="4">
					<ColorPicker.Root open defaultValue={parseColor('#7c3aed')}>
						<ColorPicker.HiddenInput />
						<ColorPicker.Content animation="none" shadow="none" p="3" borderWidth="1px" rounded="md">
							<ColorPicker.Area />
							<HStack align="start">
								<ColorPicker.Sliders flex="1" />
								<ColorPicker.ValueSwatch />
							</HStack>
						</ColorPicker.Content>
					</ColorPicker.Root>

					<HStack gap="2" flexWrap="wrap">
						{paletteSwatches.map((color) => (
							<Tag.Root key={color} variant="surface">
								<Tag.StartElement>
									<ColorSwatch value={color} />
								</Tag.StartElement>
								<Tag.Label>{color}</Tag.Label>
							</Tag.Root>
						))}
					</HStack>
				</Stack>
			</SectionCard>

			<SectionCard
				title="Search and choose"
				description="Combobox for filtering, listbox for grouped selection."
			>
				<Stack gap="5">
					<ComboboxSearchDemo />

					<Listbox.Root collection={mediaCollection} width="full">
						<Listbox.Label>Choose a content source</Listbox.Label>
						<Listbox.Content divideY="1px" maxH="14rem" overflow="auto">
							{mediaCollection.group().map(([category, items]) => (
								<Listbox.ItemGroup key={category}>
									<Listbox.ItemGroupLabel>{category}</Listbox.ItemGroupLabel>
									{items.map((item) => (
										<Listbox.Item item={item} key={item.value}>
											<Listbox.ItemText>{item.label}</Listbox.ItemText>
											<Listbox.ItemIndicator />
										</Listbox.Item>
									))}
								</Listbox.ItemGroup>
							))}
						</Listbox.Content>
					</Listbox.Root>
				</Stack>
			</SectionCard>

			<SectionCard
				title="File upload"
				description="Self-contained dropzone without helper wrappers or extra packages."
			>
				<FileUpload.Root maxFiles={3} accept="image/*" alignItems="stretch">
					<FileUpload.HiddenInput />
					<FileUpload.Dropzone>
						<FileUpload.DropzoneContent>
							<Text fontWeight="medium">Drop images here</Text>
							<Text color="fg.muted" textStyle="sm">
								PNG, JPG, or SVG up to three files.
							</Text>
						</FileUpload.DropzoneContent>
					</FileUpload.Dropzone>
					<HStack justify="space-between">
						<Text color="fg.muted" textStyle="sm">
							Useful for media-heavy Storybook smoke tests.
						</Text>
						<FileUpload.Trigger asChild>
							<Button size="sm" variant="outline">
								Browse files
							</Button>
						</FileUpload.Trigger>
					</HStack>
					<FileUpload.List showSize clearable />
				</FileUpload.Root>
			</SectionCard>
		</SimpleGrid>
	);
}

function LayoutAndMotionShowcase() {
	return (
		<Stack gap="4" maxW="7xl">
			<Text textStyle="sm" color="fg.muted">
				This grouping keeps spatial components together and avoids a single oversized
				kitchen sink story.
			</Text>

			<Splitter.Root
				panels={[{ id: 'queue' }, { id: 'preview' }]}
				borderWidth="1px"
				rounded="xl"
				minH="34rem"
			>
				<Splitter.Panel id="queue">
					<Box p="4">
						<Heading size="md" mb="1">
							Scrollable activity
						</Heading>
						<Text color="fg.muted" textStyle="sm" mb="4">
							Ideal for smoke testing scrollbars, density, and resize behavior.
						</Text>

						<ScrollArea.Root height="26rem" variant="always" borderWidth="1px" rounded="md">
							<ScrollArea.Viewport>
								<ScrollArea.Content>
									<Stack gap="3" p="3">
										{activityRows.map((item) => (
											<Card.Root key={item.id} variant="subtle" size="sm">
												<Card.Body gap="2">
													<HStack justify="space-between">
														<Text fontWeight="medium" textStyle="sm">
															{item.title}
														</Text>
														<Tag.Root
															variant="surface"
															colorPalette={item.status === 'Running' ? 'green' : 'gray'}
														>
															<Tag.Label>{item.status}</Tag.Label>
														</Tag.Root>
													</HStack>
													<Card.Description>{item.description}</Card.Description>
												</Card.Body>
											</Card.Root>
										))}
									</Stack>
								</ScrollArea.Content>
							</ScrollArea.Viewport>
							<ScrollArea.Scrollbar>
								<ScrollArea.Thumb />
							</ScrollArea.Scrollbar>
						</ScrollArea.Root>
					</Box>
				</Splitter.Panel>

				<Splitter.ResizeTrigger id="queue:preview" aria-label="Resize panels" />

				<Splitter.Panel id="preview">
					<Box p="4">
						<Stack gap="6">
							<Box>
								<Heading size="md" mb="1">
									Carousel preview
								</Heading>
								<Text color="fg.muted" textStyle="sm" mb="4">
									Use basic controls and indicators to keep the file dependency-free.
								</Text>

								<Carousel.Root slideCount={slideImages.length} maxW="xl">
									<Carousel.ItemGroup>
										{slideImages.map((src, index) => (
											<Carousel.Item key={src} index={index}>
												<Image
													src={src}
													alt={`Preview slide ${index + 1}`}
													aspectRatio={16 / 9}
													objectFit="cover"
													rounded="md"
												/>
											</Carousel.Item>
										))}
									</Carousel.ItemGroup>
									<Carousel.Control justifyContent="space-between" mt="3">
										<Carousel.PrevTrigger asChild>
											<Button size="sm" variant="outline">
												Previous
											</Button>
										</Carousel.PrevTrigger>
										<Carousel.Indicators />
										<Carousel.NextTrigger asChild>
											<Button size="sm" variant="outline">
												Next
											</Button>
										</Carousel.NextTrigger>
									</Carousel.Control>
								</Carousel.Root>
							</Box>

							<Box>
								<Heading size="sm" mb="3">
									Marquee topics
								</Heading>
								<Marquee.Root autoFill>
									<Marquee.Viewport borderWidth="1px" rounded="md" py="3">
										<Marquee.Content>
											{tickerItems.map((item) => (
												<Marquee.Item key={item} px="2">
													<Tag.Root variant="surface">
														<Tag.Label>{item}</Tag.Label>
													</Tag.Root>
												</Marquee.Item>
											))}
										</Marquee.Content>
									</Marquee.Viewport>
								</Marquee.Root>
							</Box>
						</Stack>
					</Box>
				</Splitter.Panel>
			</Splitter.Root>
		</Stack>
	);
}

function StructureAndShareShowcase() {
	return (
		<SimpleGrid columns={{ base: 1, lg: 2 }} gap="6" maxW="6xl">
			<SectionCard
				title="Tree view"
				description="Useful for hierarchical data without adding a custom icon package."
			>
				<TreeView.Root
					collection={treeCollection}
					defaultExpandedValue={['collections', 'collections/legends']}
					maxW="md"
				>
					<TreeView.Label>Card catalog</TreeView.Label>
					<TreeView.Tree>
						<TreeView.Node
							indentGuide={<TreeView.BranchIndentGuide />}
							render={({ node, nodeState }) =>
								nodeState.isBranch ? (
									<TreeView.BranchControl>
										<Box as="span" aria-hidden="true">
											📁
										</Box>
										<TreeView.BranchText>{node.name}</TreeView.BranchText>
									</TreeView.BranchControl>
								) : (
									<TreeView.Item>
										<Box as="span" aria-hidden="true">
											📄
										</Box>
										<TreeView.ItemText>{node.name}</TreeView.ItemText>
									</TreeView.Item>
								)
							}
						/>
					</TreeView.Tree>
				</TreeView.Root>
			</SectionCard>

			<SectionCard
				title="QR code"
				description="A compact share/export example with overlay and download trigger."
			>
				<Stack align="start" gap="4">
					<QrCode.Root value="https://example.com/mtgtools/storybook" size="xl">
						<QrCode.Frame>
							<QrCode.Pattern />
						</QrCode.Frame>
						<QrCode.Overlay>
							<Box
								boxSize="10"
								rounded="md"
								bg="bg"
								borderWidth="1px"
								display="grid"
								placeItems="center"
								fontWeight="bold"
								fontSize="xs"
							>
								MTG
							</Box>
						</QrCode.Overlay>
					</QrCode.Root>

					<HStack gap="3" flexWrap="wrap">
						<QrCode.DownloadTrigger asChild fileName="mtgtools-share.png" mimeType="image/png">
							<Button size="sm" variant="outline">
								Download PNG
							</Button>
						</QrCode.DownloadTrigger>
						<Link
							href="https://example.com/mtgtools/storybook"
							variant="underline"
							colorPalette="teal"
							target="_blank"
							rel="noopener noreferrer"
						>
							Open target URL
						</Link>
					</HStack>
				</Stack>
			</SectionCard>
		</SimpleGrid>
	);
}

const meta = {
	title: 'Chakra/Data Advanced',
	parameters: {
		layout: 'padded',
	},
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const DataMediaDashboard: Story = {
	render: () => <DataMediaDashboardShowcase />,
};

export const SelectionInputs: Story = {
	render: () => <SelectionInputsShowcase />,
};

export const LayoutAndMotion: Story = {
	render: () => <LayoutAndMotionShowcase />,
};

export const StructureAndShare: Story = {
	render: () => <StructureAndShareShowcase />,
};
