import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  template: `
  <header class="header">
  <h1>{{title}}</h1>
  <nav class="nav">

    <a routerLink="/">Home</a> |
    <a routerLink="/about">Nosotro</a> |
    <a routerLink="/contact">Contacto</a>
    
  </nav>
</header>
  `,
  styleUrl: './navbar.sass',
})
export class Navbar {
  title = 'Tu rincon viajero'
}
