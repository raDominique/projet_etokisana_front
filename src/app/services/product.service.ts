import { Injectable } from '@angular/core';
import { Product } from '../shared/models/Product';
import { PRODUCT_ADD_TO_STOCK_URL, PRODUCT_ADD_URL, PRODUCT_BY_CATEGORY_URL, PRODUCT_BY_ID_URL, PRODUCT_BY_OWNER_URL, PRODUCT_BY_SEARCH_URL, PRODUCT_BY_SITE_ID_URL, PRODUCT_REMOVE_URL, PRODUCT_UPDATE_URL, PRODUCT_UPLOAD_IMAGE_URL, PRODUCT_URL } from '../shared/constant/urls';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { sample_products } from '../../../data';
import { Deposit } from '../shared/models/Deposit';
import { DepotItem} from '../shared/models/DepotItem';
import { StockElement } from '../shared/models/StockElement';

const DEPOSIT_KEY="Depot";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiKey : string ='9b5d1c08780729c719910a4f123fcf16';
  private depot:Deposit = this.getDepotFromLocalStorage();
  private depositSubject:BehaviorSubject<Deposit> = new BehaviorSubject(this.depot)

  constructor(
    private http:HttpClient,
  ) { }

  getSample(){
    return sample_products;
  }
  getOffreSpecial(){
    const offreSpecial = sample_products.filter((product:Product)=>product.productState == "Speciale")
    return offreSpecial;
  }
  getByCat(CatName : string){
    const productCat = sample_products.filter(product => product.productCategory == CatName) ;
    return productCat;
  }
  getAll() : Observable<Product[]>{
    return this.http.get<Product[]>(PRODUCT_URL);
  }

  uploadProductImages(file : File):Observable<string>{
    const formData = new FormData();

    formData.append('image',file);

    return this.http.post('/upload',formData,{params : { key: this.apiKey}}).pipe(map((response:any) => response['data']['url']));
  }

  getProductById(id:string) : Observable<Product>{
    return this.http.get<Product>(PRODUCT_BY_ID_URL+id);
  }
  getProductByCategory(category:string):Observable<Product[]>{
    return this.http.get<Product[]>(PRODUCT_BY_CATEGORY_URL+category);
  }
  getProductByOwner(productID:string) : Observable<Product[]>{
    return this.http.get<Product[]>(PRODUCT_BY_OWNER_URL+productID);
  }
  getProductBySearch(searchTerm:string):Observable<Product[]>{
    return this.http.get<Product[]>(PRODUCT_BY_SEARCH_URL+searchTerm);
  }
  addProduct(productData:Product):Observable<Product>{
    return this.http.post<Product>(PRODUCT_ADD_URL,productData);
  }
  updateProduct( productID:string,newProductData:any):Observable<Product>{
    console.log(newProductData);
    return this.http.patch<Product>(PRODUCT_UPDATE_URL+productID,newProductData);
  }
  getStockElementBySite( siteId:string):Observable<StockElement[]>{
    return this.http.get<StockElement[]>(PRODUCT_BY_SITE_ID_URL+siteId);
  }
  uploadFile(formData:FormData){
    console.log("image uploaded !! ")
    return this.http.post(PRODUCT_UPLOAD_IMAGE_URL, formData);
  }
  deleteProduct(productId:string){
    return this.http.delete(PRODUCT_REMOVE_URL+productId);
  }
  freeimagehostupload(formData:FormData){
    return this.http.post("freeimage.host/api/1/upload/?key=6d207e02198a847aa98d0a2a901485a5",formData);
  }
  // addDepositItem(product:any){
  //   this.depot.item.push(new DepositItem(product))
  //   this.setDepotToLocalStorage();
  // }
  depositProduct(stockElement:any){
    return this.http.post(PRODUCT_ADD_TO_STOCK_URL,stockElement)
  }
  getDeposit():Deposit{
    return this.depositSubject.value;
  }
  private setDepotToLocalStorage(){
  const depotJson = JSON.stringify(this.depot)  ;
  localStorage.setItem(DEPOSIT_KEY,depotJson);
  this.depositSubject.next(this.depot);
  }
  private getDepotFromLocalStorage(){
    const depotJson = localStorage.getItem(DEPOSIT_KEY);
    return depotJson? JSON.parse(depotJson): new Deposit();
   }
  
}
