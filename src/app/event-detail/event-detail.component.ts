import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event?: any;
  current_user?: number;
  registrations?: any;
  message = "";
  canRegister = true;
  checkUser = false;
  registered = false;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getEvent();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const tokenStr = localStorage.getItem('token');
    if(tokenStr) { 
      const token = JSON.parse(tokenStr).value;
      if(token == '') {
        this.checkUser= false;
      } else {
        this.checkUser = true;
        const url = "http://localhost:3000/api/checkregister?id="+id+"&token="+token;
        this.http.get(url).subscribe((res: any)=>{
          console.log(res);
          if(res.present == "false") {
            this.registered = false;
          } else {
            this.registered = true;
          }
        });
      }
    }
    
  }
  
  getEvent(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const url = "http://localhost:3000/api/event/"+id;
    this.http.get(url).subscribe((res: any)=>{
      console.log(res);
      this.event = res.event;
      if(res.message == "register") 
        this.canRegister = true;
      else {
        this.canRegister = false;
        this.message = res.message;
      }
        
    });
    console.log(id); 
  }
  
  goBack(): void {
    this.location.back();
  }

  LoginInFirst() {
    this.router.navigate(['/login']);
  }

  register() {
    const id = this.route.snapshot.paramMap.get('id');
    const tokenStr = localStorage.getItem('token');
    if(tokenStr) { 
      const token = JSON.parse(tokenStr);
      const url = "http://localhost:3000/api/eventregister?id="+id+"&token="+token.value;
      this.http.get(url).subscribe((res: any)=>{
        console.log(res);
      });
      this.registered = true;
      this._snackBar.open("Registration Successful", "", {
        duration: 2000,
      });
      this.router.navigate(['/detail/'+id]);
    }
    const token = localStorage.getItem('token');
    
  }

  unregister() {
    const id = this.route.snapshot.paramMap.get('id');
    const tokenStr = localStorage.getItem('token');
    if(tokenStr) {
      const token = JSON.parse(tokenStr);
      const url = "http://localhost:3000/api/eventunregister?id="+id+"&token="+token.value;
      this.http.get(url).subscribe((res: any)=>{
        console.log(res);
      });
      this.registered = false;
      this._snackBar.open("Registration Cancel", "", {
        duration: 2000,
      });
      this.router.navigate(['/detail/'+id]);
    } 
  }

}
