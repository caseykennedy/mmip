'use client'

import { useRef } from 'react'

import { useInView as useInViewPrimitive } from 'framer-motion'

const useInView = ({ amount = 0.25, once = true }: { amount?: number; once?: boolean }) => {
  const inViewRef = useRef(null)
  const isInView = useInViewPrimitive(inViewRef, { amount, once })

  return { inViewRef, isInView }
}

export default useInView
