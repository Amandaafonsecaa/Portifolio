/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // O amarelo vibrante da sua imagem
        brandYellow: {
          400: '#FFD645',
          500: '#FFC800', 
          600: '#E6B400',
        },
      },
      fontFamily: {
        // Fontes que escolhemos baseadas na sua imagem de referência
        title: ['"DM Serif Display"', 'serif'], // Para o "i am" elegante
        impact: ['Syne', 'sans-serif'],        // Para o "DEVELOPER" robusto
        body: ['Inter', 'sans-serif'],         // Para textos de leitura
      },
    },
  },
  plugins: [],
}