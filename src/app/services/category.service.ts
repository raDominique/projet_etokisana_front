import { Injectable } from '@angular/core';
import { sample_categories } from '../../../data';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../shared/models/ProductCategory';
import { Observable } from 'rxjs';
import { CATEGORY_ADD_URL, CATEGORY_REMOVE_URL, CATEGORY_URL } from '../shared/constant/urls';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http : HttpClient
  ) { }

  addCat(categoryData:any){
    return this.http.post<ProductCategory>(CATEGORY_ADD_URL,categoryData);
  }
  getAll(){
    return sample_categories;
  }
  getAllCategory() : Observable<ProductCategory[]>{
    return this.http.get<ProductCategory[]>(CATEGORY_URL);
  }
  deleteCat(catId:string){
    return this.http.delete(CATEGORY_REMOVE_URL);
  }
}
