import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit } from './middleware/rateLimit';

export async function middleware(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = await rateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  return NextResponse.next();
}

// Configuration for which routes the middleware should be applied
export const config = {
  matcher: ['/api/:path*'],
};
