import { Injectable } from '@angular/core';
import { DEPOT_ITEM_WITH_PRODUCT_INFO_URL, DEPOTITEM_ADD_DEPOT_ITEM_URL, DEPOTITEM_BY_ID_URL, DEPOTITEM_BY_PRODUCT_ID_URL, DEPOTITEM_DELETE_DEPOT_ITEM_URL, DEPOTITEM_GET_STOCK_URL, DEPOTITEM_MODIFY_DEPOT_ITEM_URL, DEPOTITEM_URL } from '../shared/constant/urls';
import { HttpClient } from '@angular/common/http';
import { DepotItem } from '../shared/models/DepotItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepotItemService {

  constructor(
    private http : HttpClient
  ) { }

   getAll(){
    return this.http.get<DepotItem[]>(DEPOTITEM_URL);
   }
   getAllByProductId(productId : string){
    return this.http.get<DepotItem[]>(DEPOTITEM_BY_PRODUCT_ID_URL + productId)
   }
   getById(depotItemId : string ): Observable<DepotItem>{
    return this.http.get<DepotItem>(DEPOTITEM_BY_ID_URL + depotItemId)
   }
   add(depotItemData:any){
    return this.http.post(DEPOTITEM_ADD_DEPOT_ITEM_URL,depotItemData);
   }
   update(depotItemData : any,depotItemId : string ){
    return this.http.patch(DEPOTITEM_MODIFY_DEPOT_ITEM_URL + depotItemId,depotItemData);
   }
   deleteByProductId(productId : string ){
    return this.http.delete(DEPOTITEM_DELETE_DEPOT_ITEM_URL + productId);
   }
   getStock(productId :string , depotId:string){
    return this.http.get<DepotItem>(DEPOTITEM_GET_STOCK_URL + productId + "/" + depotId);
   }
   getDepotItemWithProductInfo(depotItemId : string):Observable<DepotItem>{
    return this.http.get<DepotItem>(DEPOT_ITEM_WITH_PRODUCT_INFO_URL + depotItemId);
   }
}
