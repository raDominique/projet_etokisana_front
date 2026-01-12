import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { NgIf } from '@angular/common';
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";
import { HeaderComponent } from '../../partials/header/header.component';
import { CartService } from 'src/app/services/cart.service';
import { MatTabsModule } from '@angular/material/tabs';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DepotItemService } from 'src/app/services/depot-item.service';
import { DepotItem } from 'src/app/shared/models/DepotItem';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/shared/models/Sites';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    DefaultButtonComponent,
    HeaderComponent,
    MatTabsModule,
    MatIconModule,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{
  theProduct:any;
  productId!:string;
  productImage:any[]=[];
  currentuser : any;
  userAccess !: string ;
  imageDisplayed : string ="";
  currentStock ?: DepotItem[];
  userDepotList : any[] = [];
  depotItemData : any[] = [];
  constructor(
    private productService:ProductService,
    private cartService : CartService,
    private activatedRoute:ActivatedRoute,
    private router : Router,
    private userService : UserService,
    private notificationService : NotificationService,
    private depotItemService : DepotItemService,
    private siteService : SiteService,
  ){
    this.currentuser = this.userService.getUserFromLocalStorage();

    this.userService.getUserById(this.currentuser._id).subscribe(userAccess =>{
      this.userAccess = userAccess.userAccess;
      console.log(this.userAccess);
    })
    this.activatedRoute.params.subscribe(params=>{
      this.productId = params['id'];
      this.productService.getProductById(params['id']).subscribe(productDist =>{
        this.theProduct=productDist;
        this.productImage=productDist.productImage;
        this.imageDisplayed = this.productImage[0];
      })
    })
    this.siteService.getSiteByUserId(this.currentuser.userId).subscribe(allDepot =>{
      this.userDepotList = allDepot;
      console.log(this.userDepotList)
      this.userDepotList.forEach(site =>{
        this.depotItemService.getStock(this.productId,site._id).subscribe(depotItemSelected=>{
          let newDepotItemStock
          console.log(depotItemSelected);
          if (depotItemSelected) {
            newDepotItemStock = {
              site : site.siteName+ site.siteAddress,
              price : depotItemSelected.prix,
              stock : depotItemSelected.stock,
              total : depotItemSelected.prix * depotItemSelected.stock,
              depotItemId : depotItemSelected._id,
            }
          }else{
              newDepotItemStock = {
              site : site.siteName+ site.siteAddress,
              price : 0,
              stock : 0,
              depotItemId : 0,
            }
          }
          this.depotItemData.push(newDepotItemStock);
        })
      })
    })
  }

  ngOnInit(): void {
    
  }
  // addtoCart(productId:string){
  //   productId = this.productId;
  //   this.theProduct ={
  //     id: this.productId,
  //     productName:this.theProduct.productName,
  //     productDescription: this.theProduct.productDescription,
  //     productCategory: this.theProduct.productCategory,
  //     productState: this.theProduct.productState,
  //     productImage: this.theProduct.productImage,
  //     productValidation : this.theProduct.productValidation,
  //     productPoids : this.theProduct.productPoids,
  //     productVolume : this.theProduct.productVolume,
  //     productHauteur : this.theProduct.productHauteur,
  //     productLongueur : this.theProduct.productLongueur,
  //     productLargeur : this.theProduct.productLargeur,
  //   }
  //   this.cartService.addToCart(this.theProduct);
  //   this.router.navigateByUrl('/cart-page');
  // }
  stockerDansDepot(productId:string){
    this.router.navigateByUrl('/depot-sites/depot/'+this.currentuser.userId+"/"+productId)
  }

  back(){
    this.router.navigateByUrl('/user-products');
  }
  validateProduct(productId : string){
    const updateData = {
      productState : "Approuvé",
      productValidation : true}
    this.productService.updateProduct(productId, updateData).subscribe(result =>{
    })
    this.notificationService.openNotificationDialog(
      false,
      "Produit approuvé",
      "Le produit a été créé avec succès !",
      'products',
      false);
  }
  selectImage(image:string){
    this.imageDisplayed = image;
  }
  deleteDepotItem(depotItemId :string){
    this.depotItemService.deleteByProductId(depotItemId).subscribe(result=>{
      console.log(result);
    })

  }
  acheterDepot(productId:string){
    this.router.navigateByUrl('/depot-sites/achat/'+this.currentuser.userId+"/"+productId)
  }
}
