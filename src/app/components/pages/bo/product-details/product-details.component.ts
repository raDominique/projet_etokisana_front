import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultButtonComponent } from 'src/app/components/partials/default-button/default-button.component';
import { HeaderComponent } from 'src/app/components/partials/header/header.component';
import { NotificationDialogComponent } from 'src/app/components/partials/notification-dialog/notification-dialog.component';
import { CartService } from 'src/app/services/cart.service';
import { DepotItemService } from 'src/app/services/depot-item.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { SiteService } from 'src/app/services/site.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    HeaderComponent,
    MatTabsModule,
    DefaultButtonComponent,
    MatDialogModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  dialog = inject(MatDialog)
  imageDisplayed: string = "";
  theProduct:any;
  productId!:string;
  productImage:any[]=[];
  depotItemId : string  = "";
  theDepotItem : any;
  depotInfos:any;
  ownerUser : any ;
  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private router : Router,
    private depotItemService : DepotItemService,
    private notificationService : NotificationService,
    private siteService:SiteService,
    private cartService : CartService,
    private userService : UserService,
  ){
    this.ownerUser = this.userService.getUserFromLocalStorage();
    this.activatedRoute.params.subscribe(params=>{
      this.productId = params['id'];
      this.depotItemId = params['depotItemId'];
      this.productService.getProductById(params['id']).subscribe(productDist =>{
        this.theProduct=productDist;
        this.productImage=productDist.productImage;
        this.imageDisplayed = this.productImage[0];
      })
      this.depotItemService.getById(this.depotItemId).subscribe(theDepotItem=>{
        if (theDepotItem) {
          this.theDepotItem = theDepotItem;
          this.siteService.getSiteById(this.theDepotItem.currentDepotId).subscribe(siteInfos=>{
            this.depotInfos = siteInfos;
          })
        }
      })
      
    })
  }

  ngOnInit(): void {
    
  }
  validateProduct(productId : string){
    this.productService.updateProduct(productId,{productValidation:true,productState:"Approuvé"}).subscribe(_=>{

    })
    const NotifValidateProduct={
      userId: this.ownerUser.userId,
      title : "Produit validé",
      message : "Produit ajouter au système, vous pouver le stocker et le valoriser",
      state : "new",
    }
    this.notificationService.addNotification(NotifValidateProduct).subscribe(result=>{
      console.log(result);
    })
    this.notificationService.openNotificationDialog(
      false,
      "Produit approuvé !",
      "Le produit a été approuvé et sera disponible pour échange sur la plateforme",
      'products',
      false)
  }
  addToCart(depotItemId: string){
    console.log('clicked');
    this.cartService.addToCart(depotItemId);
    this.notificationService.openNotificationDialog(
      false,
      "Produit ajouté au panier",
      "Ce produit a été ajouté à votre panier.",
      "home",
      false
    )
  }
  selectImage(image:string){
    this.imageDisplayed = image;
  }
}
