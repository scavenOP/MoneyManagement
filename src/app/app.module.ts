import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AddTxnComponent } from './Components/add-txn/add-txn.component';
import { FormsModule } from '@angular/forms';
import { CorsInterceptor } from './cors.intercepter';
import { HomeComponent } from './Components/home/home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AllTransactionComponent } from './all-transaction/all-transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddTxnComponent,
    HomeComponent,
    DashboardComponent,
    AllTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:CorsInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
