import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
  <footer class="footer">
    <p>&copy; {{anio}} {{nombreEmpresa}}</p>
  </footer>


  `,
  styleUrl: './footer.sass',
})
export class Footer {
  anio = new Date().getFullYear();
  nombreEmpresa = 'Tu rincon viajero';
}
