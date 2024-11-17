import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './modal-confirmacion.html',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle, MatButtonModule]
})
export class ConfirmDialogComponent {}
