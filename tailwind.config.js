/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      maxWidth: {
        fullPage: '100vw', // Largeur complète de la fenêtre
      },
      spacing: {
        fullPadding: '0', // Pas de marge ou de padding
      },
    },
  },
  plugins: [],
}

