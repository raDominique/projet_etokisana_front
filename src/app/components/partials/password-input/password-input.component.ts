import { Component, Input } from '@angular/core';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { InputContainerComponent } from '../input-container/input-container.component';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [
    InputValidationComponent,
    InputContainerComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css'
})
export class PasswordInputComponent {
  @Input() control!:AbstractControl;
  @Input() showErrorsWhen:boolean = true;
  @Input() label!: string;
  @Input() type:string='password' ;
  @Input() passwordVisible:boolean= false;

  get formControl(){
      return this.control as FormControl;
    }
  
}
