import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderItensService {

  updateButtonHidden: boolean = true;
    indexUpdateDoctor!: number;
  
    orderItensList!: Array<any>;
    orderItens!: any;
  
    apiUrl: string = 'http://localhost:8080/orderitens';
  
    constructor(
      private http: HttpClient
    ) { }
  
  
    getAll(): Observable<any> {
  
      return this.http.get<any>(this.apiUrl);
    }
  
    getById(id: any): Observable<any> {
  
      return this.http.get<any>(this.apiUrl + '/' + id);
    }
  
    create(orderItens: any): Observable<any> {
  
      return this.http.post<any>(this.apiUrl, orderItens);
    }
  
    update(orderItens: any): Observable<any> {
  
      return this.http.put<any>(this.apiUrl + '/' + orderItens.id, orderItens);
    }
  
    delete(orderItens: any): Observable<any> {
  
      return this.http.delete<any>(this.apiUrl + '/' + orderItens.id);
    }

    getByOrderId(id: any): Observable<any> {
  
      return this.http.get<any>(this.apiUrl + '/findorder/' + id);
    }
}
