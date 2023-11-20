import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WhoamiComponent } from './whoami/whoami.component';
import { Whoami2Component } from './whoami2/whoami2.component';

@NgModule({
  declarations: [
    AppComponent,
    WhoamiComponent,
    Whoami2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
