import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Item } from './models/item';


@Injectable({
  providedIn: 'root'
})
export class GreengrocersService {
  constructor() { }
  http = inject(HttpClient);
  items: Promise<Item[]> = Promise.resolve(this.getItems());
  cart: Item[] = [];

  private totalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  public total: Observable<number>= this.totalSubject.asObservable()

  async getItems() {
    const fruits = firstValueFrom(this.http.get<Item[]>(`${environment.apiUrl}groceries?type=fruit`))
    const veg = firstValueFrom(this.http.get<Item[]>(`${environment.apiUrl}groceries?type=vegetable`))
    const result = firstValueFrom(this.http.get<Item[]>(`${environment.apiUrl}groceries`))
    return result
  }

  updateTotal(value: number) {
    this.totalSubject.next(value)
  }
  addToCart(item: Item) {
    this.cart.push(item)
    this.calculateTotal()
  }

  calculateTotal(): void{
    let newTotal: number = 0.0;
    this.cart.forEach((item) => {
      newTotal += item.price
    })
    this.updateTotal(newTotal)
  }
}
