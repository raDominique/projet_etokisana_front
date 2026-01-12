import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { AvatarModule } from 'ngx-avatars';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SideBarComponent,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    DatePipe,
    AvatarModule,
    UpperCasePipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  usersNewList : any[] = [] ;
  usersTableColumns: string[] = ['Photo','ID','Nom', 'Prénoms', 'Type', 'Date','Email','Document','Action'];
  logedUser : any;
  constructor(
    private userService : UserService,
    private router :Router,
  ){
    this.logedUser = this.userService.getUserFromLocalStorage();
    this.userService.getUserByEmail(this.logedUser.userEmail).subscribe(userCurrent =>{
      if (userCurrent.userAccess != "Admin") {
        this.router.navigateByUrl('home')
      }
    });
    this.userService.getNewUsers().subscribe(users =>{
      this.usersNewList = users;
      console.log(this.usersNewList)
    })
    
  }
  CheckUser(userId : string){
    this.router.navigateByUrl('/userDetails/'+userId);
  }
  deleteUser(userId:string){
    this.userService.deleteUser(userId).subscribe(_=>{
      console.log("suppression avec succès ! ")
      location.reload();
    })
  }
}
