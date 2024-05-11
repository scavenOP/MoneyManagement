import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTxnComponent } from './Components/add-txn/add-txn.component';

const routes: Routes = [
  { path: 'add-txn', component: AddTxnComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
