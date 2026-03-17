import type { Preview } from '@storybook/preact-vite';
import {withThemeByClassName} from "@storybook/addon-themes";
import {ChakraProvider, defaultSystem} from "@chakra-ui/react";

const preview: Preview = {
	parameters: {
		layout: 'centered',
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => (
			<ChakraProvider value={defaultSystem}>
				<Story />
			</ChakraProvider>
		),
		withThemeByClassName({
			themes: {
				light: '',
				dark: 'dark',
			},
			defaultTheme: 'light',
		}),
	]
};

export default preview;
