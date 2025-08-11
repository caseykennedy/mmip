// ./lib/utils

import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
}

// String Utilities
// ==============================
export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export function unslugify(str: string) {
  return str.replace(/-/g, ' ')
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase())
}

export function toSentenceCase(str: string) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

// Utility function to create a slug from the heading text
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}

// Array and Object Utilities
// ==============================
export function splitArray<T>(arr: T[]): { firstFour: T[]; rest: T[] } {
  const firstFour = arr.slice(0, 4) // Capture the first four elements
  const rest = arr.slice(4) // Capture the rest of the elements
  return { firstFour, rest }
}

// Formatting Utilities
// ==============================
export function formatNumber(
  number: number | string,
  options: {
    decimals?: number
    style?: Intl.NumberFormatOptions['style']
    notation?: Intl.NumberFormatOptions['notation']
  } = {},
) {
  const { decimals = 0, style = 'decimal', notation = 'standard' } = options

  return new Intl.NumberFormat('en-US', {
    style,
    notation,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(number))
}

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  },
) {
  return new Intl.DateTimeFormat('en-US', {
    ...options,
  }).format(new Date(date))
}

// Text Extraction Utilities
// ==============================

export function getWordCount(text: string): number {
  const words = text.trim().split(/\s+/)
  return words.length
}

// Miscellaneous Utilities
// ==============================
export function scrollTop(e: React.MouseEvent<HTMLButtonElement>) {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  e.preventDefault()
}

export function isMacOs() {
  if (typeof window === 'undefined') return false
  return window.navigator.userAgent.includes('Mac')
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
