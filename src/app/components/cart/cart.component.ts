import { Component} from '@angular/core';
import { GreengrocersService } from 'src/app/greengrocers.service';
import { CartItem, Item } from 'src/app/models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
    cart: CartItem[] = []
    constructor(private service: GreengrocersService){
      this.cart = this.service.cart
    }
    addItem(item:Item) {
      this.service.addToCart(item)
    }

    removeItem(item:Item){
      this.service.removeFromCart(item)
    }
    
}
