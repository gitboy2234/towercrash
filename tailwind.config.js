/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
       animation: {
        'bounce': 'bounce 10s infinite',
        
        'spin': 'spin 60s linear infinite',
      }
    },
  },
  plugins: [],
}
