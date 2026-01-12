import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bo-transactions',
  standalone: true,
  imports: [],
  templateUrl: './bo-transactions.component.html',
  styleUrl: './bo-transactions.component.css'
})
export class BoTransactionsComponent {
  logedUser :any;
  constructor(
    private userService : UserService,
    private transactionService : TransactionService,
    private router : Router,
  ){
    // this.logedUser = this.userService.getUserFromLocalStorage();
    // if (this.logedUser.userAccess != "Admin") {
    //   this.router.navigateByUrl('home')
    // }
  }

}
