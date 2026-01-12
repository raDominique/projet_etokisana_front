import { Component } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { NgFor } from '@angular/common';
import { Site } from 'src/app/shared/models/Sites';
import { SiteService } from 'src/app/services/site.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/Product';
import { StockElement } from 'src/app/shared/models/StockElement';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    HeaderComponent,
    NgFor,
  ],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  stockelements:StockElement[] = [];
  productInStock : any[] = [];
  depotId !: string;
  theSite !: Site;

  constructor(
    private productService : ProductService,
    private activatedRoute : ActivatedRoute,
    private siteService : SiteService,
  ){
    this.activatedRoute.params.subscribe(params=>{
      this.depotId = params['id'];
      this.siteService.getSiteById(this.depotId).subscribe(theSite =>{
        this.theSite = theSite;
      })
      console.log(this.depotId)
    })
    this.productService.getStockElementBySite(this.depotId).subscribe(productList=>{
      this.stockelements = productList
      this.stockelements.forEach(element =>{
        this.productService.getProductById(element.productId).subscribe(product=>{
          this.productInStock.push(product);
        })
      })
      console.log(this.stockelements);
    })



  }
}
