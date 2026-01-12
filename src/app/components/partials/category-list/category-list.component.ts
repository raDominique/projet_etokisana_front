import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ProductCategory } from '../../../shared/models/ProductCategory';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categoryList : ProductCategory[]=[];
  @Output() emitCatName = new EventEmitter<string>()
  constructor(
    private categoryService:CategoryService,
  ){
    this.categoryList = this.categoryService.getAll()
  }
  // selectCat(catName:string){
  //   this.emitCatName.emit
  // }
  
}
