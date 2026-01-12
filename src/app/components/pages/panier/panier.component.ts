import { Component } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [MatDrawerContainer,MatDrawer,MatDrawerContent],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent {
  cartItemList:any[] = [];
  constructor(
    private cartService:CartService,
  ){
    this.cartService.getCart();
  }

}
