import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

const VALIDATORS_MESSAGES:any = {
  required :'Ne doit pas être vide',
  email:'Entrer un email valid',
  minlength: 'trop court',
  notMatch:'les mots de passe ne correspondent pas'
}

@Component({
  selector: 'input-validation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css'
})
export class InputValidationComponent implements OnChanges,OnInit{
  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen:boolean = true;
  errorMessages:string[] = [];

  constructor() { 
    
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(_ =>{
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(_=> {
      this.checkValidation();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    this.checkValidation();
  }
  checkValidation():void{
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return;
    }
    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key]);

   
  }
}
