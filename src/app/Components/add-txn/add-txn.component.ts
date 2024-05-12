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
  baseURL='https://txnapi.azurewebsites.net';
  isLoading:boolean=false;

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
      // Disable the submit button
       // Get the submit button element from the DOM
    const submitButton = document.getElementById('submit-button') as HTMLButtonElement;

    // Disable the submit button
    if (submitButton) {
      submitButton.disabled=true;
    }

    // Display a rotating loader
    this.isLoading = true;
      
      this.http.post(this.baseURL+'/save', requestBody)
        .subscribe(
          (response) => {
            this.isLoading = false;
            alert('Transaction added successfully!');
            console.log('Transaction added successfully!');
            // Reset the form
            this.transactionForm.reset();
          },
          (error) => {
            this.isLoading = false;
            alert('Error adding transaction: ' + error.message);
            console.error('Error adding transaction:', error);
          }
        );
    }
  }


}
