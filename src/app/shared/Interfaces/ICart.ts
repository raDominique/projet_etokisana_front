import { CartItem } from "../models/CartItem";

export interface ICart{
    CartItemProductName:CartItem[];
    CartTotal:number;
}