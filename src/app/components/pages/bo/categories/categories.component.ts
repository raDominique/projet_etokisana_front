import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CategoryService } from 'src/app/services/category.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { DefaultButtonComponent } from 'src/app/components/partials/default-button/default-button.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    SideBarComponent,
    MatTableModule,
    MatIconModule,
    RouterLink,
    DefaultButtonComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  logedUser : any ;
  categoriesList:any[]=[]
  displayedColumns: string[] = ['Miniature','Nom', 'Description','Action'];
  constructor(
    private categoryService:CategoryService,
    private userService : UserService,
    private router : Router,
  ){
    this.logedUser = this.userService.getUserFromLocalStorage();
    this.userService.getUserByEmail(this.logedUser.userEmail).subscribe(userCurrent =>{
      if (userCurrent.userAccess != "Admin") {
        this.router.navigateByUrl('home')
      }
    });
    this.categoryService.getAllCategory().subscribe(categoryAll=>{
      this.categoriesList = categoryAll;
    })
  }

  deleteCat(catId:string){
    this.categoryService.deleteCat(catId);
  }
}
