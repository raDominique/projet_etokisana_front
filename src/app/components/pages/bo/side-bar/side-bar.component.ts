import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    MatIcon,
    MatIconModule,
    RouterLink,
    RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  adminBalance:number=0;
  user!:any;

  constructor(
    private userService: UserService,
    private router : Router
  ){
    this.user = this.userService.getUserFromLocalStorage();
    if (!this.user.userName)  {
      this.router.navigateByUrl("/home")      
    }
    // this.userService.getUserByEmail(this.user.userEmail).subscribe(user=>{
    // })
  }
  logout(){
    this.userService.logout();
    this.router.navigateByUrl('login');
  }

}
