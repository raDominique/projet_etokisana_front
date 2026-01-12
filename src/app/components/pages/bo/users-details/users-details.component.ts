import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileItemComponent } from 'src/app/components/partials/profile-item/profile-item.component';
import { UserService } from 'src/app/services/user.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { AvatarModule } from 'ngx-avatars';
import { NgIf } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-users-details',
  standalone: true,
  imports: [
    SideBarComponent,
    ProfileItemComponent,
    AvatarModule,
    NgIf,
  ],
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.css'
})
export class UsersDetailsComponent implements OnInit{
  profileImage!:string;
  theUser : any = null;
  documentFile: string [] = [];
  isEntreprise:boolean = false;
  identityFileType:string = "";
  downloadLink1:string = "";
  downloadLink2:string = "";
  downloadableName1 : string = "";
  downloadableName2 : string = "";
  documentIncomplet : boolean = false;
  logedUser : any ;
  constructor(
    private userService:UserService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private notificationService:NotificationService,
  ){
    this.logedUser = this.userService.getUserFromLocalStorage();
    this.userService.getUserByEmail(this.logedUser.userEmail).subscribe(userCurrent =>{
      if (userCurrent.userAccess != "Admin") {
        this.router.navigateByUrl('home')
      }
    })
    this.activatedRoute.params.subscribe(params=>{
      console.log(params.id);
      this.userService.getUserById(params['id']).subscribe(theUser =>{
        this.theUser = theUser;
        // console.log(theUser);
        // if (this.theUser.userValidated) {
        //   this.router.navigateByUrl('dashboard')
        // }
        if (this.theUser.userType==="Entreprise") {
          this.isEntreprise = true;
          this.profileImage = this.theUser.logo;
          this.identityFileType = this.theUser.nif;
          this.documentFile = this.theUser.carteFiscale;
          this.downloadableName1 = this.theUser.raisonSocial + "_CarteFiscale_recto";
          this.downloadableName2 = this.theUser.raisonSocial + "_CarteFiscale_verso";
          if (this.theUser.identityDocument.length>1) {
            this.documentIncomplet = false;
            console.log(this.documentIncomplet);
          }else{
            this.documentIncomplet = true;
            console.log(this.documentIncomplet);
          }          
        }else{
          this.profileImage = this.theUser.userImage;
          this.identityFileType = this.theUser.identityFileType;
          this.documentFile[0] = this.theUser.identityDocument[0];
          this.documentFile[1] = this.theUser.identityDocument[1];
          this.downloadableName1 = this.theUser.userName + "_" +this.theUser.documentType + "_recto";
          this.downloadableName2 = this.theUser.userName + "_" +this.theUser.documentType + "_verso";
          this.isEntreprise = false;
        }
        
        // create download link
        if (!this.documentIncomplet) {
          const base64Data = this.theUser.identityDocument[0];
          const base64Data1 = this.theUser.identityDocument[1];
          const blob = this.convertBase64ToBlob(base64Data)
          const blob1 = this.convertBase64ToBlob(base64Data1)
          this.downloadLink1 = window.URL.createObjectURL(blob);
          this.downloadLink2 = window.URL.createObjectURL(blob1); 
        }
      })
    })
  } 
  

  ngOnInit(): void {
    
  }
  /**
 * Convert BASE64 to BLOB
  */
  private convertBase64ToBlob(base64Image: string) {
    // Split into two parts
    const parts = base64Image.split(';base64,');

    // Hold the content type
    const imageType = parts[0].split(':')[1];

    // Decode Base64 string
    const decodedData = window.atob(parts[1]);

    // Create UNIT8ARRAY of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);

    // Insert all character code into uInt8Array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }

    // Return BLOB image after conversion
    return new Blob([uInt8Array], { type: imageType });
  }

  ValidateRegistration(){
    this.userService.validateUser(this.theUser._id,).subscribe(_=>{
    })
    const NotfiUserValidate ={
          userId: this.theUser.userId,
          title : "Inscription validée",
          message : "Votre inscription est terminée !",
          state : "new",
        }
    this.notificationService.addNotification(NotfiUserValidate).subscribe(result =>{
      console.log(result)
    })
    this.notificationService.openNotificationDialog(
      false,
      "Utilisateur validé",
      "Cette utilisateur a été approuvé et a accès à toutes les fonctionnalités de la plateforme",
      "dashboard",
      false);
    
  }
}

