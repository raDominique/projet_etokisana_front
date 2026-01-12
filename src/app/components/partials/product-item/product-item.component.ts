import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
  providers:[
    {provide:CurrencyPipe}
  ]
})
export class ProductItemComponent {
  @Input()  imageUrl: string = "default.jpg";
  @Input()  productName: string="";
  @Input()  productPrice: number=0;

  private currencyPipe = inject(CurrencyPipe);
  formatPrice(price: number, currency : string):string |null{
    return this.currencyPipe.transform(price,currency,'symbol-narrow');
  }
}
