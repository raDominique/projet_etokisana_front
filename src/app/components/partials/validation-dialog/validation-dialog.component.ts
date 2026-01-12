import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-validation-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './validation-dialog.component.html',
  styleUrl: './validation-dialog.component.css',
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class ValidationDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  // readonly dialogRef = inject(MatDialogRef<ValidationDialogComponent>)
  
}
