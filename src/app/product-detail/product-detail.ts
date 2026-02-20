import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataItem } from '../data-item';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Cartservice } from '../cartsevice';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink],
  template: `

  <header class="header">
  <h1>titulo</h1> 
  <nav class="nav">
    <a routerLink="/">Home</a> |
    <a routerLink="/contact">Contact</a>
  </nav>
  </header>
  <section class="product-wrapper">
    <div class="content-button-a">
      <a routerLink="/" class="a-button">volver</a>
      <a routerLink="/carrito" class="a-button">Ver carrito</a>
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
      <span class="msg-added">
  Producto agregado
</span>
    }@else {}
        </div>
      </div>
      
    } @else {
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
