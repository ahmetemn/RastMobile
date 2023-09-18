import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { todoItem } from '../component/models/todoItem';
@Injectable({
  providedIn: 'root'
})
export class RastMobileService {

  constructor(private http:HttpClient) { }

  // getTodos(): Observable<any[]> {
  //   return this.http.get<todoItem[]>("https://jsonplaceholder.typicode.com/todos");
  // }
}
