import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Add
import { Observable } from 'rxjs/Observable'; //Add

@Injectable()
export class NorthwindService {
  private baseUrl = 'http://northwind.servicestack.net/customers.json'; // API End Point

  constructor(private http: HttpClient) {
   }

   getCustomers(): Observable<any> {
    return this.http.get<any>(this.baseUrl)
    .map(res => {
      return res.Customers as any;
    });
     
   }
}