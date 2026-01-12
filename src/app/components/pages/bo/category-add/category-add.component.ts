import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DefaultButtonComponent } from 'src/app/components/partials/default-button/default-button.component';
import { TextInputComponent } from 'src/app/components/partials/text-input/text-input.component';
import { TextareaComponent } from 'src/app/components/partials/textarea/textarea.component';
import { CategoryService } from 'src/app/services/category.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [
    DefaultButtonComponent,
    TextInputComponent,
    TextareaComponent,
    MatIconModule,
    SideBarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent implements OnInit{
  fileName = "";
  addCatForm!: FormGroup;
  isSubmitted = false;
  category : any;
  logedUser : any;

  constructor(
    private userService : UserService,
    private categoryService : CategoryService,
    private formBuilder : FormBuilder,
    private router : Router,
  ){
    this.logedUser = this.userService.getUserFromLocalStorage();
    this.userService.getUserByEmail(this.logedUser.userEmail).subscribe(userCurrent =>{
      if (userCurrent.userAccess != "Admin") {
        this.router.navigateByUrl('home')
      }
    });

  }
  ngOnInit(): void {
    this.addCatForm = this.formBuilder.group({
          CatName:['',Validators.required],
          CatDescription:[''],
        })
  }
  onFileSelected(event:Event) {
    let htmlInputElement = <HTMLInputElement>event.target!;
    const file = htmlInputElement.files ? htmlInputElement.files[0] :null;
    
    if (file) {

        this.fileName =file.name;

        const formData = new FormData();

        formData.append("file", file);

        // this.productService.uploadFile(formData).subscribe();
    }
  }
  get fc(){
    return this.addCatForm.controls;
  }
  submit(){
    this.isSubmitted =true;
    if (this.addCatForm.invalid){ 
        console.log(this.addCatForm.getError);
        alert("Veuillez remplir correctement les champs obligatoires!");
        return;
      }
    
    const fv = this.addCatForm.value;
    console.log(fv.CatName);
    this.category = {
      CatMiniatureUrl : "",
      CatName         :fv.CatName,
      CatDescription  :fv.CatDescription,
    };
    // console.log(this.user);
    this.categoryService.addCat(this.category).subscribe(_ => {
      alert("Nouvelle catégorie ajoutée!");
      this.router.navigateByUrl("/categories");
    })
  }
}
