import { Component, inject } from '@angular/core';
import {  MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './notification-dialog.component.html',
  styleUrl: './notification-dialog.component.css'
})
export class NotificationDialogComponent {
  data = inject(MAT_DIALOG_DATA);
}
