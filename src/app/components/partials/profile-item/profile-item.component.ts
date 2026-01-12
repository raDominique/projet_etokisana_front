import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TextInputComponent } from "../text-input/text-input.component";
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-profile-item',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TextInputComponent
],
  templateUrl: './profile-item.component.html',
  styleUrl: './profile-item.component.css'
})
export class ProfileItemComponent {
  modifmode:boolean = false;
  @Input() label : string = "";
  @Input() value : string = "";
  @Input() dbFieldName : string = "";
  @Input() placeholder : string = "";
  @Input() userId : string ="";
  @Input() control = new FormControl();

  @Output() validationButton = new EventEmitter<string[]>();
  
  
  isSubmitted = false;

  constructor(
    private notifactionService : NotificationService,
    private userService : UserService,
  ){

  }

  get formControl(){
    return this.control as FormControl;
  }

  validateModif(){
    const newData : {[key:string]:string} = {};
    newData[`${this.dbFieldName}`] = this.control.value;
    this.label = this.control.value;
    this.userService.update(newData,this.userId).subscribe(result=>{
      console.log(result);
      if(result){
        this.changeModifMode();
        console.log('Modification réussi !');
        window.location.reload();
      }
      this.validationButton.emit([this.control.value,this.dbFieldName]);
      
    })
    this.notifactionService.openNotificationDialog(false,`La modification de votre ${this.label}`,`Modification effectuée !`,null,true)
  }

  changeModifMode(){
    this.modifmode = !this.modifmode;
    
  }
}
