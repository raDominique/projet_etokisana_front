import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/shared/models/Product';
import { HeaderComponent } from '../../partials/header/header.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { IUserRegister } from 'src/app/shared/Interfaces/IUserRegister';
import { Transaction } from 'src/app/shared/models/Transaction';

@Component({
  selector: 'app-retrait',
  standalone: true,
  imports: [
    HeaderComponent,
    TextInputComponent,
    DefaultButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './retrait.component.html',
  styleUrl: './retrait.component.css'
})
export class RetraitComponent {
  isSubmitted:boolean=false;
  withdrawFundForm!: FormGroup;
  prestataireId!:string;
  depotId !: string;
  productId !: string;
  entry!:Transaction;
  product!:Product;
  prestataire:any;
  user!:any;
  fullUser:any;
constructor(
    private userService:UserService,
    private transactionservice:TransactionService,
    private formBuilder : FormBuilder,
    private activatedRoute : ActivatedRoute, 
    private productService : ProductService,
    private router : Router,
  ){
    this.activatedRoute.params.subscribe(params=>{
      this.depotId = params["depotId"];
      this.productId = params["productId"];


    })    
    this.user = this.userService.getUserFromLocalStorage();
    this.userService.getUserById(this.user._id).subscribe(fullUser =>{
      this.fullUser = fullUser;
    })
    // this.userService.getUserById(this.prestataireId).subscribe((prestataire)=>{
    //   this.prestataire = prestataire;
    // })
    // this.productService.getProductById(this.productId).subscribe(productById=>{
    //   this.product = productById;
    // })
  }
  ngOnInit() : void {
        this.withdrawFundForm = this.formBuilder.group({
          description:[''],
          montant:['',Validators.required],
        })
      }
  get fc(){
      return this.withdrawFundForm.controls;
    }
    submit(){
      // this.isSubmitted =true;
      // if (this.withdrawFundForm.invalid){ 
      //     console.log(this.withdrawFundForm.getError);
      //     alert("Veuillez remplir correctement les champs obligatoires!");
      //     return;
      //   }
      
      // const fv = this.withdrawFundForm.value;
      // this.entry = {
      //   userId          : this.user._id,      
      //   libelle         : fv.libelle,
      //   codeProduit     : "",
      //   produitId       : this.productId,
      //   tiersId         : this.depotId,
      //   montant         : fv.montant,
      //   statut          : "encours de validation",
      //   siteId          : this.depotId,
      //   typeES          : "Retrait",
      // };
      // this.transactionservice.addTransaction(this.entry).subscribe(_=>{
      // })
  
      // let updatedUser : IUserRegister = {
      //   userName            : this.user.userName,
      //   userFirstname       : this.user.userFirstname,
      //   userPassword        : this.user.userPassword,
      //   userEmail           : this.user.userEmail,
      //   userPhone           : this.user.userPhone,
      //   userTotalSolde      : parseInt(this.fullUser.userTotalSolde)-parseInt(fv.montant),
      //   userType            : this.user.userType,
      //   userEnabled         : this.user.userEnabled,
      // }
      // this.userService.update(updatedUser,this.user._id).subscribe(res => {
      //   alert("Retrait effectué");
      //   if (res != null) {
      //     this.router.navigateByUrl("/transactions");          
      //   }
      // })
    }
}
