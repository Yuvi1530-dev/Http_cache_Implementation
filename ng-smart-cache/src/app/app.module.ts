import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CacheInterceptor } from './core/interceptor/cache-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
