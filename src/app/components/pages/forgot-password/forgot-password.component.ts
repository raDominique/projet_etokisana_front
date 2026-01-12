import { Component, OnInit } from '@angular/core';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [TextInputComponent,ReactiveFormsModule,DefaultButtonComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{
  forgotPwdForm!:FormGroup;
  isSubmitted : boolean = false;
  email:string = "";
  user : any ;
  constructor(
    private formBuilder     : FormBuilder,
    private router          : Router,
    private userService     :UserService,
  ){
    
  }
  ngOnInit(): void {
    this.forgotPwdForm = this.formBuilder.group({
      email:['',[Validators.required]]
    },{
      
    });
    // if (this.user?.userEmail) {
    //   // console.log(this.user)
    //   this.router.navigateByUrl('client-area')
    // }
    // this.returnUrl= this.activatedRoute.snapshot.queryParams['returnUrl'];
  }
  get fc(){
    return this.forgotPwdForm.controls;
  }
  submit(){
    this.isSubmitted =true;
    if (this.forgotPwdForm.invalid) return;
    
    const fv = this.forgotPwdForm.value;
    this.email = fv.email
    this.userService.getUserByEmail(this.email).subscribe((user:any)=>{
      this.user = user
      console.log(this.user._id)
      const userResetPassord = {
        email : this.email,
        userId : user._id,}
        console.log(userResetPassord);
      this.userService.requestResetPassword(userResetPassord).subscribe(_=>{
        
      })
    })
  }
}
