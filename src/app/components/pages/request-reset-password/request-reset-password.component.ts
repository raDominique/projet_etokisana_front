import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';

@Component({
  selector: 'app-request-reset-password',
  standalone: true,
  imports: [
    HeaderComponent,
    TextInputComponent,
    DefaultButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './request-reset-password.component.html',
  styleUrl: './request-reset-password.component.css'
})
export class RequestResetPasswordComponent implements OnInit{
  emailForm!: FormGroup;
  isSubmitted !: boolean;
  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService
  ){

  }
 ngOnInit() : void {
    this.emailForm = this.formBuilder.group({
      email:['',[Validators.required]],
    })
  }
  get fc(){
      return this.emailForm.controls;
    }
    submit(){
      this.isSubmitted =true;
      if (this.emailForm.invalid){ 
          console.log(this.emailForm.getError);
          alert("Veuillez remplir correctement les champs obligatoires!");
          return;
        }
      
      const fv = this.emailForm.value;
      let userInfo = {
        email : fv.email
      }
      this.userService.requestResetPassword(userInfo).subscribe(_ => {
        alert("Mail envoyé");
        // this.router.navigateByUrl("user-products");
      })
    }
}
