module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth:{
        '0': '0',
         '1/4': '25%',
         '1/2': '50%',
         '3/4': '75%',
         'full': '100%',
      },
      maxWidth:{
        '0': '0',
         '1/4': '25%',
         '1/2': '50%',
         '3/4': '75%',
         'full': '100%',
      },
      backgroundImage: theme => ({
        'wood': "url('board3.jpg')",
       })
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
