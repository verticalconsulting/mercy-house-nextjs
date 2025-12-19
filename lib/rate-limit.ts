import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiter (for development/small scale)
// For production, use Redis-based solution like @upstash/ratelimit

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key)
    }
  }
}, 3600000) // 1 hour

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

export function rateLimit(config: RateLimitConfig) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    // Get client identifier (IP address)
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous'

    const now = Date.now()
    const key = `ratelimit:${ip}`

    const entry = rateLimitStore.get(key)

    if (!entry || entry.resetTime < now) {
      // Create new entry
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      })
      return null // Allow request
    }

    if (entry.count >= config.maxRequests) {
      // Rate limit exceeded
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000)

      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': config.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': entry.resetTime.toString(),
          }
        }
      )
    }

    // Increment counter
    entry.count++
    rateLimitStore.set(key, entry)

    return null // Allow request
  }
}

// Preset configurations
export const rateLimitConfigs = {
  // Strict limit for form submissions (5 per hour)
  formSubmission: {
    maxRequests: 5,
    windowMs: 3600000, // 1 hour
  },
  // Moderate limit for general API calls (60 per minute)
  api: {
    maxRequests: 60,
    windowMs: 60000, // 1 minute
  },
  // Lenient limit for read operations (100 per minute)
  read: {
    maxRequests: 100,
    windowMs: 60000, // 1 minute
  },
}
