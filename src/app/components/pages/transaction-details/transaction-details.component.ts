import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { Site } from 'src/app/shared/models/Sites';
import { Transaction } from 'src/app/shared/models/Transaction';
import { User } from 'src/app/shared/models/User';
import { HeaderComponent } from '../../partials/header/header.component';
import { UserService } from 'src/app/services/user.service';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [
    HeaderComponent,
    UpperCasePipe,
  ],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent {
  transactionId !: string;
  transaction !: Transaction;
  siteDepart ?:Site;
  siteDepartOwner?:User;
  siteArrive !:Site;
  siteArriveOwner?:User;
  productList : any[] =[];
 constructor(
  private activatedRoute : ActivatedRoute,
  private transactionService :TransactionService,
  private userService : UserService,
  private siteService : SiteService,
  private router : Router,
 ){
  this.activatedRoute.params.subscribe(params=>{
    this.transactionId = params.id;
    this.transactionService.getTransactionById(this.transactionId).subscribe(theTransaction=>{
      this.transaction = theTransaction;
      this.productList = theTransaction.productList;
      this.siteService.getSiteById(theTransaction.siteDepartId).subscribe(siteDepartFs=>{
        this.siteDepart = siteDepartFs;
        this.userService.getUserByUserId(siteDepartFs.siteUserID).subscribe(siteDepartOwnerFs=>{
            this.siteDepartOwner = siteDepartOwnerFs;
        })
      })
      this.siteService.getSiteById(theTransaction.siteArriveId).subscribe(siteArriveeFs=>{
        this.siteArrive = siteArriveeFs;
        this.userService.getUserByUserId(siteArriveeFs.siteUserID).subscribe(siteArriveeOwnerFs=>{
            this.siteArriveOwner = siteArriveeOwnerFs;
        })
      })
    })
  })
 }
 validateTransaction(transactionId : string){
  let transactionValidation = {
    statut : "Terminé"
  }
  this.transactionService.update(transactionValidation,transactionId).subscribe(_=>{
    this.router.navigateByUrl("/transactions")
  })
 }
 backButton(){
  this.router.navigateByUrl("/transactions")
 }
}
