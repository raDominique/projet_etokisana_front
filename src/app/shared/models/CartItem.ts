// import { Product } from "./Product";

import { DepotItem } from "./DepotItem";

// import { DepotItem } from "./DepotItem";

export class CartItem{
    // constructor(depotItem:DepotItem){
    //     this.CartItemProduct = depotItem;
    // }
    depotItem!:DepotItem;
    productName !: string;
    productImage !:string;
    quantity:number = 0;
    price:number = 0;
    montant:number = 0;
}