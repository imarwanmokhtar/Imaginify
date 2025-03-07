export const GTM_ID = 'GTM-PJVHRGGF'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export const pageview = (url: string) => {
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      event: "pageview",
      page: url,
    })
  }
}

// Initialize GTM
export const initGTM = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
  }
} 