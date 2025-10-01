export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Opcional: Optimiza el CSS en producción
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }]
      }
    } : {})
  },
}