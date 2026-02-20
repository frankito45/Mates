import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CarComponent } from './car-component/car-component';
import { ProductDetail } from './product-detail/product-detail';
export const routes: Routes = [

    {
        path: '',
       component: Home,
    },
    { path: 'productos/:id', component: ProductDetail },
    { path: 'carrito', component: CarComponent }


    
];
