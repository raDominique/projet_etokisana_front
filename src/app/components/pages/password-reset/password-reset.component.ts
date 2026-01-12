import { Component, OnInit } from '@angular/core';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordInputComponent } from '../../partials/password-input/password-input.component';
import { PasswordMatchValidator } from 'src/app/shared/validators/password_match_validator';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    HeaderComponent,
    PasswordInputComponent,
    DefaultButtonComponent,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent implements OnInit{
  resetPasswordFrom!:FormGroup;
  isSubmitted : boolean = false;
  userId !: string;
  token  !: string;
  constructor(
    private formBuilder:FormBuilder,
    private userService : UserService,
    private activatedRoute : ActivatedRoute,
  ){
    this.activatedRoute.params.subscribe(param => {
      this.userId = param['id'];
      this.token = param['token'];
      console.log(this.userId + " - " + this.token)
    })
  }
  ngOnInit(): void {
    this.resetPasswordFrom = this.formBuilder.group({
      userPassword:['',[Validators.required]],
      confirmPassword:['',[Validators.required]]
    },{
          validators : PasswordMatchValidator("userPassword","confirmPassword"),
        });
  }
  get fc(){
    return this.resetPasswordFrom.controls;
  }

  submit(){
    const fv = this.resetPasswordFrom.value;
    if (this.resetPasswordFrom.invalid) {
      alert("Informations non valide")
      return;
    }
    let data = {
      id : this.userId,
      token : this.token,
      password : fv.userPassword,
    }
    this.userService.resetPassword(data).subscribe(_=>{})
  }

}
