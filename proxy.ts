import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // 1. Define allowed paths
  const allowedRoutes = [
    '/',
    '/about',
    '/projects',
    '/services',
    '/blog',
    '/news',
    '/careers',
    '/contact',
    '/policy-privacy',
    '/terms-and-conditions',
    '/sitemap.xml',
    '/robots.txt',
    '/spam-cleanup.xml',
    '/manifest.webmanifest',
  ]

  // Define allowed dynamic route prefixes
  const allowedPrefixes = [
    '/projects/',
    '/services/',
    '/blog/',
    '/news/',
    '/careers/',
  ]

  // 2. STRICT PATH CHECK: If path is not in the list, block it immediately.
  const isAllowed = allowedRoutes.includes(pathname) || 
                   allowedPrefixes.some(prefix => pathname.startsWith(prefix));

  if (!isAllowed) {
    return spamResponse()
  }

  // 3. QUERY PARAM CHECK: 
  // We allow common tracking parameters used by social media and marketing tools.
  // This ensures that shared links (e.g., from Facebook/LinkedIn) are not blocked.
  const allowedQueryParams = [
    'fbclid', 'gclid', 'utm_source', 'utm_medium', 'utm_campaign', 
    'utm_term', 'utm_content', 'ref', 's',
    'sector', 'category', 'location', 'page', 'tag', 'q'
  ]
  
  const hasUnknownParams = Array.from(searchParams.keys()).some(
    key => !allowedQueryParams.includes(key)
  )

  if (hasUnknownParams && Array.from(searchParams.keys()).length > 0) {
    return spamResponse()
  }

  return NextResponse.next()
}

function spamResponse() {
  return new NextResponse('410 Gone - Spam Link Removed', { 
    status: 410,
    statusText: 'Gone',
    headers: {
      'Content-Type': 'text/plain',
      'X-Robots-Tag': 'noindex, nofollow'
    }
  })
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
