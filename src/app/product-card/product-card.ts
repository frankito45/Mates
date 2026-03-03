import { Component, inject, input, signal } from '@angular/core';

import { Product } from '../data-item';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-card',
  imports: [],
  standalone:true,
  template: `
  
    
  <div class="item-Card" (click)="goToProduct()">
    <div class="content-img">
      <img [src]="product().image" alt="asdff">
    </div>
    <h2>{{ product().title }}</h2>
   
    
    <div class="item-content">
     <p>{{ product().description }}</p>
     
     <span>{{ product().price }}</span>
    </div>
     

  </div>

  `,
  styleUrl: './product-card.sass',
})
export class ProductCard {
  
  product = input.required<Product>()
  

  private router = inject(Router)
  added = signal(false);


  goToProduct() {
  const p = this.product();
  this.router.navigate(['/productos', p.id]);
  }


}
