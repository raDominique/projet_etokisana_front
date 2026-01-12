import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { UserService } from '../../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { MatTable, MatTableModule } from '@angular/material/table';
import { HeaderComponent } from '../../partials/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { TransactionService } from 'src/app/services/transaction.service';
import { SiteService } from 'src/app/services/site.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    MatDrawerContainer,
    MatDrawerContent,
    MatTableModule,
    HeaderComponent,
    MatIconModule,
    RouterModule,
    DatePipe
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit{
  @ViewChild(MatTable) table !: MatTable<any>
  userCurrent :any;
  isDepot         !:boolean;
  isRetrait       !:boolean;
  isAchat         !:boolean;
  isVente         !:boolean;
  isHistorique    !:boolean;
  achatList       :any[]=[];
  venteList       :any[]=[];
  retraitList     :any[]=[];
  transactionList :any[]=[];
  transactionListIsReady : boolean = false;
  displayedColumns: string[] = ['Date','Situation','Type', 'Montant','Depart','Arrivee','Action'];
  // displayedColumns: string[] = ['Date','Situation', 'Type', 'Montant','Methode','Dépôt'];
  _siteDepart:any;
  _siteArrivee:any;
  constructor(
    private userService:UserService,
    private router:Router,
    private transactionService : TransactionService,
    private siteService : SiteService,
  ){
    this.userCurrent = this.userService.getUserFromLocalStorage()
    if (!this.userCurrent) {
      this.router.navigateByUrl('/login')
    } 
    this.transactionService.getTransactionByUserId(this.userCurrent._id).subscribe((transactionListServer:any)=>{
      // this.transactionList = transactionListServer;
      transactionListServer.forEach((element:any) => {
        let elementItem = {
          _id:element._id,
          createdAt: element.createdAt,
          statut : element.statut,
          typeES : element.typeES,
          montantTotal : element.montantTotal,
          siteDepart : this._siteDepart,
          departOwner : "",
          siteArrivee: this._siteArrivee,
          arriveeOwner : "",
        }
        
        if (element.siteDepartId) {
          this.siteService.getSiteById(element.siteDepartId).subscribe((siteDepartFS:any)=>{
            this._siteDepart= siteDepartFS;
            elementItem.siteDepart = this._siteDepart;
            this.userService.getUserByUserId(this._siteDepart.siteUserID).subscribe(departOwner =>{
              elementItem.departOwner = departOwner.userId.toUpperCase() + " - " + departOwner.userName + " " + departOwner.userFirstname;
            })
          })
        }
        if (element.siteArriveId) {
          this.siteService.getSiteById(element.siteArriveId).subscribe((siteArriveeFs:any)=>{
            this._siteArrivee = siteArriveeFs;
            elementItem.siteArrivee = this._siteArrivee.siteName + " - " + this._siteArrivee.siteAddress;
            this.userService.getUserByUserId(this._siteArrivee.siteUserID).subscribe(arriveeOwner =>{
              elementItem.arriveeOwner = arriveeOwner.userId.toUpperCase() + " - " + arriveeOwner.userName + " " + arriveeOwner.userFirstname;
            })
          })  
        }
        this.transactionList.push(elementItem);
        this.table.renderRows();
      })
    });
  }
  ngOnInit(): void {
    
  }
}
