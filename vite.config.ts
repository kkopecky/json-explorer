import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), eslint()],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			'~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
		},
	},
});
