import { Component} from '@angular/core';
import { GreengrocersService } from 'src/app/greengrocers.service';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
    cart: Item[] = []
    constructor(private service: GreengrocersService){
      this.cart = this.service.cart
    }
    
}
