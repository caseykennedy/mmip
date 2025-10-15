import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        DEFAULT: '100%',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      borderColor: {
        DEFAULT: 'var(--color-border)',
      },
      boxShadow: {
        layer: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        white: 'var(--color-white)',
        black: 'var(--color-black)',

        // Foundation
        background: {
          DEFAULT: 'var(--color-bg)',
          subtle: 'var(--color-bg-subtle)',
          overlay: 'var(--color-bg-overlay)',
        },
        foreground: {
          DEFAULT: 'var(--color-fg)',
          subtle: 'var(--color-fg-subtle)',
          accent: 'var(--color-fg-accent)',
          muted: 'var(--color-fg-muted)',
        },
        // Surfaces
        surface: {
          DEFAULT: 'var(--color-surface)',
          hover: 'var(--color-surface-hover)',
          fg: 'var(--color-surface-fg)',
        },
        // Surface colors
        green: {
          DEFAULT: 'var(--color-green-500)',
          hover: 'var(--color-green-600)',
        },
        // Feedback
        success: {
          DEFAULT: 'var(--color-success)',
          hover: 'var(--color-success-hover)',
          fg: 'var(--color-success-fg)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          hover: 'var(--color-warning-hover)',
          fg: 'var(--color-warning-fg)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          hover: 'var(--color-error-hover)',
          fg: 'var(--color-error-fg)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          hover: 'var(--color-info-hover)',
          fg: 'var(--color-info-fg)',
        },
        // Interactive
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          fg: 'var(--color-primary-fg)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          hover: 'var(--color-secondary-hover)',
          fg: 'var(--color-secondary-fg)',
        },
        disabled: {
          DEFAULT: 'var(--color-disabled)',
          fg: 'var(--color-disabled-fg)',
        },
        // Borders
        border: {
          DEFAULT: 'var(--color-border)',
        },
        // Icons
        icon: {
          DEFAULT: 'var(--color-icon)',
        },
        // Focus Rings
        ring: {
          focus: 'var(--color-ring-focus)',
        },
        // Primary color palette
        sand: {
          DEFAULT: 'var(--color-sand-500)',
          50: 'var(--color-sand-50)',
          100: 'var(--color-sand-100)',
          200: 'var(--color-sand-200)',
          300: 'var(--color-sand-300)',
          400: 'var(--color-sand-400)',
          500: 'var(--color-sand-500)',
          600: 'var(--color-sand-600)',
          700: 'var(--color-sand-700)',
          800: 'var(--color-sand-800)',
          900: 'var(--color-sand-900)',
        },
        zinc: {
          DEFAULT: 'var(--color-zinc-500)',
          50: 'var(--color-zinc-50)',
          100: 'var(--color-zinc-100)',
          200: 'var(--color-zinc-200)',
          300: 'var(--color-zinc-300)',
          400: 'var(--color-zinc-400)',
          500: 'var(--color-zinc-500)',
          600: 'var(--color-zinc-600)',
          700: 'var(--color-zinc-700)',
          800: 'var(--color-zinc-800)',
          900: 'var(--color-zinc-900)',
        },
        terracota: {
          DEFAULT: 'var(--color-terracota-500)',
          50: 'var(--color-terracota-50)',
          100: 'var(--color-terracota-100)',
          200: 'var(--color-terracota-200)',
          300: 'var(--color-terracota-300)',
          400: 'var(--color-terracota-400)',
          500: 'var(--color-terracota-500)',
          600: 'var(--color-terracota-600)',
          700: 'var(--color-terracota-700)',
          800: 'var(--color-terracota-800)',
          900: 'var(--color-terracota-900)',
        },
        gold: {
          DEFAULT: 'var(--color-gold-500)',
          50: 'var(--color-gold-50)',
          100: 'var(--color-gold-100)',
          200: 'var(--color-gold-200)',
          300: 'var(--color-gold-300)',
          400: 'var(--color-gold-400)',
          500: 'var(--color-gold-500)',
          600: 'var(--color-gold-600)',
          700: 'var(--color-gold-700)',
          800: 'var(--color-gold-800)',
          900: 'var(--color-gold-900)',
        },
        sage: {
          DEFAULT: 'var(--color-sage-500)',
          50: 'var(--color-sage-50)',
          100: 'var(--color-sage-100)',
          200: 'var(--color-sage-200)',
          300: 'var(--color-sage-300)',
          400: 'var(--color-sage-400)',
          500: 'var(--color-sage-500)',
          600: 'var(--color-sage-600)',
          700: 'var(--color-sage-700)',
          800: 'var(--color-sage-800)',
          900: 'var(--color-sage-900)',
        },
        twilight: {
          DEFAULT: 'var(--color-twilight-500)',
          50: 'var(--color-twilight-50)',
          100: 'var(--color-twilight-100)',
          200: 'var(--color-twilight-200)',
          300: 'var(--color-twilight-300)',
          400: 'var(--color-twilight-400)',
          500: 'var(--color-twilight-500)',
          600: 'var(--color-twilight-600)',
          700: 'var(--color-twilight-700)',
          800: 'var(--color-twilight-800)',
          900: 'var(--color-twilight-900)',
        },
      },
      fontFamily: {
        sans: ['var(--font-helvetica-now)', 'sans-serif'],
        body: ['var(--font-helvetica-now)', 'sans-serif'],
        heading: ['var(--font-real-head)', 'sans-serif'],
      },
      spacing: {
        reading: '680px',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config
