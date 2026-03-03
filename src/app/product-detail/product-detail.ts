import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataItem } from '../data-item';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Cartservice } from '../cartsevice';
import { Navbar } from '../core/navbar/navbar';


@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink, Navbar],
  template: `

  <app-navbar></app-navbar>
  <section class="product-wrapper">
    <div class="content-button-a">
      <a routerLink="/" class="a-button">volver</a>
      <a routerLink="/carrito" class="a-button">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45c-.16.29-.25.63-.25.96 
        0 1.1.9 2 2 2h9v-2h-9l1.1-2h7.45c.75 
        0 1.41-.41 1.75-1.03l3.58-6.49a1 1 0 0 
        0-.87-1.48h-14.21l-.94-2zm3 16a2 2 0 1 
        0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 
        0 0 4 2 2 0 0 0 0-4z"/>
      </svg>
  </a>
    </div>
    @if (product(); as p) {
      <div class="card-detail">
        
        <div class="img-container">
          <img [src]="p.image" [alt]="p.title">
        </div>
        <div class="detail-container">
          <h1>{{ p.title }}</h1>
          
          <div class="details">
            <p class="details-p">{{ p.description }}</p>
            <h2>\${{ p.price }}</h2>
          </div>
          
          <button (click)="addtoCart()" class="button-buy">
            Agregar al carrito
          </button>

          @if (added()) {
          <span class="msg-added">Producto agregado</span>
          }
        </div>
      </div>
      
    } 
    @else {
      <p>Cargando producto...</p>
    }
  </section>

  
  `,
  styleUrl: './product-detail.sass',
})
export class ProductDetail {

  private route = inject(ActivatedRoute);
  private dataService = inject(DataItem)
  private CartService = inject(Cartservice)
  added = signal(false)

    product = toSignal(
    this.route.paramMap.pipe(
      switchMap(params =>
        this.dataService.getProductById(Number(params.get('id')))
      )
    )
  );

  addtoCart(){
    
    const p = this.product() 
    if (!p) return;

    this.CartService.addProduct(
      {id: p.id,
      title: p.title,
      price: p.price,
      img:p.image,
      quantity: 1}
    )
    this.added.set(true);
    
    setTimeout(()=>{
      this.added.set(false)
    },1000)
  

  }



}
