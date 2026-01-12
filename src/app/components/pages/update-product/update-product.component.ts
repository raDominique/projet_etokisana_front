import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { TextareaComponent } from '../../partials/textarea/textarea.component';
import { HeaderComponent } from '../../partials/header/header.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Category } from '../add-product/add-product.component';
import { map, Observable, startWith } from 'rxjs';
import { productCpc } from 'src/cpc-data';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    TextInputComponent,
    TextareaComponent,
    DefaultButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    HeaderComponent,
    NgIf,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: 'update-product.component.html',
  styleUrl: 'update-product.component.css'
})
export class UpdateProductComponent implements OnInit{
readonly productCategory = new FormControl();
  fileName = "";
  addProductForm: FormGroup = new FormGroup({});
  isSubmitted = false;
  product : any;
  currentUserEmail: string ="";
  productID!:string;
  selectedProduct!:Product;
  productImage : string[] = [];

  catCtrl = new FormControl('');
  listOfCategories : Category[]=productCpc;
  filteredCat: Observable<Category[]>;
  selected: any = "";
  constructor(
    private productService:ProductService,
    private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private activatedRoute:ActivatedRoute
  ){
    this.activatedRoute.params.subscribe((params)=>{
      this.productID=params['id']
      console.log(this.productID)
      if (this.productID) {
        this.productService.getProductById(this.productID).subscribe(theproduct=>{
          this.selectedProduct = theproduct;
          this.productImage = theproduct.productImage;
          // console.log(this.selectedProduct);
          this.addProductForm = this.formBuilder.group({
            codeCPC :[this.selectedProduct.codeCPC],
            productCategory:[this.selectedProduct.productCategory],
            productName:[this.selectedProduct.productName,Validators.required],
            productDescription:[this.selectedProduct.productDescription,Validators.required],
            productState:[this.selectedProduct.productState],
            productPoids:[this.selectedProduct.productPoids],
            productVolume:[this.selectedProduct.productVolume],
            productLargeur:[this.selectedProduct.productLargeur],
            productLongueur:[this.selectedProduct.productLongueur],
            productHauteur:[this.selectedProduct.productHauteur],
          })
        })
      }
    })
    this.currentUserEmail  = this.userService.getUserFromLocalStorage().userEmail;
    this.filteredCat = this.catCtrl.valueChanges.pipe(
          startWith(''),
          map(cat => (cat ? this._filterCats(cat): this.listOfCategories.slice())),
        )
  }
  private _filterCats(value:string): Category[]{
    const filterValue = value.toLowerCase();
    console.log(this.listOfCategories.filter(category =>category.designation.length >=3 && category.designation.toLowerCase().includes(filterValue)))
    return this.listOfCategories.filter(category =>category.designation.length >=3 && category.designation.toLowerCase().includes(filterValue));
  }

  ngOnInit() : void {
    
  }
 setCPC(codeCPC:string){
    this.selected = codeCPC;
  }

  onFileSelected(event:any) {
    // let htmlInputElement = <HTMLInputElement>event.target!;
    // const file = htmlInputElement.files ? htmlInputElement.files[0] :null;
    
    // if (file) {

    //     this.fileName =file.name;

    //     const formData = new FormData();

    //     formData.append("file", file);

    //     this.productService.uploadFile(formData).subscribe();
    // }

     const filesAmount = event.target.files.length;

    for (let i = 0; i < filesAmount; i++) {

      const reader = new FileReader();

      reader.onload = (event:any) => {
        console.log(event.target.result);
          this.productImage.push(event.target.result); 
      }
      reader.readAsDataURL(event.target.files[i]);
    }
  }
  get fc(){
    return this.addProductForm.controls;
  }
  submit(){
    this.isSubmitted =true;
    if (this.addProductForm.invalid){ 
        console.log(this.addProductForm.getError);
        return;
      }
    
    const fv = this.addProductForm.value;
    // console.log(fv.userName);
    this.product = {
      codeCPC           :fv.codeCPC,
      productName       :fv.productName,
      productDescription:fv.productDescription,
      productCategory   :fv.productCategory,
      productState      :"en attente",
      productValidation :false,
      productImage      :this.productImage,
      productHauteur    :fv.productHauteur,
      productLargeur    :fv.productLargeur,
      productLongueur   :fv.productLongueur,
      productPoids      :fv.productPoids,
      productVolume     :fv.productVolume,
    };
    // console.log(this.user);
    this.productService.updateProduct(this.productID,this.product).subscribe(_ => {
      alert("Produit mis à jour avec succés!");
      this.router.navigateByUrl("user-products");
    })
  }
}
