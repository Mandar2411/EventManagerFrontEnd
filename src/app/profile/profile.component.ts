import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user?: any;
  registrations?: any;
  events?: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const url = "http://localhost:3000/api/getuser?id="+id;
    this.http.get(url).subscribe((res: any)=>{
      console.log(res);
      this.user = res.user;
      this.registrations = res.registrations;
      this.events = res.events;
    });
  }

}
