import { Component, OnInit } from '@angular/core';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { TextareaComponent } from '../../partials/textarea/textarea.component';
import { HeaderComponent } from '../../partials/header/header.component';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    TextInputComponent,
    TextareaComponent,
    DefaultButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    HeaderComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
  readonly productCategory = new FormControl();
  message = new FormControl()
  fileName = "";
  contactForm!: FormGroup;
  isSubmitted = false;
  product : Product = new Product();

  constructor(
    private productService:ProductService,
    private formBuilder:FormBuilder,
    private router:Router,
  ){

  }

  ngOnInit() : void {
    this.contactForm = this.formBuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      email:['',Validators.required],
      telephone:[''],
      raisonSociale:[''],
      message:['',Validators.required],
    })
  }

  get fc(){
    return this.contactForm.controls;
  }
  sendEmail( e:Event){
    e.preventDefault()
    this.isSubmitted =true;
    if (this.contactForm.invalid){ 
        console.log(this.contactForm.getError);
        return;
      }

    
    const fv = this.contactForm.value;
    console.log(fv);
    const params = {
      from_name : fv.nom +' '+ fv.prenom,
      from_email : fv.email,
      from_telephone : fv.telephone,
      from_raisonSociale : fv.raisonSociale,
      message : fv.message
    }

    emailjs.send('service_f1rr9hp','template_qj4xaqm',{... params},{
      publicKey:'lFhoty6viDodCsQ8p'
    })
      .then(
        () => {
          console.log('SUCCESS!');
          this.router.navigateByUrl('/');
        },
        (error) => {
          console.log('FAILED...',(error as EmailJSResponseStatus).text);
        },
      );
  }
}
