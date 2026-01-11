import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#11151c',
          light: '#212d40',
          lighter: '#364156',
        },
        beige: {
          light: '#f5d0c5',
          DEFAULT: '#d69f7e',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
        },
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, #11151c 0%, #212d40 50%, #364156 100%)',
        'beige-gradient': 'linear-gradient(135deg, #f5d0c5 0%, #d69f7e 100%)',
      },
    },
  },
  plugins: [],
}
export default config
