import { Inject, Injectable } from '@angular/core';
import { ICart } from '../shared/Interfaces/ICart';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../shared/models/Product';
import { CartItem } from '../shared/models/CartItem';
import { DepotItem } from '../shared/models/DepotItem';
import { DepotItemService } from './depot-item.service';
import { ProductService } from './product.service';

const CART_KEY = "Cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  cartActualItem :CartItem[]=[];
  constructor(
    private depotItemService : DepotItemService,
    private productService : ProductService,
  ){

  }

  montantTotal : number = 0;
  
  addToCart(depotItemId:any):void{
    // Si déjà dans le panier ajouter la quantité
    // let cartItem = this.cart.items.find(item => item.depotItem === depotItemId);
    // if(cartItem){
    //   this.changeQuantity(depotItemId, cartItem.quantity + 1);
    //   this.setCartToLocalStorage();
    //   return;
    // }
    //Sinon ajouter au panier et stocker dans le localStorage
    this.depotItemService.getById(depotItemId).subscribe(depotItemFs =>{
      this.productService.getProductById(depotItemFs.productId).subscribe(productFs =>{
        if (depotItemFs) {
        const newCartItem:CartItem = {
        depotItem : depotItemId,
        productName : productFs.productName,
        productImage : productFs.productImage[0],
        quantity : 1,
        price : depotItemFs.prix,
        montant: depotItemFs.prix * 1,
      }
      this.cart.items.push(newCartItem);
      console.log(this.cart)
      this.setCartToLocalStorage();
      }else{
        console.log("Not Found!")
      }
      })
      
      
    })
    
    
  }

  removeFromCart(productId:string): void{
    this.cart.items =
    this.cart.items.filter(item => item.depotItem._id != productId);
    this.setCartToLocalStorage();
  }

  changeQuantity(depotItemId:string, quantity:number){
    let cartItem = this.cart.items.find(item => item.depotItem._id === depotItemId);
    if(!cartItem) return;

    cartItem.quantity = quantity;
    this.setCartToLocalStorage();
  }

  qtUp(item:CartItem,itemQte:number,currentCartItemPriceTotal:number){
    const newQt = itemQte+1;
    // const newCartItemPriceTotal = currentCartItemPriceTotal + this.getTheDepotItem(item.depotItem).prix;
    const newCartItemPriceTotal = currentCartItemPriceTotal + item.depotItem.prix;
    this.changeCartItemQuantity(item,newQt);
  }

  qtDown(item:CartItem ,itemQte:number,currentCartItemPriceTotal:number){
    if (itemQte > 1) {
      const newQt = itemQte-1;
      const newCartItemPriceTotal  = currentCartItemPriceTotal-item.price;
      this.changeCartItemQuantity(item,newQt);
    }
  }

  getTheDepotItem(depotItemId:string):DepotItem{
    let depotItem = new DepotItem()
    this.depotItemService.getById(depotItemId).subscribe((result:any)=>{
      if (result) {
        depotItem = result
        return depotItem;
      }else{
        return new DepotItem();
      }
    })
    return depotItem;
  }

  clearCart(){
    this.cart = new Cart();
   localStorage.removeItem(CART_KEY);
    // this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  getCart(): Cart{
    return this.cartSubject.value;
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
    item.quantity = item.quantity;
    this.calculTotal();
  }

  insertQty(item : CartItem, itemCartItemQuantity : string){
    const intItemCartItemQuantity = parseInt(itemCartItemQuantity);
    
    let newCartItemPrice
    
    // newCartItemPrice = this.getTheDepotItem(item.depotItem).prix  * intItemCartItemQuantity;
    newCartItemPrice = item.depotItem.prix  * intItemCartItemQuantity;
    this.changeCartItemQuantity(item,intItemCartItemQuantity);
  }

  insertPrice(item : CartItem, itemCartItemPrice : string){
    const intItemCartItemPrice = parseInt(itemCartItemPrice);
    this.changeCartItemPrice(item,intItemCartItemPrice,);
    this.calculTotal();
  }

  calculTotal(){
    let total : number = 0;
    this.cart.items.forEach(item =>{
      total += item.montant
    })
    this.montantTotal = total;
  }

  private setCartToLocalStorage():void{
    this.cart.totalPrice = this.cart.items
    .reduce((prevSum,currentItem)=> prevSum + currentItem.montant,0);
    this.cart.totalCount = this.cart.items
    .reduce((prevSum,currentItem) => prevSum + currentItem.quantity,0)
    const cartJson = JSON.stringify(this.cart);

    localStorage.setItem(CART_KEY,cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem(CART_KEY);
    return cartJson? JSON.parse(cartJson): new Cart();
  }
}