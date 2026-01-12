import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { InputContainerComponent } from '../input-container/input-container.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [
    InputValidationComponent,
    InputContainerComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css'
})
export class TextareaComponent {
  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen:boolean = true;
  @Input()
  label!: string;
  @Input()
  type: 'text'='text';
  
  get formControl(){
    return this.control as FormControl;
  }
}
