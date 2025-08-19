# Http_cache_Implementation
This repository demonstrates how to boost Angular app performance by implementing a custom HTTP caching layer using an HttpInterceptor. With smart caching, your app can reuse previously fetched API responses, reduce backend load, and deliver a snappier user experience.


Feature:
1.Faster load times → avoids duplicate API calls
2.Reduced server load → fewer hits on your backend
3.Configurable TTL (Time-to-Live) → auto-expire old cache entries
4.Per-request control → skip caching by adding a custom header (x-cache: no-cache)
5.Cache keys → based on request URL + query params

Feature Details:
1.HttpCacheService → manages in-memory cache with expiry support
2.CachingInterceptor → intercepts GET requests, returns cached responses if available, or stores fresh responses for future use
3.Supports opt-out → you can easily disable caching for sensitive or always-fresh APIs

Implementation:
Register the interceptor in app.module.ts
All GET requests are cached by default
Skip caching for specific requests:
this.http.get('/api/users', {
  headers: { 'x-cache': 'no-cache' }
});
