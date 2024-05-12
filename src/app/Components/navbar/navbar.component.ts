import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { asyncScheduler } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  profile = {
    name: '',
    monthlyBudget: 0,
    yearlyBudget: 0
  };
  loginForm: FormGroup;
  isLoggedIn = false;
  username: string;
  baseURL='https://txnapi.azurewebsites.net/';
  loginModalRef: NgbModalRef;
  @ViewChild('closemodal') myButton: ElementRef;
  storedUsername :String|null;
  budgetForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private modalService: NgbModal,private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.budgetForm = this.formBuilder.group({
      username: [localStorage.getItem('username'), Validators.required],
      monthlyBudget: [localStorage.getItem('monthlyBudget'), Validators.required],
      yearlyBudget: [localStorage.getItem('yearlyBudget'), Validators.required]
    });
  }

  ngOnInit() {
    this.checkLoginStatus();
    this.storedUsername = localStorage.getItem('username');
  }

  checkLoginStatus() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.isLoggedIn = true;
      this.username = storedUsername;
    }
  }

  fetchMonthlyBudget() {
    
        this.budgetForm.patchValue({
          username: localStorage.getItem('username'),
          monthlyBudget: localStorage.getItem('monthlyBudget'),
          yearlyBudget: localStorage.getItem('yearlyBudget')
        });
      
      
    
  }

  updateBudget() {
    if (this.budgetForm.valid) {
      this.http.post(this.baseURL+"/updateProfile", this.budgetForm.value).subscribe(
        (response: any) => {
          localStorage.setItem("monthlyBudget",this.budgetForm.value.monthlyBudget);
          localStorage.setItem("yearlyBudget",this.budgetForm.value.yearlyBudget);
          alert("Budget updated successfully");
          console.log('Monthly budget updated:', response);
          var closeb =document.getElementById('budgetmodalclose');
          if(closeb){
            closeb.click();
          }
          this.router.navigate(['/']);
          // Close the modal or perform any other necessary actions
        },
        (error) => {
          console.error('Error updating monthly budget:', error);
        }
      );
    }
  }

  openModal() {
    this.loginModalRef = this.modalService.open("loginmodal");
  }
  clickButton() {
    const button = document.getElementById('closeModal');
    if (button) {
      button.click();
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.http.post(this.baseURL+"/login", this.loginForm.value).subscribe(
        (response: any) => {
            this.isLoggedIn = true;
            this.username = response.username;
            localStorage.setItem('username', this.username);
            localStorage.setItem('monthlyBudget', response.monthlyBudget);
            localStorage.setItem('yearlyBudget', response.yearlyBudget);
            // Click the button
          this.clickButton();

          
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.username = '';
    localStorage.removeItem('username');
    localStorage.removeItem('monthlyBudget');
    localStorage.removeItem('yearlyBudget');
    // Redirect to the root URL
    this.router.navigate(['/']);
  }

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Form Submitted!', this.profile);
      localStorage.setItem('username', this.profile.name);

}
  }
}
