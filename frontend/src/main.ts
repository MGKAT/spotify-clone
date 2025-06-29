import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'zone.js'; 
import { HttpClientModule }     from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, HttpClientModule),
  ]
})
.catch(err => console.error(err));
