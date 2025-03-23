// postcss.config.mjs
export default {
  plugins: [
    '@tailwindcss/postcss7-compat', // Usar o pacote de compatibilidade do Tailwind
    'autoprefixer', // Usar o Autoprefixer para adicionar prefixos CSS automaticamente
  ],
};
