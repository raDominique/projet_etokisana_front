import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/shared/models/Product';
import { DepotItemService } from 'src/app/services/depot-item.service';
import { DepotItem } from 'src/app/shared/models/DepotItem';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-my-products',
  imports: [
    NgIf,
    RouterLink,
    MatIconModule,
    MatTableModule,
    HeaderComponent
  ],
  standalone:true,
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css',
})
export class MyProductsComponent implements OnInit{
  displayedColumns: string[] = [
    'Thumbnail',
    'Nom', 
    'Description',
    'Quantite',
    'Depot',
    'Action'
  ];
    userDepotItem : DepotItem[] = [];
    dataSource : any[] = [];
    currentUserEmail!:string ;
    OwnerId!:string
  
  
    constructor(
      private productService:ProductService,
      private depotItemService : DepotItemService,
      private siteService : SiteService,
      private userService :UserService,
      private router:Router,
    ){

      let productData;

      this.currentUserEmail =this.userService.getUserFromLocalStorage().userEmail;
      this.userService.getUserByEmail(this.currentUserEmail).subscribe((userServer:any) =>{
        this.OwnerId = userServer.userId;
        this.depotItemService.getDepotItemByOwnerId(this.OwnerId).subscribe(myProducts=>{
          this.dataSource = myProducts;
        })
      })
      
    }
    ngOnInit(){
      console.log("this is le datasource :" + this.dataSource)
    }
    deleteProduct(productId:string){
      this.productService.deleteProduct(productId).subscribe(_=>{
        alert("Produit retirer avec succés !")
        this.router.navigateByUrl('user-products')
      });
    }
    ajouterPrix(id : string){
      this.router.navigateByUrl('user-products/update/'+id)
    }
    deposerProduit(productId : string){
      this.router.navigateByUrl('choix-site/depot/'+this.OwnerId+"/"+productId)
    }
    voirProduit(productId : string){
      this.router.navigateByUrl('/product-page/'+productId)
    }
    stockerProduit(productId : string){
      this.router.navigateByUrl('/choix-site/depot/'+this.OwnerId+"/"+productId)
    }
    retirerProduit(id : string){
      this.router.navigateByUrl('choix-site/retrait')
    }
    voirStock(productId:string){
  
    }
}
