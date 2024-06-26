import { defineConfig } from 'vite'
import { loadEnv } from "vite";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT, 10),
    }
  }
})
