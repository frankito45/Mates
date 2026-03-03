import { Component, inject, input, signal } from '@angular/core';

import { Product } from '../data-item';
import { Router } from '@angular/router';

import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [NgOptimizedImage],
  standalone:true,
  template: `
  
    
  <div class="item-Card" (click)="goToProduct()">
    <div class="content-img">
    <img
    ngSrc="{{ product().image }}"
    width="300"
    height="300"
    [alt]="product().title"
    />
      
    </div>
    <h2>{{ product().title }}</h2>
   
    
    <div class="item-content">
     <p>{{ product().description }}</p>
     
     <span>$ {{ product().price }}</span>
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
