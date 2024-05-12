import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTxnComponent } from './Components/add-txn/add-txn.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'add-txn', component: AddTxnComponent },
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
