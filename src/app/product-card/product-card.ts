import { Component, inject, input, signal } from '@angular/core';
import {  Cartservice } from '../cartsevice';
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
     
    <button (click)="addtoCart($event)">
      Agregar al carrito
    </button>
    @if (added()) {
      <span class="msg-added">
  Producto agregado 
</span>
    }
  </div>

  `,
  styleUrl: './product-card.sass',
})
export class ProductCard {
  
  product = input.required<Product>()
  
  private CartService = inject(Cartservice)
  private router = inject(Router)
  added = signal(false);

  addtoCart(evento:Event){
    evento?.stopPropagation()
    const p = this.product() 
    

    this.CartService.addProduct(
      {id: p.id,
      title: p.title,
      price: p.price,
      img:p.image,
      quantity: 1}
    )
    this.added.set(true)
    setTimeout(()=> {
      this.added.set(false)},1000)


  }

  goToProduct() {
  const p = this.product();
  this.router.navigate(['/productos', p.id]);
  }


}
