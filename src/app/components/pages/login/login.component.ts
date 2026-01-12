import { Component } from '@angular/core';

import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { IUserLogin } from '../../../shared/Interfaces/IUserLogin';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { PasswordInputComponent } from "../../partials/password-input/password-input.component";
import { HeaderComponent } from '../../partials/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconModule,
    TextInputComponent,
    DefaultButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    PasswordInputComponent,
    // HeaderComponent
],
  providers : [HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  subscriptions : Subscription[] =[];
  loginForm!: FormGroup;
  isSubmitted : boolean = false;
  isLoged : boolean = false;
  url : string = 'client-area';
  user ?: User;
  passwordVisible:boolean = false;
  

  constructor(
    private userService     : UserService,
    private formBuilder     : FormBuilder,
    private router          : Router,
  ){
    this.user = userService.getUserFromLocalStorage()
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    },{
      
    });
    if (this.user?.userEmail) {
      this.router.navigateByUrl('client-area')
    }
  }
  get fc(){
    return this.loginForm.controls;
  }
  
  submit(){
    this.isSubmitted =true;
    if (this.loginForm.invalid) return;
    
    const fv = this.loginForm.value;
    this.userService.getUserByEmail(fv.email).subscribe(isUser=>{
      console.log(isUser);
      
      if(isUser){
        const user:IUserLogin = {
          userEmail      : fv.email,
          userPassword  : fv.password
        };
        this.userService.login(user).subscribe(_=>{
          // if(isUser.userAccess == "Admin"){
          //   this.router.navigateByUrl("/dashboard");
          // }else{
            console.log(this.url);
            this.router.navigateByUrl(this.url);
          // }
        })
      }else{
        alert("Utilisateur inconnu, essayez de vous inscrire dans un premier temps");
        this.router.navigateByUrl('/register');
      }
    })
  }  
}
