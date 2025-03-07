'use client'

import { useEffect } from 'react'
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals'
import { sendToAnalytics } from '@/lib/web-vitals'

export function WebVitals() {
  useEffect(() => {
    try {
      onCLS(sendToAnalytics)
      onFID(sendToAnalytics)
      onLCP(sendToAnalytics)
      onFCP(sendToAnalytics)
      onTTFB(sendToAnalytics)
    } catch (e) {
      console.error('Web Vitals Error:', e)
    }
  }, [])

  return null
} 