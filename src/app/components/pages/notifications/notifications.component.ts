import { Component } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  isLoged : boolean = false;
  isUser :any;
  notifications : any[]=[];
  notificationTotal : number = 0;
  user : any;

  constructor(
    private router:Router,
    private userService : UserService,
    private notificationService : NotificationService
  ){
    this.isUser = this.userService.getUserFromLocalStorage();
      if (!this.userService.checkUserConnection()) {
        console.log("no user connected !")
        this.router.navigateByUrl("login");
      }
    if(this.isUser.userEmail != null){
      this.userService.getUserByEmail(this.isUser.userEmail).subscribe(userReq => {
        this.user = userReq;
        if (!this.user) {
          this.userService.checkUserDeleted();
        }
        this.notificationService.getNotificationByOwner(this.user.userId).subscribe(allOwnerNotif =>{
          this.notifications = allOwnerNotif;
          this.notifications.forEach(notif =>{
            if(notif.states == "new"){
              this.notificationTotal++;
            }
          })
        })
      })
      this.isLoged = true;
      if (this.isUser.userEmail!=null) {
      this.userService.getUserByEmail(this.user.userEmail).subscribe(user=>{
      if (this.user.userType=="admin") {
        this.router.navigateByUrl("/dashboard")
      }
    })
    }else{
      this.router.navigateByUrl('login')
    }
    }else{
      this.isLoged = false;
    }
  }

  
}
