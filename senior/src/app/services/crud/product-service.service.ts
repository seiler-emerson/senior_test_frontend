import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  updateButtonHidden: boolean = true;
  indexUpdateProductService!: number;

  productServiceList!: Array<any>;
  productService!: any;

  apiUrl: string = 'http://localhost:8080/productservice';

  constructor(
    private http: HttpClient
  ) { }


  getAll(): Observable<any> {

    return this.http.get<any>(this.apiUrl);
  }

  getById(id: any): Observable<any> {

    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  create(productService: any): Observable<any> {

    return this.http.post<any>(this.apiUrl, productService);
  }

  update(productService: any): Observable<any> {

    return this.http.put<any>(this.apiUrl + '/' + productService.id, productService);
  }

  delete(productService: any): Observable<any> {

    return this.http.delete<any>(this.apiUrl + '/' + productService.id);
  }
}
