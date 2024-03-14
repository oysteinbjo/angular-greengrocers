import { Component } from '@angular/core';
import { GreengrocersService } from 'src/app/greengrocers.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent {
  total: number = 0;
  constructor(private service: GreengrocersService){}
  ngOnInit(): void {
    this.service.total.subscribe((newTotal) => {
      this.total = newTotal;
    });
  }
}
