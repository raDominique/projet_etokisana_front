import { Component, Input, OnInit } from '@angular/core';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { InputContainerComponent } from '../input-container/input-container.component';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgIf } from '@angular/common';

@Component({
  selector: 'date-input',
  standalone: true,
  imports: [
    InputValidationComponent,
    InputContainerComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    NgIf,
],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.css',
})
export class DateInputComponent implements OnInit{
  @Input()  control!:AbstractControl;
  @Input()  showErrorsWhen:boolean = true;
  @Input()  label!: string;
  @Input()  type:'texte'|'password'|'email' ="texte" ;
    
  get formControl(){
    return this.control as FormControl;
  }
  ngOnInit(): void {
    
  }
}
