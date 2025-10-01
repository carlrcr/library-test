/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Configuración importante para librerías
  corePlugins: {
    preflight: false, // Desactiva los estilos base para no interferir con el proyecto consumidor
  },
  // IMPORTANTE: Desactiva optimizaciones agresivas durante el build
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  // Evita que purge sea demasiado agresivo
  safelist: []
}