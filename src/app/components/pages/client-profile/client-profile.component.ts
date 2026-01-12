import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProfileItemComponent } from '../../partials/profile-item/profile-item.component';
import { HeaderComponent } from '../../partials/header/header.component';
import { AvatarModule } from 'ngx-avatars';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { NgxMaterialIntlTelInputComponent } from 'ngx-material-intl-tel-input';
import { InputContainerComponent } from '../../partials/input-container/input-container.component';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ProfileItemComponent,
    AvatarModule,
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    TextInputComponent,
    NgxMaterialIntlTelInputComponent,
    InputContainerComponent,
  ],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent implements OnInit{
  isSubmitted: boolean = false;
  images : {[key: string]: string} = {};
  user !: any;
  profileImage!:string;
  userForm !: FormGroup;
  corporateForm !: FormGroup;
  userPhone = new FormControl();
  showSellerForm = signal(false);
  dbIdUser : string = "";

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
  ){

  }
  ngOnInit() : void {
    

    const userLocal = this.userService.getUserFromLocalStorage()

    this.userService.getUserByEmail(userLocal.userEmail).subscribe(reqUser=>{
      this.user = reqUser;
      this.dbIdUser = this.user._id;
      console.log(this.user);
      this.profileImage = this.user.userImage;
      console.log(this.profileImage);

      
    })
    // if (this.user) {
    //   this.userForm = this.formBuilder.group({
    //         // userNickName  : [this.user.userNickName],
    //         userName      : [this.user.userName],
    //         userFirstname : [this.user.userFirstname],
    //         userEmail     : [this.user.userEmail],
    //         userPhone     : [this.user.userPhone],
    //         userAddress   : [this.user.userAddress],
    //       })
    //       this.corporateForm = this.formBuilder.group({
    //         raisonSocial  : [''],
    //         userNif       : [''],
    //         userRCS       : [''],
    //         managerName   : [''],
    //         managerEmail  : [''],
    //         contactName   : [''],
    //         contactEmail  : [''],
    //         userPhone     : [''],
    //         userAddress   : [''],
    //       })
    // }
    
  }
  get fc(){
    return this.corporateForm.controls;
  }
  get fu(){
    return this.userForm.controls;
  }
  submit(){
      
  }
  validateModif(){
    // this.validationButton.emit([this.control.value,this.label]);
    // console.log(this.label + ":" +this.control.value);
  }

  changeModifMode(){
    // this.modifmode = !this.modifmode;
  }

  onFileImageSelected(event:Event,imageName : string){    
  }
  get cfc(){
    return this.corporateForm.controls;
  }
  submitUser(){

  }
}
