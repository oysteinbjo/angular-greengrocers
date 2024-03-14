import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Item } from './models/item';

@Injectable({
  providedIn: 'root'
})
export class GreengrocersService {
  constructor() { }
  http = inject(HttpClient)
  items: Promise<Item[]> = Promise.resolve(this.getItems())

  async getItems() {
    const result = firstValueFrom(this.http.get<Item[]>(`${environment.apiUrl}groceries?type=fruit`))
    return result
  }
}
