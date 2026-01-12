import { Component } from '@angular/core';
import { ProductListComponent } from '../../partials/product-list/product-list.component';
// import { CategoryListComponent } from '../../partials/category-list/category-list.component';
import {MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenavModule} from '@angular/material/sidenav';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { ProductCategory } from '../../../shared/models/ProductCategory';
import { Route, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../shared/models/Product';
import { ProductItemComponent } from "../../partials/product-item/product-item.component";
import { HeaderComponent } from '../../partials/header/header.component';

@Component({
  selector: 'app-achat',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatDrawerContainer, MatDrawerContent, MatDrawer,
    NgFor,
    // NgIf,
    RouterLink,
    ProductItemComponent,
    HeaderComponent
],
  templateUrl: './achat.component.html',
  styleUrl: './achat.component.css'
})
export class AchatComponent {
  categoryTout:boolean = true;
  categoryName:string ="Tout";
  categoryList:ProductCategory[]=[];
  sampleProductList:Product[]=[];
  productList: any[]=[];
  productAll:any[]=[];
  offreSpecialeList:Product[]=[];
  constructor(
    private categoryService:CategoryService,
    private router : Router,
    private productService:ProductService,
  ){
    
  }
  ngOnInit(){
    this.categoryList=this.categoryService.getAll();
    this.productService.getAll().subscribe(products=>{
      this.productAll = products;
      this.productList = this.productAll;
    });
    this.sampleProductList = this.productService.getSample()
    this.offreSpecialeList = this.productService.getOffreSpecial();
  }
  setCategory(category :string){
    this.categoryName = category;
    this.productList= this.productService.getByCat(category);
    this.categoryTout = false;

  }
  categoryAll(){
    this.categoryTout=true;
    this.productList = this.productAll;
  }

}
