import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCacheService } from '../service/http-cache/http-cache.service';

/**
 * Interceptor that caches GET requests to reduce redundant network calls.
 * Uses HttpCacheService to store and retrieve responses.
 */
@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: HttpCacheService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // For only used for GET requests
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    // Based on the headers
    if (request.headers.get('x-cache') === 'no-cache') {
      return next.handle(request);
    }

    // Check the cache is exist or not
    const cachedResponse = this.cacheService.handleCacheGet(request.urlWithParams);
    if (cachedResponse) {
      return of(new HttpResponse({
        body: cachedResponse.data,
        status: cachedResponse.status,
        url: request.urlWithParams
      }));
    }

    //request and cache the response
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.handleCacheStore(request.urlWithParams, {
            data: event.body as Array<{ [key: string]: unknown }>,
            status: event.status
          });
        }
      })
    );
  }
}
