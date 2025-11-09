import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  // ❌ REMOVER ESTO - es inseguro y causa el warning
  // define: {
  //   'process.env': process.env
  // }
  
  // ✅ En su lugar, define solo las variables que necesitas:
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
    'import.meta.env.VITE_APP_NAME': JSON.stringify(process.env.VITE_APP_NAME),
    'import.meta.env.VITE_NODE_ENV': JSON.stringify(process.env.VITE_NODE_ENV),
    'import.meta.env.VITE_IMGBB_API_KEY': JSON.stringify(process.env.VITE_IMGBB_API_KEY),
    'import.meta.env.VITE_API_TIMEOUT': JSON.stringify(process.env.VITE_API_TIMEOUT),
  },
  
  // Configuración adicional para resolver módulos
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
})