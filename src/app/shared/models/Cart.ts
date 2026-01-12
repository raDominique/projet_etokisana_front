import { CartItem } from "./CartItem";

export class Cart{
  items:CartItem[] = [];
  totalPrice:number = 0;
  totalCount:number = 0;

  // get totalPrice():number {
  //   let totalPrice = 0;
  //   this.items.forEach(item=> {
  //     totalPrice += item.CartItemPrice;
  //   });

  //   return totalPrice;
  // }
  // get totalCount():number{
  //   let totalCount =0;
  //   this.items.forEach(item=>{
  //     totalCount+=item.CartItemQuantity
  //   })
  //   return totalCount;
  //  }
}