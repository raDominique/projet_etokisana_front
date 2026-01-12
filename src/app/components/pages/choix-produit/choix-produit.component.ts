import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';
import { AsyncPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Product } from 'src/app/shared/models/Product';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { TextInputComponent } from "../../partials/text-input/text-input.component";
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/shared/models/Sites';
import { DepotItem } from 'src/app/shared/models/DepotItem';
import { MatTabsModule } from '@angular/material/tabs';
import { DepotItemService } from 'src/app/services/depot-item.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-choix-produit',
  standalone: true,
  imports: [
    HeaderComponent,
    NgFor,
    NgIf,
    // NgModel,
    FormsModule,
    ReactiveFormsModule,
    DefaultButtonComponent,
    // TextInputComponent,
    UpperCasePipe,
    RouterLink,
    MatTabsModule,
],
  templateUrl: './choix-produit.component.html',
  styleUrl: './choix-produit.component.css'
})
export class ChoixProduitComponent implements OnInit {
  subscriptions : Subscription[] = []
  productList:any;
  depotId !: string;
  typeES !: string;
  isEmpty :boolean = true;
  produitsAdeposer : any[] = [];
  montantTotal : number = 0;
  articles : Product[]=[]
  currentUser : any ;
  currentSite !:Site;
  theProduct : any;
  theProductId : string = "";
  siteOwner !:any;
  returnUrl !: string;
  depotItemStock : any[] = [];
  currentItemStock : any;
  addDepot : boolean = false;
  cartItemsHolder : any[]=[];
  imageDisplayed : string = "";
  itemToStock : any;


  constructor(
    private router:Router,
    private userService : UserService,
    private siteService : SiteService,
    private activatedRoute : ActivatedRoute,
    private productService : ProductService,
    private transactionService : TransactionService,
    private depotItemService : DepotItemService,
    private notificationService : NotificationService,
    private cartService : CartService,
  ){
    
  }

  ngOnInit(): void {
    const currentItemToStock = {
      stockItem : this.theProductId,
      quantity : 0,
      price : 0,
    }
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || 'home';
    this.currentUser = this.userService.getUserFromLocalStorage();
    this.productService.getAll().subscribe(productAll =>{
      this. productList = productAll.filter(filteredProduct => filteredProduct.productValidation == true);
      this.articles = productAll.filter(filteredProduct => filteredProduct.productValidation == true);
    });
    
    this.activatedRoute.params.subscribe(params =>{
      this.depotId=params['id'];
      this.typeES= params['typeES'];
      this.theProductId = params['productId'];
      if (this.theProductId) {
        // const newCartItem:CartItem={
        //   depotItem:this.theProduct,
        //   quantity:this.theProduct.quantity,
        //   price:this.theProduct.price,
        //   montant: this.theProduct.price * this.theProduct.quantity,
        // }
        this.cartItemsHolder=[];
        this.depotItemService.getAllByProductId(this.theProductId).subscribe(currentItemStock=>{
          console.log(currentItemStock);
          if (currentItemStock) {
            this.currentItemStock = currentItemStock;
            this.addDepot = true; 
            this.addToCart(this.currentItemStock._id);
            console.log(this.currentItemStock)
          }else{
            this.currentItemStock = 0;
          }
        })
      }
      this.productService.getProductById(this.theProductId).subscribe(theProduct=>{
        this.theProduct=theProduct;
        this.imageDisplayed = this.theProduct.productImage[0];
      })
      this.siteService.getSiteById(this.depotId).subscribe(currentSite =>{
        this.currentSite = currentSite;
        this.userService.getUserByUserId(this.currentSite.siteUserID).subscribe(result=>{
          this.siteOwner = result;
        })
      })
    })
  }

  choixProduit(productId : string){
    this.isEmpty=false;
    this.productService.getProductById(productId).subscribe(product=>{
      this.produitsAdeposer.push(product)
      // this.productService.addDepotItem(product)
    })
    // this.router.navigateByUrl("/"+this.typeES+"/"+this.depotId+"/"+productId)
  }
  RemoveProduct(productId : string){
    const removedProductIndex = this.produitsAdeposer.findIndex(product => product._id === productId);
    this.produitsAdeposer.splice(removedProductIndex,1);
  }
  NouveauProduit(){
    this.router.navigateByUrl("/user-products/add")
  }
  FaireDepot(){
    this.produitsAdeposer.forEach(productAdeposer =>{
      const stockelement = {
        productId : productAdeposer._id,
        depotId : this.depotId,
        price : productAdeposer.price,
        quantite : productAdeposer.quantite
      }
      // this.productService.depositProduct(stockelement).subscribe(_=>{
      //   console.log(stockelement)
      // })
    })
  }

  // from gescom
  // subscription : Subscription[] = []
  cartItems: CartItem[] = [];
  emptyHolderId: number = 0;
  defaultRowCount : number = 12;
  // cartItemsHolder: CartItem[] = [
  //   {
  //     CartItemProduct:new Product(),
  //     CartItemQuantity:0,
  //     CartItemPrice:0,
  //     CartItemMontant : 0,
  //   },
  //   {
  //     CartItemProduct:new Product(),
  //     CartItemQuantity:0,
  //     CartItemPrice:0,
  //     CartItemMontant : 0,
  //   },
  //   {
  //     CartItemProduct:new Product(),
  //     CartItemQuantity:0,
  //     CartItemPrice:0,
  //     CartItemMontant : 0,
  //   },
  //   {
  //     CartItemProduct:new Product(),
  //     CartItemQuantity:0,
  //     CartItemPrice:0,
  //     CartItemMontant : 0,
  //   },
  //   {
  //     CartItemProduct:new Product(),
  //     CartItemQuantity:0,
  //     CartItemPrice:0,
  //     CartItemMontant : 0,
  //   },
  //   {
  //     CartItemProduct:new Product(),
  //     CartItemQuantity:0,
  //     CartItemPrice:0,
  //     CartItemMontant : 0,
  //   },
  //   {
  //     CartItemProduct:new Product(),
  //     CartItemQuantity:0,
  //     CartItemPrice:0,
  //     CartItemMontant : 0,
  //   },
  //   {
  //     CartItemProduct:new Product(),
  //     CartItemQuantity:0,
  //     CartItemPrice:0,
  //     CartItemMontant : 0,
  //   },
  //   {
  //     CartItemProduct:new Product(),
  //     CartItemQuantity:0,
  //     CartItemPrice:0,
  //     CartItemMontant : 0,
  //   },
  //   {
  //     CartItemProduct:new Product(),
  //     CartItemQuantity:0,
  //     CartItemPrice:0,
  //     CartItemMontant : 0,
  //   },
  //   {
  //     CartItemProduct:new Product(),
  //     CartItemQuantity:0,
  //     CartItemPrice:0,
  //     CartItemMontant : 0,
  //   },
  //   {
  //     CartItemProduct:new Product(),
  //     CartItemQuantity:0,
  //     CartItemPrice:0,
  //     CartItemMontant : 0,
  //   }
  // ];
  // familles: Familleproduct[] = [];
  famille: string = 'Catégories';
  CartItemPriceTotal:number = 0;
  isCartEmpty:boolean = true;
  // cart:Cart = new Cart();
  // pointDeVente !: IPointDeVente;
  // factureVenteDetails : FactureVenteDetails[] = [];
  numeroFactureVente !:string;
  isLoged : boolean = true; 
  // cartLength : number = 0
  
  searchTerm: string ='';
  codeClient: string = '';
  nameClient: string = '';

  isDetail:boolean = false;

  showSuggestions:boolean = true;

  selectImage(image:string){
    this.imageDisplayed = image;
  }

  GetIsEmpty(isEmpty : boolean){
    this.showSuggestions = isEmpty;
  }

  addToCart(depotItemId:string){
    this.cartService.addToCart(depotItemId);
  }

  /** */
  // plus tard recherche
  // GetSearchTerm(searchTerm : string){
  //   this.searchTerm = searchTerm;
  //   let productObeservable = this.productService.getAllproductsBySearchTerm(this.searchTerm);
  //   productObeservable.subscribe((searchedproduct)=>{
  //     this.products = searchedproduct;
  //   })
  // }

  // applyFamille(familleproduct:string){
  //   this.subscription.push(this.productService.getproductByFamille(familleproduct).subscribe((serverproduct)=>{
  //     this.products = serverproduct;
  //     this.famille = familleproduct;
  //     console.log(familleproduct)
  //   }));
  // }

  // addToCart(reference:string){
  //   this.isCartEmpty = false;
  //   let productFromServer : Product;
  //   const productObservable = this.productService.getProductById(reference);
  //   this.subscriptions.push(productObservable.subscribe((serverproduct)=>{
  //     productFromServer = serverproduct ;
  //     this.removeEmpty();
  //       const itemToAdd : CartItem = {
  //         depotItem : productFromServer._id??,
  //         quantity : 1,
  //         price : 0,
  //         montant : 0,
  //       }
  //     this.cartItems.unshift(itemToAdd);
  //     if (this.CartItemPriceTotal === 0) {
        // this.CartItemPriceTotal = productFromServer.;
      // }else{
        // this.CartItemPriceTotal = this.CartItemPriceTotal + productFromServer.prixUnitaireVenteTTC;
    //   }
    // }))
    // this.cartLength++
  // }

  removeFromCart(productByRef:string){
    if (this.cartItems.length == 0) {
      console.log(this.cartItems.length)
      this.isCartEmpty = true;
    }
    const itemIndex = this.cartItems.findIndex(items => items.depotItem._id === productByRef);
    const item = this.cartItems.find(items => items.depotItem._id === productByRef);
    if (item) {
      const newCartItemPriceTotal = this.CartItemPriceTotal - item.price;
      this.CartItemPriceTotal = newCartItemPriceTotal;
    }
    this.cartItems.splice(itemIndex,1);
    // this.cartLength--
  }

  changeCartItemQuantity(item:CartItem , CartItemQuantity:number){
    if (!item) return;

    item.quantity = CartItemQuantity;
    // console.log(item.prod.prixUnitaireVenteTTC)
    // item.CartItemPrice = item.CartItemProduct.prixUnitaireVenteTTC * CartItemQuantity;
    // item.montant = CartItemQuantity * item.price;
    this.calculTotal();
  }
  changeCartItemPrice(item:CartItem , CartItemPrice:number){
    if (!item) return;

    item.price = CartItemPrice;
    // item.montant = CartItemPrice * item.CartItemQuantity;
    // console.log(item.CartItemMontant)

    this.calculTotal();
  }

  qtUp(item:CartItem,itemQte:number,currentCartItemPriceTotal:number){
    // const newQt = itemQte+1;
    // const newCartItemPriceTotal = currentCartItemPriceTotal + item.CartItemProduct.prixUnitaireVenteTTC;
    // this.changeCartItemQuantity(item,newQt);
  }

  qtDown(item:CartItem ,itemQte:number,currentCartItemPriceTotal:number){
    // if (itemQte > 1) {
    //   const newQt = itemQte-1;
    //   const newCartItemPriceTotal  = currentCartItemPriceTotal-item.CartItemProduct.prixUnitaireVenteTTC;
    //   this.changeCartItemQuantity(item,newQt);
    // }
  }

  // removeEmpty(){
  //     this.cartItemsHolder.splice(this.emptyHolderId,1);
  //     if (this.cartItemsHolder.length > 0) {
  //       this.emptyHolderId--;
  //     }
  // }

  resetCart(){
    // this.isCartEmpty = true;
    // if (this.cartItems.length > 12) {
    //   for (let index = 0; index < this.defaultRowCount; index++) {
    //     const emptyItem = {
    //         CartItemProduct:new Product(),
    //         CartItemQuantity:0,
    //         CartItemPrice:0,
    //         CartItemMontant : 0,
    //       }
    //     this.cartItemsHolder.push(emptyItem)
    //   }
    // }else{
    //   for (let index = 0; index < this.cartItems.length; index++) {
    //     const emptyItem = {
    //       CartItemProduct:new Product(),
    //       CartItemQuantity:0,
    //       CartItemPrice:0,
    //       CartItemMontant : 0,
    //     }
    //     this.cartItemsHolder.push(emptyItem)
    //   }
    // }
    this.cartItems = [];
    this.CartItemPriceTotal = 0;
    this.montantTotal = 0;
  }

  

  insertQty(item : CartItem, itemCartItemQuantity : string){
    const intItemCartItemQuantity = parseInt(itemCartItemQuantity);
    // console.log(itemCartItemQuantity)
    // let newCartItemPrice
    
    // newCartItemPrice = item.depotItem.price  * intItemCartItemQuantity;
    this.changeCartItemQuantity(item,intItemCartItemQuantity);
  }
  insertPrice(item : CartItem, itemCartItemPrice : string){
    const intItemCartItemPrice = parseInt(itemCartItemPrice);
    // console.log(intItemCartItemPrice)
    this.changeCartItemPrice(item,intItemCartItemPrice);
    this.calculTotal();
  }

  calculTotal(){
    let total : number = 0;
    this.cartItems.forEach(item =>{
      total += item.montant
    })
    this.montantTotal = total;
  }

  // ngOnDestroy(){
  //   this.subscription.forEach(subscription => subscription.unsubscribe());
  // }
submit(){
    /** à remetter */
    // let transactionData={
    //   userId : this.currentUser._id,
    //   siteDepartId : "",
    //   siteArriveId : this.depotId,
    //   typeES:"Entrée",
    //   montantTotal : this.montantTotal,
    //   statut:"En cours",
    //   productList:this.cartItems,

    // }
    // this.transactionService.addTransaction(transactionData).subscribe(_ =>{

    // })
    // let addBalance = {
    //   userTotalSolde : this.montantTotal,
    // }
    // this.userService.update(addBalance,this.siteOwner._id).subscribe(_=>{
      // alert("Dépot réussi!");
    // })
    // if (this.theProductId) {
    //   let depotItempData:DepotItem = {
    //     productId : this.theProductId,
    //     stock: this.cartItems[0].CartItemQuantity,
    //     prix   : this.cartItems[0].CartItemPrice,
    //     lastUpdate : new Date(),
    //     currentDepotId : this.depotId,
    //   }
    //   this.productService.getDepotItemByProductId(this.theProductId).subscribe(depotItemStock=>{
    //     console.log(depotItemStock)
    //     // console.log(depotItemStock[0].stock + this.cartItems[0].CartItemQuantity)
    //   })
    //   if (this.depotItemStock[0].currentDepotId == this.depotId && depotItempData._id) {
    //     console.log(this.depotItemStock[0].stock + this.depotItemStock[0].CartItemQuantity)
    //     // this.productService.modifyDepotItem({stock : element.stock + depotItem.CartItemQuantity},element._id).subscribe(_=>{
    //     // })
    //   }else{
    //     // this.productService.addDepotItem(depotItempData).subscribe(_=>{
    //     //   console.log("Produit Stocker !")
    //     // this.productService.updateProduct(depotItem.CartItemProduct._id,{isStocker:true}).subscribe(_=>{})
    //     // })
    //   }
    // }else{
      this.cartItems.forEach(cartItem=>{
        let depotItempData:DepotItem = {
          productId : cartItem.depotItem.productId,
          stock: cartItem.quantity,
          prix   : cartItem.price,
          lastUpdate : new Date(),
          currentDepotId : this.depotId,
        }
        this.depotItemService.getAllByProductId(depotItempData.productId).subscribe(depotItemsByProductId =>{
          this.depotItemStock = depotItemsByProductId;
          if (this.depotItemStock.length>0) {
            this.depotItemStock.forEach(element=>{
            if (element.currentDepotId == depotItempData.currentDepotId) {
              this.depotItemService.update({stock : element.stock + depotItempData.stock},element._id).subscribe(_=>{
                alert("Dépôt réussi !!")
                this.router.navigateByUrl('user-products');
              })
            }
          })
          }else{
            this.depotItemService.add(depotItempData).subscribe(_=>{
              console.log("Produit Stocker !")
            this.productService.updateProduct(depotItempData.productId,{isStocker:true}).subscribe(_=>{
              this.router.navigateByUrl('user-products');
            })
            // Ajouter popup pour revenir à la liste de produit
            this.notificationService.openNotificationDialog(
              false,
              "Produit Stocké",
              "Produit stocké avec succès",
              'user-products',
              false
            )
            })
          }
          
        })
      }) 
    // }
    // this.numeroFactureVente = this.pointDeVente.prefixeVente + "000" + this.pointDeVente.numeroVente;
    // this.cartItems.forEach(cartItem => {
    //   let newFactureVenteDetails = {
    //     cartItem            : cartItem,
    //     prixVenteTTC        : cartItem.CartItemProduct.prixUnitaireVenteTTC,
    //     remise              : 0,
    //     CartItemPriceNetTTC       : cartItem.CartItemPrice,
    //     factureVenteNumDoc  : this.numeroFactureVente
    //   }
      // this.subscription.push(this.venteService.addFactureVenteDetails(newFactureVenteDetails).subscribe(_ => {}));
    // const newMouvementStock ={
    //   date                : new Date(),
    //   product             : cartItem.CartItemProduct,
    //   typeDocument         : "Vente",
    //   sousTypeDocument    : "",
    //   quantite            : cartItem.CartItemCartItemQuantity,
    //   valeurDuMouvement   : cartItem.CartItemQuantity * cartItem.CartItemProduct.prixUnitaireVenteTTC,
    //   stockReel           : cartItem.product.qteEnStock,
    //   valeurStock         : cartItem.product.qteEnStock * cartItem.CartItemProduct.prixUnitaireVenteTTC,
    //   depot               : this.pointDeVente.nomPV,
    //   codeSociete         : this.pointDeVente.codeSociete,
    //   numeroDocument      : this.numeroFactureVente,
    //   numeroLigne         : this.pointDeVente.numeroMouvementStock,
    // }
    // this.subscription.push(this.mouvementStockService.addMouvementStock(newMouvementStock).subscribe(_=>{}))
  // })
    // const newFactureVente = {
    //   numeroDocument      : this.numeroFactureVente,
    //   date                : new Date(),
    //   numeroClient        : "",
    //   totalHT             : this.CartItemPriceTotal/1.2,
    //   totalTVA            : this.CartItemPriceTotal-this.CartItemPriceTotal/1.2,
    //   totalTTC            : this.CartItemPriceTotal,
    //   CartItemPriceAcompte      : 0,
    //   netAPayer           : this.CartItemPriceTotal,
    //   paye                : true,
    //   annule              : false,
    //   // depot               : this.pointDeVente.nomPV,
    //   soldeDu             : this.CartItemPriceTotal,
    // }

    // this.subscription.push(this.venteService.addVente(newFactureVente).subscribe(_=>{
    //   this.resetCart();
    //   alert("Achat réussi !");
    // }));
    // this.router.navigateByUrl(`print/${this.numeroFactureVente}` )
    // this.router.navigateByUrl(`print/VE003` )
  }
}
