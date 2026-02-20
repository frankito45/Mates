import { Component,  inject } from '@angular/core';
import { Cartservice } from '../cartsevice';

@Component({
  selector: 'app-car-component',
  imports: [],
  standalone: true,
  template: `

    <section class="carrito">

      <h2>Productos</h2>
      <table>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>precio</th>
          <th></th>
        </tr>
        @for(item of items(); track item.id) {
          <tr>
            <td> {{ item.title }}</td>
            <td> {{ item.quantity }}</td>
            <td> {{ item.price * item.quantity }} </td>
            <td> 
              <button (click)="remove(item.id)">Eliminar</button>
            </td>
          </tr>
          <br>
          <!--       
            <div>
              <div>
                <img [src]="item.img" alt="fdg">
              </div>
              <div>
                <p>{{ item.title }}</p>
                <p>Cantidad: {{ item.quantity}}</p>
                <p>Precio: {{ item.price * item.quantity }} </p>
                <button (click)="remove(item.id)">Eliminar</button>
              </div>
            </div> -->
          }
          
        </table>
        <h3 class="total">Total: {{ total() }}</h3>
        
      </section>
      <a [href]="sendWhatsApp()" target="_blank" class="whatsapp-btn">
        <svg xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="white">
        <path d="M12.04 2C6.58 2 2.1 6.48 2.1 11.94c0 1.9.5 3.76 1.46 5.39L2 22l4.82-1.53a9.9 9.9 0 0 0 5.22 1.44h.01c5.46 0 9.94-4.48 9.94-9.94S17.5 2 12.04 2zm0 18.07c-1.63 0-3.23-.44-4.62-1.27l-.33-.2-2.86.9.93-2.79-.21-.35a8.03 8.03 0 0 1-1.23-4.28c0-4.43 3.6-8.03 8.03-8.03 2.14 0 4.15.83 5.66 2.34a7.94 7.94 0 0 1 2.36 5.67c0 4.43-3.6 8.01-8.03 8.01zm4.41-6.01c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.4-1.33-1.64-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
        </svg>
        finalizar compra por WhatsApp
      </a>


  `,
  styleUrl: './car-component.sass',
})
export class CarComponent {

  private Cartservice = inject(Cartservice)
  items = this.Cartservice.cardItem;
  total = this.Cartservice.total;
  

  remove(id:number){
    this.Cartservice.removeProduct(id)
  }

  sendWhatsApp() {
    const items = this.items()
    if (this.items().length === 0 )return '#';
      
      const mensaje = items.map(item => `${item.title} x ${item.quantity} -  $${item.price * item.quantity}`).join('\n')
      const finalMensaje = `Hola, quiero hacer el siguiente pedido:\n ${mensaje} Total: $${this.total()}`;

      const encodedMessaje = encodeURIComponent(finalMensaje)
      const phoneNumber = '541171406331'
      
      return `https://wa.me/${phoneNumber}?text=${encodedMessaje}`;
    

}

}
