import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  getUSerFormData(data: any) {
    const url = "http://localhost:3000/api/register";
    const userData = {email: data.email, password: data.password, cnfpassword: data.cnfpassword};

    if(data.password != data.cnfpassword) {
      this._snackBar.open("Passwords didn't match", "", {
        duration: 2000,
      });
    } else {
      this.http.post(url, userData)
      .subscribe({
        complete: () => {  },
        error: (error: HttpErrorResponse) => { 
          this._snackBar.open("Email already taken", "", {
            duration: 2000,
          });
        },
        next: (res: any) => { 
          this.router.navigate(['/login']);
          this._snackBar.open("Successfully Signed Up", "", {
            duration: 2000,
          });
        }
      });
    }
  }

}
