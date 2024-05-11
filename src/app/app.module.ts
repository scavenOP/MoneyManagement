import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AddTxnComponent } from './Components/add-txn/add-txn.component';

import { CorsInterceptor } from './cors.intercepter';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddTxnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:CorsInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
