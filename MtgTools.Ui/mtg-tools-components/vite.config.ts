/// <reference types="vitest/config" />
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import preact from '@preact/preset-vite';
import dts from 'vite-plugin-dts';
import { playwright } from '@vitest/browser-playwright';
import { peerDependencies } from './package.json';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const peerPackages = Object.keys(peerDependencies ?? {});

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	plugins: [
		preact(),
		dts({
			entryRoot: 'src',
			include: ['src'],
			outDir: 'dist',
			insertTypesEntry: true,
			exclude: ['**/*.stories.ts', '**/*.stories.tsx', '**/*.test.ts', '**/*.test.tsx'],
		}),
	],
	build: {
		emptyOutDir: true,
		lib: {
			entry: path.resolve(dirname, 'src/index.ts'),
			name: 'mtg-tools-components',
			fileName: 'index',
			formats: ['es'],
		},
		rollupOptions: {
			external: (id) => peerPackages.some((dependency) => id === dependency || id.startsWith(`${dependency}/`)),
		},
	},
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					storybookTest({
						configDir: path.join(dirname, '.storybook'),
					}),
				],
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [{
							browser: 'chromium',
						}],
					},
					setupFiles: ['.storybook/vitest.setup.ts'],
				},
			},
		],
	},
});
