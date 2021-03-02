/**
 * define plugins
 */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './Components/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms')
  ]
}
