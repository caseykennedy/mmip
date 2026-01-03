import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import containerQueries from '@tailwindcss/container-queries'

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
        DEFAULT: 'oklch(var(--border))',
        strong: 'oklch(var(--border-strong))',
        input: 'oklch(var(--border-input))',
      },
      boxShadow: {
        layer: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        white: 'oklch(var(--color-white))',
        black: 'oklch(var(--color-black))',

        destructive: 'oklch(var(--destructive))',
        'destructive-foreground': 'oklch(var(--destructive-foreground))',

        // Foundation
        background: {
          DEFAULT: 'oklch(var(--background))',
          subtle: 'oklch(var(--background-subtle))',
          emphasis: 'oklch(var(--background-emphasis))',
          overlay: 'oklch(var(--background-overlay))',
        },
        foreground: {
          DEFAULT: 'oklch(var(--foreground))',
          heading: 'oklch(var(--foreground-heading))',
          subtle: 'oklch(var(--foreground-subtle))',
          accent: 'oklch(var(--foreground-accent))',
          muted: 'oklch(var(--foreground-muted))',
        },
        // Surfaces
        surface: {
          DEFAULT: 'oklch(var(--surface))',
          hover: 'oklch(var(--surface-hover))',
          foreground: 'oklch(var(--surface-foreground))',
        },
        card: {
          DEFAULT: 'oklch(var(--card))',
          hover: 'oklch(var(--card-hover))',
          foreground: 'oklch(var(--card-foreground))',
        },
        // Popovers
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))',
        },
        // Interactive
        primary: {
          DEFAULT: 'oklch(var(--primary))',
          hover: 'oklch(var(--primary-hover))',
          foreground: 'oklch(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary))',
          hover: 'oklch(var(--secondary-hover))',
          foreground: 'oklch(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent))',
          hover: 'oklch(var(--accent-hover))',
          foreground: 'oklch(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted))',
          foreground: 'oklch(var(--muted-foreground))',
        },
        // Feedback
        success: {
          DEFAULT: 'oklch(var(--success))',
          hover: 'oklch(var(--success-hover))',
          foreground: 'oklch(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'oklch(var(--warning))',
          hover: 'oklch(var(--warning-hover))',
          foreground: 'oklch(var(--warning-foreground))',
        },
        error: {
          DEFAULT: 'oklch(var(--error))',
          hover: 'oklch(var(--error-hover))',
          foreground: 'oklch(var(--error-foreground))',
        },
        info: {
          DEFAULT: 'oklch(var(--info))',
          hover: 'oklch(var(--info-hover))',
          foreground: 'oklch(var(--info-foreground))',
        },
        // Borders
        border: {
          DEFAULT: 'oklch(var(--border))',
        },
        // Icons
        icon: {
          DEFAULT: 'oklch(var(--icon))',
        },
        // Focus Rings
        ring: {
          DEFAULT: 'oklch(var(--border))',
          focus: 'oklch(var(--ring-focus))',
        },
        // Primary color palette
        sand: {
          DEFAULT: 'oklch(var(--color-sand-500) / <alpha-value>)',
          50: 'oklch(var(--color-sand-50) / <alpha-value>)',
          100: 'oklch(var(--color-sand-100) / <alpha-value>)',
          200: 'oklch(var(--color-sand-200) / <alpha-value>)',
          300: 'oklch(var(--color-sand-300) / <alpha-value>)',
          400: 'oklch(var(--color-sand-400) / <alpha-value>)',
          500: 'oklch(var(--color-sand-500) / <alpha-value>)',
          600: 'oklch(var(--color-sand-600) / <alpha-value>)',
          700: 'oklch(var(--color-sand-700) / <alpha-value>)',
          800: 'oklch(var(--color-sand-800) / <alpha-value>)',
          900: 'oklch(var(--color-sand-900) / <alpha-value>)',
        },
        stone: {
          DEFAULT: 'oklch(var(--color-stone-500) / <alpha-value>)',
          50: 'oklch(var(--color-stone-50) / <alpha-value>)',
          100: 'oklch(var(--color-stone-100) / <alpha-value>)',
          200: 'oklch(var(--color-stone-200) / <alpha-value>)',
          300: 'oklch(var(--color-stone-300) / <alpha-value>)',
          400: 'oklch(var(--color-stone-400) / <alpha-value>)',
          500: 'oklch(var(--color-stone-500) / <alpha-value>)',
          600: 'oklch(var(--color-stone-600) / <alpha-value>)',
          700: 'oklch(var(--color-stone-700) / <alpha-value>)',
          800: 'oklch(var(--color-stone-800) / <alpha-value>)',
          900: 'oklch(var(--color-stone-900) / <alpha-value>)',
          950: 'oklch(var(--color-stone-950) / <alpha-value>)',
        },
        zinc: {
          DEFAULT: 'oklch(var(--color-zinc-500) / <alpha-value>)',
          50: 'oklch(var(--color-zinc-50) / <alpha-value>)',
          100: 'oklch(var(--color-zinc-100) / <alpha-value>)',
          200: 'oklch(var(--color-zinc-200) / <alpha-value>)',
          300: 'oklch(var(--color-zinc-300) / <alpha-value>)',
          400: 'oklch(var(--color-zinc-400) / <alpha-value>)',
          500: 'oklch(var(--color-zinc-500) / <alpha-value>)',
          600: 'oklch(var(--color-zinc-600) / <alpha-value>)',
          700: 'oklch(var(--color-zinc-700) / <alpha-value>)',
          800: 'oklch(var(--color-zinc-800) / <alpha-value>)',
          900: 'oklch(var(--color-zinc-900) / <alpha-value>)',
        },
        terracota: {
          DEFAULT: 'oklch(var(--color-terracota-500) / <alpha-value>)',
          50: 'oklch(var(--color-terracota-50) / <alpha-value>)',
          100: 'oklch(var(--color-terracota-100) / <alpha-value>)',
          200: 'oklch(var(--color-terracota-200) / <alpha-value>)',
          300: 'oklch(var(--color-terracota-300) / <alpha-value>)',
          400: 'oklch(var(--color-terracota-400) / <alpha-value>)',
          500: 'oklch(var(--color-terracota-500) / <alpha-value>)',
          600: 'oklch(var(--color-terracota-600) / <alpha-value>)',
          700: 'oklch(var(--color-terracota-700) / <alpha-value>)',
          800: 'oklch(var(--color-terracota-800) / <alpha-value>)',
          900: 'oklch(var(--color-terracota-900) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'oklch(var(--color-gold-500) / <alpha-value>)',
          50: 'oklch(var(--color-gold-50) / <alpha-value>)',
          100: 'oklch(var(--color-gold-100) / <alpha-value>)',
          200: 'oklch(var(--color-gold-200) / <alpha-value>)',
          300: 'oklch(var(--color-gold-300) / <alpha-value>)',
          400: 'oklch(var(--color-gold-400) / <alpha-value>)',
          500: 'oklch(var(--color-gold-500) / <alpha-value>)',
          600: 'oklch(var(--color-gold-600) / <alpha-value>)',
          700: 'oklch(var(--color-gold-700) / <alpha-value>)',
          800: 'oklch(var(--color-gold-800) / <alpha-value>)',
          900: 'oklch(var(--color-gold-900) / <alpha-value>)',
        },
        sage: {
          DEFAULT: 'oklch(var(--color-sage-500) / <alpha-value>)',
          50: 'oklch(var(--color-sage-50) / <alpha-value>)',
          100: 'oklch(var(--color-sage-100) / <alpha-value>)',
          200: 'oklch(var(--color-sage-200) / <alpha-value>)',
          300: 'oklch(var(--color-sage-300) / <alpha-value>)',
          400: 'oklch(var(--color-sage-400) / <alpha-value>)',
          500: 'oklch(var(--color-sage-500) / <alpha-value>)',
          600: 'oklch(var(--color-sage-600) / <alpha-value>)',
          700: 'oklch(var(--color-sage-700) / <alpha-value>)',
          800: 'oklch(var(--color-sage-800) / <alpha-value>)',
          900: 'oklch(var(--color-sage-900) / <alpha-value>)',
        },
        twilight: {
          DEFAULT: 'oklch(var(--color-twilight-500) / <alpha-value>)',
          50: 'oklch(var(--color-twilight-50) / <alpha-value>)',
          100: 'oklch(var(--color-twilight-100) / <alpha-value>)',
          200: 'oklch(var(--color-twilight-200) / <alpha-value>)',
          300: 'oklch(var(--color-twilight-300) / <alpha-value>)',
          400: 'oklch(var(--color-twilight-400) / <alpha-value>)',
          500: 'oklch(var(--color-twilight-500) / <alpha-value>)',
          600: 'oklch(var(--color-twilight-600) / <alpha-value>)',
          700: 'oklch(var(--color-twilight-700) / <alpha-value>)',
          800: 'oklch(var(--color-twilight-800) / <alpha-value>)',
          900: 'oklch(var(--color-twilight-900) / <alpha-value>)',
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
  plugins: [typography, containerQueries],
} satisfies Config
