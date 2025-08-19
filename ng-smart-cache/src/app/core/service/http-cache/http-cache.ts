/**
 * Abstract class for managing HTTP cache operations.
 * Provides a base contract for handling cache storage, retrieval,
 * update, deletion, and lookup.
 */
export abstract class HttpCache {
  /**
   * In-memory cache storage for HTTP responses.
   * Uses the request URL (string) as the key and a response object as the value.
   */
  protected cacheMemory: Map<string, response> = new Map();

  /**
   * Retrieves a cached response for the given URL.
   *
   * @param url_param - The request URL used as the cache key.
   * @returns The cached response if found, otherwise `null`.
   */
  abstract handleCacheGet(url_param: string): response | null;

  /**
   * Updates an existing cache entry with a new response.
   *
   * @param url_param - The request URL used as the cache key.
   * @param value - The new response object to replace the existing one.
   * @returns The updated response object.
   */
  abstract handleCacheUpdate(url_param: string, value: response): response;

  /**
   * Deletes a cached entry for the given URL.
   *
   * @param url_param - The request URL used as the cache key.
   * @returns The deleted cache key if successful, otherwise `null`.
   */
  abstract handleCacheDelete(url_param: string): string | null;

  /**
   * Stores a new response in the cache.
   *
   * @param url_param - The request URL used as the cache key.
   * @param value - The response object to be cached.
   * @returns The cached response object.
   */
  abstract handleCacheStore(url_param: string, value: response): response;

  /**
   * Finds a cache entry by the given URL.
   *
   * @param url_param - The request URL used as the cache key.
   * @returns The URL string if the cache entry exists, otherwise `null`.
   */
  abstract handleCacheFind(url_param: string): string | null;
}

/**
 * Interface representing a standard HTTP response object
 * stored in the cache.
 */
export interface response {
  /** Response data (generic key-value pairs, typically API payloads). */
  data: Array<{ [key: string]: unknown }>;

  /** HTTP status code of the response. */
  status: number;

  /** Additional optional metadata or custom properties. */
  [key: string]: unknown;
}
