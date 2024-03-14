import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reduce, firstValueFrom, merge } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Item } from './models/item';


@Injectable({
  providedIn: 'root'
})
export class GreengrocersService {
  constructor() { }
  http = inject(HttpClient)
  items: Promise<Item[]> = Promise.resolve(this.getItems())
  cart: Item[] = []

  async getItems() {
    const fruits = firstValueFrom(this.http.get<Item[]>(`${environment.apiUrl}groceries?type=fruit`))
    const veg = firstValueFrom(this.http.get<Item[]>(`${environment.apiUrl}groceries?type=vegetable`))
    const result = firstValueFrom(this.http.get<Item[]>(`${environment.apiUrl}groceries`))
    return result
  }

  addToCart(item: Item) {
    this.cart.push(item)
  }
}
