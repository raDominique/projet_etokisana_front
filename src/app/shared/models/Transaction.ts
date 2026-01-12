import { CartItem } from "./CartItem";

export class Transaction{
    _id ?: string;
    userId !:string;
    siteDepartId !: string;
    siteArriveId !: string;
    typeES!:string;
    montantTotal !: number;
    statut!:string;
    productList!:CartItem[];
}