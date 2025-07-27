import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      boxShadow: {
        layer: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        colors: {
          white: 'var(--color-white)',
          black: 'var(--color-black)',

          // Foundation
          bg: 'var(--color-bg)',
          'bg-subtle': 'var(--color-bg-subtle)',
          'bg-overlay': 'var(--color-bg-overlay)',

          fg: 'var(--color-fg)',
          'fg-subtle': 'var(--color-fg-subtle)',
          'fg-accent': 'var(--color-fg-accent)',
          'fg-muted': 'var(--color-fg-muted)',

          // Surfaces
          surface: 'var(--color-surface)',
          'surface-hover': 'var(--color-surface-hover)',
          'surface-fg': 'var(--color-surface-fg)',
          'surface-elevated': 'var(--color-surface-elevated)',
          'surface-elevated-hover': 'var(--color-surface-elevated-hover)',
          'surface-elevated-fg': 'var(--color-surface-elevated-fg)',

          // Surface colors
          green: {
            DEFAULT: 'var(--color-green-500)',
            hover: 'var(--color-green-600)',
            active: 'var(--color-green-700)',
          },
          peach: {
            DEFAULT: 'var(--color-peach-500)',
            hover: 'var(--color-peach-600)',
            active: 'var(--color-peach-700)',
          },
          orange: {
            DEFAULT: 'var(--color-orange-500)',
            hover: 'var(--color-orange-600)',
            active: 'var(--color-orange-700)',
          },
          blue: {
            DEFAULT: 'var(--color-blue-500)',
            hover: 'var(--color-blue-600)',
            active: 'var(--color-blue-700)',
          },
          purple: {
            DEFAULT: 'var(--color-purple-500)',
            hover: 'var(--color-purple-600)',
            active: 'var(--color-purple-700)',
          },

          // Feedback
          success: {
            DEFAULT: 'var(--color-success)',
            hover: 'var(--color-success-hover)',
            active: 'var(--color-success-active)',
            fg: 'var(--color-success-fg)',
          },
          warning: {
            DEFAULT: 'var(--color-warning)',
            hover: 'var(--color-warning-hover)',
            active: 'var(--color-warning-active)',
            fg: 'var(--color-warning-fg)',
          },
          error: {
            DEFAULT: 'var(--color-error)',
            hover: 'var(--color-error-hover)',
            active: 'var(--color-error-active)',
            fg: 'var(--color-error-fg)',
          },
          info: {
            DEFAULT: 'var(--color-info)',
            hover: 'var(--color-info-hover)',
            active: 'var(--color-info-active)',
            fg: 'var(--color-info-fg)',
          },

          // Buttons
          primary: {
            DEFAULT: 'var(--color-primary)',
            hover: 'var(--color-primary-hover)',
            active: 'var(--color-primary-active)',
            fg: 'var(--color-primary-fg)',
          },
          secondary: {
            DEFAULT: 'var(--color-secondary)',
            hover: 'var(--color-secondary-hover)',
            active: 'var(--color-secondary-active)',
            fg: 'var(--color-secondary-fg)',
          },
          disabled: {
            DEFAULT: 'var(--color-disabled)',
            fg: 'var(--color-disabled-fg)',
          },

          // Borders
          border: {
            DEFAULT: 'var(--color-border)',
            muted: 'var(--color-border-muted)',
            active: 'var(--color-border-active)',
          },
          divider: 'var(--color-divider)',

          // Icons
          icon: {
            DEFAULT: 'var(--color-icon)',
            accent: 'var(--color-icon-accent)',
            inverse: 'var(--color-icon-inverse)',
          },

          // Focus Rings
          ring: {
            focus: 'var(--color-ring-focus)',
            error: 'var(--color-ring-error)',
          },
        },
        cyan: {
          50: '#e7fefe',
          100: '#c5fcfc',
          200: '#96f8f8',
          300: '#62efef',
          400: '#18e2e2',
          500: '#04b8be',
          600: '#037782',
          700: '#024950',
          800: '#042f34',
          900: '#072227',
          950: '#0d181c',
        },
        gray: {
          50: '#f6f6f8',
          100: '#eeeef1',
          200: '#e3e4e8',
          300: '#bbbdc9',
          400: '#9499ad',
          500: '#727892',
          600: '#515870',
          700: '#383d51',
          800: '#252837',
          900: '#1b1d27',
          950: '#13141b',
        },
        red: {
          50: '#fff6f5',
          100: '#ffe7e5',
          200: '#ffdedc',
          300: '#fdada5',
          400: '#f77769',
          500: '#ef4434',
          600: '#cc2819',
          700: '#8b2018',
          800: '#4d1714',
          900: '#321615',
          950: '#1e1011',
        },
        orange: {
          50: '#fcf1e8',
          100: '#f9e3d2',
          200: '#f4c7a6',
          300: '#efab7a',
          400: '#ea8f4e',
          500: '#e57322',
          600: '#ba5f1e',
          700: '#8f4b1b',
          800: '#653818',
          900: '#3a2415',
          950: '#251a13',
        },
        yellow: {
          50: '#fefae1',
          100: '#fcf3bb',
          200: '#f9e994',
          300: '#f7d455',
          400: '#f9bc15',
          500: '#d28a04',
          600: '#965908',
          700: '#653a0b',
          800: '#3b220c',
          900: '#271a11',
          950: '#181410',
        },
        green: {
          50: '#e7f9ed',
          100: '#d0f4dc',
          200: '#a1eaba',
          300: '#72e097',
          400: '#43d675',
          500: '#3ab564',
          600: '#329454',
          700: '#297343',
          800: '#215233',
          900: '#183122',
          950: '#14211a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config
