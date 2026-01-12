import { Component, Input } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-input',
  standalone: true,
  imports: [MatRadioModule,InputValidationComponent,ReactiveFormsModule],
  templateUrl: './radio-input.component.html',
  styleUrl: './radio-input.component.css'
})
export class RadioInputComponent {
  @Input()  control!:AbstractControl;
  @Input()  showErrorsWhen:boolean = true;
  @Input()  label!: string;
  
  get formControl(){
    return this.control as FormControl;
  }
}
