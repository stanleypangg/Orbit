import { NextRequest, NextResponse } from 'next/server';

// In-memory cache for images (LRU-style)
const imageCache = new Map<string, { data: Buffer; contentType: string; timestamp: number }>();
const MAX_CACHE_SIZE = 50; // Cache up to 50 images
const CACHE_TTL = 3600 * 1000; // 1 hour in milliseconds

function cleanCache() {
  if (imageCache.size <= MAX_CACHE_SIZE) return;
  
  // Remove oldest entries
  const entries = Array.from(imageCache.entries());
  entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
  
  const toRemove = entries.slice(0, entries.length - MAX_CACHE_SIZE);
  toRemove.forEach(([key]) => imageCache.delete(key));
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ imageId: string }> }
) {
  const { imageId } = await params;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  try {
    // Check in-memory cache first
    const cached = imageCache.get(imageId);
    if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
      console.log(`[IMAGE CACHE] HIT: ${imageId}`);
      return new NextResponse(cached.data, {
        headers: {
          'Content-Type': cached.contentType,
          'Cache-Control': 'public, max-age=3600, immutable',
          'X-Cache': 'HIT',
        },
      });
    }

    // Fetch from backend
    console.log(`[IMAGE CACHE] MISS: ${imageId} - Fetching from backend`);
    const response = await fetch(`${backendUrl}/images/${imageId}`, {
      // Enable Next.js fetch cache
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`[IMAGE CACHE] Backend error: ${response.status}`);
      return NextResponse.json(
        { error: 'Image not found' },
        { status: response.status }
      );
    }

    const contentType = response.headers.get('content-type') || 'image/webp';
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Store in cache
    imageCache.set(imageId, {
      data: buffer,
      contentType,
      timestamp: Date.now(),
    });
    cleanCache();

    console.log(`[IMAGE CACHE] Cached ${imageId} (${buffer.length} bytes)`);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, immutable',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error(`[IMAGE CACHE] Error fetching ${imageId}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  });
}

