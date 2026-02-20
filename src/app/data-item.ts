import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image:string
  
}

@Injectable({
  providedIn: 'root',
})
export class DataItem {

  private readonly url = "productos.json"; // readonly porque no cambia

  
  constructor(private http: HttpClient) {}

  // Devuelve un Observable tipado
  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getData().pipe(
      map(products => products.find(p => p.id === id))
    );
  }
}
