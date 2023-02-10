/* @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'background': "url('/src/images/bg.png')",
        'background2': "url('/src/images/2.png')",
       }),
      width: {
        '100': '30rem',
        '104': '34rem',
        '108': '36rem',
        '112': '38rem',
        '116': '40rem',
        '118': '42rem',
        '120': '44rem',
        '124': '46rem',
        '128': '48rem',
        '132': '50rem',
        '136': '52rem',
        '140': '54rem',
        '144': '56rem',
        '148': '58rem',
        '152': '60rem',
      },
      height: {
        '100': '32rem',
        '104': '34rem',
        '108': '36rem',
        '112': '38rem',
        '116': '40rem',
        '118': '42rem',
        '120': '44rem',
        '124': '46rem',
        '128': '48rem',
        '132': '50rem',
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        xxl: '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      }
    },
  },
  plugins: [],
}
