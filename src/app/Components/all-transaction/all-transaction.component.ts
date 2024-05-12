
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-transaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-transaction.component.html',
  styleUrl: './all-transaction.component.scss'
})
export class AllTransactionComponent {

  expenses: any[];
  baseURL='https://txnapi.azurewebsites.net/';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchExpenses();
  }

  fetchExpenses() {
    this.http.get(this.baseURL+'/GetAll').subscribe(
      (response: any) => {
        this.expenses = response;
        console.log(response);
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }

}
