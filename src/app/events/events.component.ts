import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { Event, Category, Subcategory, Tag } from '../interface';
import {  ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any = {};
  eventstmp: any;
  cats: Category[] = [];
  subcats: Subcategory[] = [];
  tags: any;
  taggings: any;
  tagids: any;
  tgs: number[] = [];
  tgs_list: string = "";
  url: string = "";
  selectedCat?: string;
  selectedSubcat?: string;

  constructor(private getDataService: GetDataService, private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getData();

    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedCat = params['cat']
      this.selectedSubcat = params['status']
      this.tgs_list = params['tags']
    });
    
    if(this.tgs_list.length > 0) {
      this.tgs = this.tgs_list.split(',').map(function(item) {
        return parseInt(item, 10);
      });
    }

    this.url = "http://localhost:3000/api/events?event_type="+this.selectedCat+"&status="+this.selectedSubcat+"&tags="+this.tgs_list;
    this.http.get(this.url).subscribe((res: any)=>{
      this.events = res;
      //console.log(this.url);
    });

    const tokenStr = localStorage.getItem('token'); 
    if(tokenStr) {
      const token = JSON.parse(tokenStr);
      const now = new Date();
      if (now.getTime() > token.expiry) {
        token.value = '';
        localStorage.setItem('token', JSON.stringify(token))
      }
    }
  }

  ngAfterViewInit() {
    for(let i=0; i<this.tgs.length; i++){
      var tag = document.getElementById(this.tgs[i].toString());
      console.log(tag);
      tag?.classList.remove("badge-info");
      tag?.classList.add("badge-warning");
    }
    
  }

  getEvents(): void {
    this.url = "http://localhost:3000/api/events?event_type="+this.selectedCat+"&status="+this.selectedSubcat+"&tags="+this.tgs_list;
    this.http.get(this.url).subscribe((res: any)=>{
      this.events = res;
      console.log(this.url);
    });
  }
  
  getData(): void {
    const url = 'http://localhost:3000/api';
    
    this.http.get(url+'/tags').subscribe((res: any)=>{
      this.tags = res
    })
    
    this.http.get(url+'/taggings').subscribe((res: any)=>{
      this.taggings = res;
    })

    this.http.get(url+'/tagids').subscribe((res: any)=>{
      this.tagids = res
    })

    this.getDataService.getCats().subscribe(cats => this.cats = cats );
    this.getDataService.getSubcats().subscribe(subcats => this.subcats = subcats );
  }

  filter(category: Category) {
    this.selectedCat = this.cats.find(x => x.id == category.id)?.name;
    this.getEvents();
    this.router.navigate(['/events'],{queryParams: {cat: this.selectedCat, status: this.selectedSubcat, tags: this.tgs_list}});
  }
  
  subfilter(subcategory: Subcategory) {
    this.selectedSubcat = this.subcats.find(x => x.id == subcategory.id)?.name;
    this.getEvents();
    this.router.navigate(['/events'],{queryParams: {cat: this.selectedCat, status: this.selectedSubcat, tags: this.tgs_list}});
  }

  tagfilter(tag: number, event: any) {
    const index: number = this.tgs.indexOf(tag);
    
    if(index != -1) {
      this.tgs.splice(index, 1);
      event.target.classList.remove('badge-warning');
      event.target.classList.add('badge-info');
    }
    else {
      this.tgs.push(tag);
      event.target.classList.remove('badge-info');
      event.target.classList.add('badge-warning');
    }
    this.tgs_list = "";

    for(let i=0; i<this.tgs.length; i++){
      if(i!=0)
        this.tgs_list += ",";
      this.tgs_list += this.tgs[i] ;
    }
    console.log(this.tgs_list);
    this.getEvents();
    this.router.navigate(['/events'],{queryParams: {cat: this.selectedCat, status: this.selectedSubcat, tags: this.tgs_list}});
  }


  getEntrires(object: any) {
    return Object.entries(object);
  }
}
