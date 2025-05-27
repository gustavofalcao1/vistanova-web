import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Cache to store request counters
const requestCounts = new Map<string, { count: number; lastReset: number }>();

// Rate limiting settings
const RATE_LIMIT = 5; // Maximum number of requests per time window
const WINDOW_MS = 15 * 60 * 1000; // Time window in milliseconds (15 minutes)

/**
 * Middleware to limit request rate
 * @param req Incoming request
 * @returns Error response if rate limit is exceeded, otherwise continues to next middleware
 */
export async function rateLimit(req: NextRequest) {
  // Safely get client IP address
  let ip = 'unknown';
  const forwarded = req.headers.get('x-forwarded-for');
  
  if (forwarded) {
    ip = forwarded.split(',')[0].trim();
  } else if (req.headers.get('x-real-ip')) {
    ip = req.headers.get('x-real-ip') || 'unknown';
  }
  
  // If it's a request to the contact API
  if (req.nextUrl.pathname.startsWith('/api/contact')) {
    const now = Date.now();
    const clientData = requestCounts.get(ip) || { count: 0, lastReset: now };

    // Reset counter if time window has passed
    if (now - clientData.lastReset > WINDOW_MS) {
      clientData.count = 0;
      clientData.lastReset = now;
    }

    // Increment counter
    clientData.count += 1;
    requestCounts.set(ip, clientData);

    // Check if limit has been exceeded
    if (clientData.count > RATE_LIMIT) {
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          error: 'Muitas requisições. Por favor, tente novamente mais tarde.' 
        }),
        { 
          status: 429,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }

  return NextResponse.next();
}
