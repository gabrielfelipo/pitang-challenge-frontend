/* eslint-disable @typescript-eslint/no-var-requires */
const { nextui } = require('@nextui-org/react')
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui({
    defaultTheme: 'light',
    defaultExtendTheme: 'light',
    layout: {
      fontSize: {
        tiny: '0.875rem',
        small: '1rem',
        medium: '1.125rem',
        large: '1.25rem',
        DEFAULT: '1.125rem',
      },
    },
    themes: {
      light: {
        layout: {}, // light theme layout tokens
        colors: {
          background: '#120118',
          foreground: '#FFFFFF',
          default: {
            foreground: '#FFFFFF',
            400: '#FFFFFF',
            600: '#FFFFFF',
            DEFAULT: '#543861',
          },
          primary: {
            100: '#EAD2F6',
            200: '#774D8B',
            300: '#543861',
            400: '#451953',
            500: '#300E3B',
            600: '#331F3D',
            700: '#1D0227',
            800: '#120118',
            900: '#120118',
            foreground: '#FFFFFF',
            DEFAULT: '#300E3B',
          },
          secondary: {
            /*  100: '#FDECDA',
            200: '#FCD4B7',
           */ 300: '#F8876C' /* 
            400: '#EE9474', */,
            500: '#E36648',
            /*    600: '#C34534',
            700: '#A32924',
            800: '#83161A',
            900: '#6C0D17', */
            foreground: '#FFFFFF',
            DEFAULT: '#E36648',
          },
          focus: '#FFFFFF',
          danger: '#F31260',
          success: '#17C964',
          dark: '#18181B',
          tooltip: '#0070F0',
        },
      },
      dark: {
        layout: {}, // dark theme layout tokens
        colors: {}, // dark theme colors
      },
    },
  }),],
}

