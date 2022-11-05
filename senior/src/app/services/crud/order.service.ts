import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  updateButtonHidden: boolean = true;
  indexUpdateOrder!: number;

  orderList!: Array<any>;
  order!: any;

  apiUrl: string = 'http://localhost:8080/order';

  constructor(
    private http: HttpClient
  ) { }


  getAll(): Observable<any> {

    return this.http.get<any>(this.apiUrl);
  }

  getById(id: any): Observable<any> {

    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  create(order: any): Observable<any> {

    return this.http.post<any>(this.apiUrl, order);
  }

  update(order: any): Observable<any> {

    return this.http.put<any>(this.apiUrl + '/' + order.id, order);
  }

  delete(order: any): Observable<any> {

    return this.http.delete<any>(this.apiUrl + '/' + order.id);
  }
}
