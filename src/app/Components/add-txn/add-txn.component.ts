import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpClientModule, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-txn',
  templateUrl: './add-txn.component.html',
  styleUrls: ['./add-txn.component.scss']
})
export class AddTxnComponent {
  transactionForm: FormGroup;
  categories: string[] = ['Food', 'Travel', 'Shooping','Grocery','Gifts','Bills', 'Others'];
  baseURL='https://txnapi.azurewebsites.net';
  isLoading:boolean=false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    if(localStorage.getItem('username')==null){
        // Redirect to the root URL
    this.router.navigate(['/']);
    }
    this.transactionForm = this.formBuilder.group({
      amount: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      date: [new Date().toISOString().slice(0, 10), Validators.required]
    });
    console.log(new Date().toISOString());
    const storedUsername = localStorage.getItem('username');
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const requestBody = {
        ...this.transactionForm.value,
        username: localStorage.getItem('username'),
      };
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
