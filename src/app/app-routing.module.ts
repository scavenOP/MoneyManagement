import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTxnComponent } from './Components/add-txn/add-txn.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HomeComponent } from './Components/home/home.component';
import { AllTransactionComponent } from './Components/all-transaction/all-transaction.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'add-txn', component: AddTxnComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'all-transactions', component: AllTransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
