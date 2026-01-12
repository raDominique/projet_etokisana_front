import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { DefaultButtonComponent } from 'src/app/components/partials/default-button/default-button.component';
import { HeaderComponent } from 'src/app/components/partials/header/header.component';
import { PasswordInputComponent } from 'src/app/components/partials/password-input/password-input.component';
import { TextInputComponent } from 'src/app/components/partials/text-input/text-input.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bo-login',
  standalone: true,
  imports: [
    // RouterLink,
    FormsModule,
    MatIconModule,
    TextInputComponent,
    ReactiveFormsModule,
    DefaultButtonComponent,
    PasswordInputComponent,
    ],
  templateUrl: './bo-login.component.html',
  styleUrl: './bo-login.component.css'
})
export class BoLoginComponent implements OnInit{
  loginForm!: FormGroup;
  isSubmitted : boolean = false;
  logedUser : any ;
  constructor(
    private userService     : UserService,
    private formBuilder     : FormBuilder,
    private router          : Router,
  ){
    
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
          email:['',[Validators.required]],
          password:['',[Validators.required]]
        },{
          
        });
        // if (this.user?.userEmail) {
          this.router.navigateByUrl('admin')
        // }
  }
  get fc(){
    return this.loginForm.controls;
  }

  submit(){
      this.isSubmitted =true;
      if (this.loginForm.invalid) return;
      
      const fv = this.loginForm.value;
      const user  = {
        userEmail       : fv.email,
        userPassword    : fv.password
      };
      this.userService.getUserByEmail(user.userEmail).subscribe(usertolog=>{
        if (usertolog.userAccess == "Admin") {
          this.userService.login(user).subscribe(_=>{
            this.router.navigateByUrl("/dashboard") ;
          })
        }else{

          alert("This is only for admin ! your access level is : " + usertolog.userAccess)
        }
      })
    }

}
