import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private modalService: NgbModal) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.isLoggedIn = true;
      this.username = storedUsername;
    }
  }

  openModal(modalTemplate: TemplateRef<any>) {
    this.loginModalRef = this.modalService.open(modalTemplate);
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.http.post(this.baseURL+"/login", this.loginForm.value).subscribe(
        (response: any) => {
          if (response.status === 200) {
            this.isLoggedIn = true;
            this.username = response.username;
            localStorage.setItem('username', this.username);
            this.loginModalRef.close();
          } else {
            console.error('Login error:', response);
          }
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
  }

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Form Submitted!', this.profile);
      localStorage.setItem('username', this.profile.name);

}
  }
}
