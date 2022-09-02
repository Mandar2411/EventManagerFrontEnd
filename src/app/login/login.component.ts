import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Location} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError = false;

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  
  getUSerFormData(data: any) {
    const url = "http://localhost:3000/api/login";
    const userData = {email: data.email, password: data.password};
    const now = new Date();
    this.http.post(url, userData)
    .subscribe({
      complete: () => {  },
      error: (error: HttpErrorResponse) => { 
        console.log(error); 
        this._snackBar.open("Invalid Credentials", "", {
          duration: 2000,
        });
      },
      next: (res: any) => { 
        const token = {
          value: res.token,
          expiry: now.getTime() + 604800000
        }
        
        localStorage.setItem('token', JSON.stringify(token)); 
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/']);
        });
        this._snackBar.open("Successfully Signed In", "", {
          duration: 2000,
        });
      }
    });
  }
}

