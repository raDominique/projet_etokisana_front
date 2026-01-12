import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent implements OnInit{
  userId : string ="";
  userToken : string ="";
  userToBeVerified !: any;
  constructor( 
    private activatedRoute:ActivatedRoute,
    private userService: UserService,
  ){
  //   this.activatedRoute.params.subscribe(params=>{
  //     this.userToken = params['token'];
  //     this.userService.idByToken(this.userToken).subscribe(user=>{
  //       this.userToBeVerified = user;
  //       const activatedUser :any = {
  //       userName: this.userToBeVerified.userName,
  //       userFirstname:this.userToBeVerified.userFirstname,
  //       userDateOfBirth:this.userToBeVerified.userDateOfBirth,
  //       userAddress:this.userToBeVerified.userAddress,
  //       userEmail:this.userToBeVerified.userEmail,
  //       userAdmin:this.userToBeVerified.userAdmin,
  //       userDescritpion:this.userToBeVerified.userDescritpion,
  //       userEnabled:true,
  //       userIdentityCode:this.userToBeVerified.userIdentityCode,
  //       userImage:this.userToBeVerified.userImage,
  //       userLogo:this.userToBeVerified.userLogo,
  //       userPassword:this.userToBeVerified.userPassword,
  //       userManager:this.userToBeVerified.userManager,
  //       userNif : this.userToBeVerified.userNif,
  //       userStatut: this.userToBeVerified.userStatut,
  //       userTotalSolde:this.userToBeVerified.userTotalSolde,
  //       userRC : this.userToBeVerified.userRC,
  //       userPhone:this.userToBeVerified.userPhone,
  //       userType:this.userToBeVerified.userType,
  //       identityDocumentType: this.userToBeVerified.identityDocumentType,
  //       identityCardNumber  : this.userToBeVerified.identityCardNumber
  //     }
  //     console.log(activatedUser)
  //     this.userService.update(activatedUser,this.userToBeVerified._id).subscribe(_=>{
  //       alert("Utilisateur vérifié ! ")
  //       this.userService.confirmationEmail(this.userToken).subscribe(_=>{})
  //     })
  //   })
    
  // })
  this.activatedRoute.params.subscribe(params=>{
        this.userToken = params['token'];
        this.userService.confirmationEmail(this.userToken).subscribe(_=>{
          alert("Confirmation successfull!")
        })
      })
  
}
  ngOnInit(): void {
      
  }
}
