import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
      // screens: {
      //   DEFAULT: '100%',
      //   sm: '640px',
      //   md: '768px',
      //   lg: '1024px',
      //   xl: '1280px',
      //   '2xl': '1440px',
      // },
    },
    extend: {
      screens: {
        site: '1440px',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
        strong: 'var(--border-strong)',
        input: 'var(--border-input)',
      },
      boxShadow: {
        layer: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        white: 'var(--color-white)',
        black: 'var(--color-black)',

        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',

        // Foundation
        background: {
          DEFAULT: 'var(--background)',
          subtle: 'var(--background-subtle)',
          emphasis: 'var(--background-emphasis)',
          overlay: 'var(--background-overlay)',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          heading: 'var(--foreground-heading)',
          subtle: 'var(--foreground-subtle)',
          accent: 'var(--foreground-accent)',
          muted: 'var(--foreground-muted)',
        },
        // Surfaces
        surface: {
          DEFAULT: 'var(--surface)',
          hover: 'var(--surface-hover)',
          foreground: 'var(--surface-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          hover: 'var(--card-hover)',
          foreground: 'var(--card-foreground)',
        },
        // Popovers
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        // Interactive
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          hover: 'var(--secondary-hover)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        // Feedback
        success: {
          DEFAULT: 'var(--success)',
          hover: 'var(--success-hover)',
          foreground: 'var(--success-foreground)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          hover: 'var(--warning-hover)',
          foreground: 'var(--warning-foreground)',
        },
        error: {
          DEFAULT: 'var(--error)',
          hover: 'var(--error-hover)',
          foreground: 'var(--error-foreground)',
        },
        info: {
          DEFAULT: 'var(--info)',
          hover: 'var(--info-hover)',
          foreground: 'var(--info-foreground)',
        },
        // Borders
        border: {
          DEFAULT: 'var(--border)',
        },
        // Icons
        icon: {
          DEFAULT: 'var(--icon)',
        },
        // Focus Rings
        ring: {
          DEFAULT: 'var(--border)',
          focus: 'var(--ring-focus)',
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
        stone: {
          DEFAULT: 'var(--color-stone-500)',
          50: 'var(--color-stone-50)',
          100: 'var(--color-stone-100)',
          200: 'var(--color-stone-200)',
          300: 'var(--color-stone-300)',
          400: 'var(--color-stone-400)',
          500: 'var(--color-stone-500)',
          600: 'var(--color-stone-600)',
          700: 'var(--color-stone-700)',
          800: 'var(--color-stone-800)',
          900: 'var(--color-stone-900)',
          950: 'var(--color-stone-950)',
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
      lineHeight: {
        heading: '1.125',
        body: '1.414',
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
