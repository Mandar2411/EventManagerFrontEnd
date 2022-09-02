import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = false;
  user_id: string = "";
  constructor(private router: Router, private _snackBar: MatSnackBar, private http: HttpClient) { }
  
  ngOnInit(): void {
    const tokenStr = localStorage.getItem('token');
    if(!tokenStr) {
      this.user = false;
    } else {
      const token = JSON.parse(tokenStr);
      
      if(token.value == "") 
        this.user = false;
      else {
        const url = "http://localhost:3000/api/getid?token="+token.value;
        this.http.get(url).subscribe((res: any)=>{
          this.user_id = res;
          console.log(res);
        });
        console.log(this.user_id);
      }
    }
    
  }

  checkuser() {
    const tokenStr = localStorage.getItem('token');
    if(!tokenStr) {
      return false;
    } else {
      const token = JSON.parse(tokenStr);
      
      if(token.value == "") 
        return false;
      else {
        
        return true;
      }
       
    }
  }

  logout() {
    localStorage.setItem('token', '');
    this._snackBar.open("Successfully Signed Out", "", {
      duration: 2000,
    });
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/']);
    });
  }

}
