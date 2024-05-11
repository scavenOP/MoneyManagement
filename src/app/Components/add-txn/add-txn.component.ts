import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpClientModule, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-txn',
  templateUrl: './add-txn.component.html',
  styleUrls: ['./add-txn.component.scss']
})
export class AddTxnComponent {
  transactionForm: FormGroup;
  categories: string[] = ['Food', 'Travel', 'Shooping', 'Others'];
  baseURL='https://txnapi.azurewebsites.net'

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.transactionForm = this.formBuilder.group({
      amount: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const requestBody =  this.transactionForm.value;
      
      this.http.post(this.baseURL+'/save', requestBody)
        .subscribe(
          (response) => {
            alert('Transaction added successfully!');
            console.log('Transaction added successfully!');
            // Reset the form
            this.transactionForm.reset();
          },
          (error) => {
            alert('Error adding transaction: ' + error.message);
            console.error('Error adding transaction:', error);
          }
        );
    }
  }


}
