import { computed, Injectable, signal } from '@angular/core';


export interface CartItem{
  id:number;
  title:string;
  price:number;
  quantity:number;
  img:string
}


@Injectable({
  providedIn: 'root',
})
export class Cartservice {
  
  private card = signal<CartItem[]>([])
  constructor() {
  console.log('Cartservice creado');
}


  cardItem = this.card.asReadonly();

  total = computed(
    () => this.card().reduce((acc,item) => acc +item.price * item.quantity,0)
  )

  addProduct(product:CartItem){
    this.card.update(item => {

      const existing = item.find( i => i.id == product.id);

      if(existing){
        return item.map(i => i.id === product.id
          ? {...i, quantity: i.quantity + product.quantity}
          : i
        );
      }

      
      return [...item,product]

    });

  }

  removeProduct(id:number) {
    this.card.update(
      item => item.filter(i => i.id !== id)
    );

  }
  

  

}

