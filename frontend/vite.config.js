import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


// Retrieve the backend URL from the environment variable or use a default
const backendUrl = process.env.VITE_BACKEND_URL||'https://job-portal-backend-azure.vercel.app'

// Console log the backend URL to verify it's being read correctly
console.log(backendUrl,'ua')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: backendUrl, // Using the variable here
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
