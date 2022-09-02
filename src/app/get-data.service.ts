import { Injectable } from '@angular/core';
import { Event, Tag, Category, Subcategory } from './interface'
import { EVENTS, TAGS, CATS, SUBCATS } from './mock-data';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  events: any;
  event: any;
  constructor(private http: HttpClient) { }
 
  getEvents(): Observable<Event[]> {
    const url = 'http://localhost:3000/api/events';
    this.http.get(url).subscribe((res: any)=>{
      this.events = res
    })

    return of(this.events);
  }

  getEvent(id: number): Observable<Event> {
    const url = 'http://localhost:3000/api/events/'+id;
    this.http.get(url).subscribe((res: any)=>{
      this.event = res
    })
    
    return of(this.event);
  }

  getTags(): Observable<Tag[]> {
    const tags = of(TAGS);
    return tags;
  }
  
  getCats(): Observable<Category[]> {
    const cats = of(CATS);
    return cats;
  }

  getSubcats(): Observable<Subcategory[]> {
    const subcats = of(SUBCATS);
    return subcats;
  }

}
