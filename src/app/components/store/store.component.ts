import { Component } from '@angular/core';
import { GreengrocersService } from 'src/app/greengrocers.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  constructor(private readonly greenGrocerService: GreengrocersService) { }
  items = this.greenGrocerService.getItems()
}
