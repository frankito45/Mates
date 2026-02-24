import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-card',
  imports: [RouterLink],
  template: `
  

    <div class="card">
      @if(imagen()) {
        <img [src]="imagen()" alt="Imagen del producto">
      }
      <div class="card-content">
        <h3 class="title_card">{{title()}}</h3>
        @if(description()) {
          <p>{{description()}}</p>
        }
      </div>
      @if(link()) {
        <a class="a-card" [routerLink]="link()">Ver más</a>
      }
      
    </div>
  `,
  styleUrl: './card.sass',
})
export class Card {
  
  title = input.required<string>();
  description = input<string | null>(null);
  imagen = input<string | null>(null);
  categoria = input<string | null >(null);
  id = input<number | null>(null);
  link = input<string[] | null>(null);


}
