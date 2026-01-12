import { NgStyle } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-default-button',
  standalone: true,
  imports: [NgStyle,RouterLink],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.css'
})
export class DefaultButtonComponent {
  @Input()  type: 'submit' | 'button' = 'submit';
  @Input()  text:string = 'Submit';
  @Input()  bgColor = '#1877f2';
  @Input()  color = 'white';
  @Input()  fontSizeRem = 1;
  // @Input()  widthRem = 21;
  @Input()  widthPer = 100;
  @Input()  disabled = false;
  @Input()  link = "";
  @Output() onClick = new EventEmitter();

}
