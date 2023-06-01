/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       backgroundImage: {
        'login-pattern': "url('/src/assets/images/login-pattern-bg.jpg')",
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
