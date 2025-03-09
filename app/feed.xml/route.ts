import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://imaginifyy-one.vercel.app'

  // Generate RSS feed
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Imaginify - AI Image Editor</title>
    <link>${baseUrl}</link>
    <description>Transform your photos with AI-powered editing tools. Remove objects, restore old photos, and more.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    
    <item>
      <title>AI Image Editor - Remove Objects, Restore Photos</title>
      <link>${baseUrl}</link>
      <guid>${baseUrl}</guid>
      <description>Use our free AI image editor to remove unwanted objects, restore old photos, and remove backgrounds instantly.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
    
    <item>
      <title>AI Photo Restoration and Enhancement</title>
      <link>${baseUrl}/features</link>
      <guid>${baseUrl}/features</guid>
      <description>Discover how to restore old photos and enhance image quality using AI technology.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
    
    <item>
      <title>Free AI Background Removal Tool</title>
      <link>${baseUrl}/pricing</link>
      <guid>${baseUrl}/pricing</guid>
      <description>Remove backgrounds from images instantly with our free AI tool.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  })
} 