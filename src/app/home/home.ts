import { Component, computed, inject, signal } from '@angular/core';
import { Card } from '../card/card';
import { DataItem,Product } from '../data-item';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from "../product-card/product-card";
import { RouterLink } from '@angular/router';
import { Navbar } from '../core/navbar/navbar';


@Component({
  selector: 'app-home',
  imports: [Card,ProductCard,RouterLink,Navbar],
  standalone: true,
  template: `

<app-navbar></app-navbar>
<Section class="hero">
  <div class="tex-hero">
    <h2>Explora nuestra colección de mates</h2>
    
    <button class="button-hero"  (click)="scrollToProductos()">Ver Productos</button>
  </div>
</Section>

<section class="catalogo">
  <div class="text-catalogo">
    <h1>Bienvenido a nuestra tienda de mates</h1>
    <p>Descubre una amplia variedad de mates artesanales y accesorios para disfrutar de tu bebida favorita.</p>
    
  </div>
  <div class="cards-container">
    <app-card title="Termos" description="" [imagen]='termos' ></app-card>
    <app-card title="Mates" description="Un mate hecho a mano de calidad superior." [imagen]='mates' ></app-card>
    <app-card title="Accesorios" description="" [imagen]='accesorios' ></app-card>
  </div>
</section>

<section class="catalogo-item" id="productos">
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
  

  

  @for (item of paginateItems() ; track item.id) {
    
    <app-product-card [product]="item"></app-product-card>

  }
  

  <div class="button-catalogo-conteiner">
    <button (click)="anterior()" class="button-catalogo">anterior</button>
    <button (click)="siguiente()" class="button-catalogo">siguiente</button>
  </div>
  
  </section>


    `,
  styleUrl: './home.sass',
})
export class Home {
  title = 'Tu rincon viajero'

  mates = 'https://i.pinimg.com/1200x/01/28/11/0128117b26aa7096f06a227fa74bcf1b.jpg';
  termos = 'https://i.pinimg.com/736x/8e/8e/52/8e8e52160dc27e3ca8eb7159aaddd2af.jpg';
  accesorios = 'https://i.pinimg.com/1200x/b0/f2/14/b0f214d5e7e4cb9f8b0bd786f82689d4.jpg';
  
  private productosService = inject(DataItem)
  items = toSignal(
    this.productosService.getData(),
     { initialValue: [] as Product[] }
  )

  // scrolling
  
scrollToProductos() {
  
  const section = document.getElementById('productos');

  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
  

  currentPage = signal(1)
  pageSize = 5

  // paginacoin de items

  paginateItems = computed(() => {
    const start = (this.currentPage()- 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.items().slice(start,end)
  })

  // boton siguiente
  siguiente(){
    const totalPage = Math.ceil(this.items().length / this.pageSize)
    if (this.currentPage() < totalPage ){
      this.currentPage.update(p => p + 1)
    }
  }

  anterior(){
    if(this.currentPage() > 1){
      this.currentPage.update(p => p -1)
    }
  }

}
