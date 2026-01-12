import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { NgFor } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor,ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  productList:Product[] = []

  @Input()  state:string="";
  @Input() category!:string
  @Output() categoryChange = new EventEmitter<string>();
  


  constructor(
    private productService : ProductService
  ){
    
  }
  ngOnInit(): void {
    if (this.state == "") {
      this.productService.getAll().subscribe(products=>{
        this.productList = products
      })
    }
    if (this.state == "Offre speciale" && this.category=="") {
      this.productList = this.productService.getOffreSpecial()
    }
    if (this.category !="") {
      this.productList = this.productService.getByCat(this.category)
    }
    if(this.category == ""){
      this.productService.getAll().subscribe(products=>{
        this.productList = products
      });
    }
  }
  CatSelection(selectedCat:string){
    this.categoryChange.emit(this.category);
  }
}
