import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        content: ["./index.html", "./src/**/*.{js,jsx}"], 
        theme: {
          extend: {
            fontFamily: {
              orbitron: ['Orbitron', 'sans-serif'],
            },
            colors: {
              'neon-green': '#39FF14',
              'neon-pink': '#FF6EC7',
              'neon-blue': '#00FFFF',
              'neon-yellow': '#FFFF33',
              'neon-cyan': '#0ff',
            },
            animation: {
              glitch: 'glitch 1s infinite',
            },
            keyframes: {
              glitch: {
                '0%, 100%': { transform: 'translate(0)' },
                '20%': { transform: 'translate(-2px, 2px)' },
                '40%': { transform: 'translate(-2px, -2px)' },
                '60%': { transform: 'translate(2px, 2px)' },
                '80%': { transform: 'translate(2px, -2px)' },
              }
            }
          }
        },
        plugins: [],
      }
    })
  ],
})

