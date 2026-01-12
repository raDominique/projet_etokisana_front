import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../../services/product.service';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../partials/header/header.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-products',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    MatIconModule,
    MatTableModule,
    HeaderComponent,
  ],
  templateUrl: 'user-products.component.html',
  styleUrl: 'user-products.component.css'
})
export class UserProductsComponent implements OnInit{
  displayedColumns: string[] = ['Thumbnail','Nom', 'Description','Statut','Poids','Volume','Largeur','Longueur','Hauteur','Action'];
  dataSource : Product[] = [];
  currentUserEmail!:string ;
  OwnerId!:string


  constructor(
    private productService:ProductService,
    private userService :UserService,
    private router:Router,
  ){
    this.currentUserEmail =this.userService.getUserFromLocalStorage().userEmail;
    this.userService.getUserByEmail(this.currentUserEmail).subscribe((userServer:any) =>{
      this.OwnerId = userServer.userId;
      this.productService.getProductByOwner(this.OwnerId).subscribe(productFromServer=>{
        this.dataSource = productFromServer;
      })
      
    })
  }
  ngOnInit(){
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
  deposerProduit(id : string){
    this.router.navigateByUrl('choix-site/depot')
  }
  voirProduit(productId : string){
    this.router.navigateByUrl('/product-page/'+productId)
  }
  stockerProduit(productId : string){
    this.router.navigateByUrl('/choix-site/depot/'+this.OwnerId)
  }
  retirerProduit(id : string){
    this.router.navigateByUrl('choix-site/retrait')
  }
  voirStock(productId:string){

  }
}
