export class Product{
    _id!:string;
    codeCPC             !: string;
    productName         !: string;
    productDescription  !: string;
    productCategory     : string ="";
    productState        : string = "en attente";
    productValidation   : boolean = false;
    productImage        : string[] =[];
    productVolume       : number = 0;
    productHauteur      : number = 0;
    productLargeur      : number = 0;
    productLongueur     : number = 0;
    productPoids        : number = 0;
    productOwnerId      : string ="";
    isStocker           : boolean = false;
}