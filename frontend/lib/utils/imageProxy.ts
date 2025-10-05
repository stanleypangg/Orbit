/**
 * Image Proxy Utility
 * Rewrites backend image URLs to use Next.js API route proxy with caching
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

/**
 * Converts backend image URL to Next.js proxy URL
 * This enables:
 * - Server-side caching (Next.js fetch cache)
 * - In-memory caching in the API route
 * - Browser caching with immutable headers
 * 
 * @param imageUrl - Backend image URL (e.g., "http://localhost:8000/images/hero_...")
 * @returns Proxied URL (e.g., "/api/images/hero_...")
 */
export function getProxiedImageUrl(imageUrl: string): string {
  if (!imageUrl || imageUrl === 'undefined') return '';
  
  // Already a proxy URL or local asset
  if (imageUrl.startsWith('/api/images/') || imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  // Extract image ID from backend URL
  // Format: http://localhost:8000/images/{imageId}
  const match = imageUrl.match(/\/images\/([^?]+)/);
  if (match) {
    const imageId = match[1];
    return `/api/images/${imageId}`;
  }
  
  // Fallback: return original URL
  console.warn('[IMAGE PROXY] Could not parse image URL:', imageUrl);
  return imageUrl;
}

/**
 * Preloads an image by making a fetch request
 * Useful for warming up the cache before rendering
 */
export async function preloadImage(imageUrl: string): Promise<void> {
  try {
    const proxiedUrl = getProxiedImageUrl(imageUrl);
    await fetch(proxiedUrl);
  } catch (error) {
    console.error('[IMAGE PROXY] Preload failed:', error);
  }
}

/**
 * Batch preload multiple images
 */
export async function preloadImages(imageUrls: string[]): Promise<void> {
  await Promise.all(imageUrls.map(preloadImage));
}

