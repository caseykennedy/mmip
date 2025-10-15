import localFont from 'next/font/local'

export const HelveticaNowFont = localFont({
  src: [
    {
      path: './HelveticaNowText.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './HelveticaNowTextMedium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-helvetica-now',
})

export const RealHeadFont = localFont({
  src: './RealHeadProBold.woff2',
  weight: '700',
  style: 'normal',
  display: 'swap',
  variable: '--font-real-head',
})
