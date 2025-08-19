import { Injectable } from '@angular/core';
import { HttpCache, response } from './http-cache';

/**
 * Concrete implementation of the abstract HttpCache class.
 * Provides in-memory caching for HTTP responses with
 * methods to store, update, delete, find, and retrieve cached data.
 */
@Injectable({
  providedIn: 'root',
})
export class HttpCacheService extends HttpCache {
  constructor() {
    super();
  }

  /**
   * Deletes a cache entry for the given URL if it exists.
   *
   * @param url_param - The request URL used as the cache key.
   * @returns A string `"delete"` if the entry was removed, otherwise `null`.
   */
  handleCacheDelete(url_param: string): string | null {
    let result;
    if (this.handleCacheFind(url_param)) {
      result = 'delete';
      this.cacheMemory.delete(url_param);
    } else {
      result = null;
    }
    return result;
  }

  /**
   * Stores a response in the cache.
   * If an entry already exists for the given URL, it is updated.
   *
   * @param url_param - The request URL used as the cache key.
   * @param value - The response object to be cached.
   * @returns The cached response object.
   */
  handleCacheStore(url_param: string, value: response): response {
    typeof this.handleCacheFind(url_param) === 'string'
      ? this.handleCacheUpdate(url_param, value)
      : this.cacheMemory.set(url_param, value);
    return value;
  }

  /**
   * Updates an existing cache entry with a new response.
   * If the entry does not exist, it is created.
   *
   * @param url_param - The request URL used as the cache key.
   * @param value - The new response object to replace the existing one.
   * @returns The updated response object.
   */
  handleCacheUpdate(url_param: string, value: response): response {
    this.cacheMemory.set(url_param, value);
    return value;
  }

  /**
   * Retrieves a cached response for the given URL.
   *
   * @param url_param - The request URL used as the cache key.
   * @returns The cached response if found, otherwise `null`.
   */
  handleCacheGet(url_param: string): response | null {
    let result;
    if (typeof this.handleCacheFind(url_param) === 'string') {
      result = this.cacheMemory.get(url_param) as response;
    } else {
      result = null;
    }
    return result;
  }

  /**
   * Checks if a cache entry exists for the given URL.
   *
   * @param url_param - The request URL used as the cache key.
   * @returns The string `"available"` if the cache exists, otherwise `null`.
   */
  handleCacheFind(url_param: string): string | null {
    return this.cacheMemory.get(url_param) ? 'available' : null;
  }
}
