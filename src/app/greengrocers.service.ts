import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CartItem, Item } from './models/item';


@Injectable({
  providedIn: 'root'
})
export class GreengrocersService {
  constructor() { }
  http = inject(HttpClient);
  items: Promise<Item[]> = Promise.resolve(this.getItems());
  cart: CartItem[] = [];

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
    const index = this.cart.findIndex((i) => i.id === item.id)
    if(index === -1){
      const newItem: CartItem = {
        id:item.id,
        name: item.name,
        price: item.price,
        amount:1,
      }
      this.cart.push(newItem)
    }else {
      this.cart[index].amount++;
    }
    console.log(this.cart)
    this.calculateTotal()
  }

  calculateTotal(): void{
    let newTotal: number = 0.0;
    this.cart.forEach((item) => {
      newTotal += item.price * item.amount
    })
    this.updateTotal(newTotal)
  }

  removeFromCart(item: Item):void{
    const foundItem = this.cart.findIndex(i => i.id ===item.id)
    if(this.cart[foundItem].amount === 1){
      this.cart.splice(foundItem,1)
    }else{
      this.cart[foundItem].amount--
    }
    this.calculateTotal()
  }
}
