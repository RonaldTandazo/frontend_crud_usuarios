import { CommonModule } from '@angular/common';
import { Component,Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-modal-general',
  standalone: true,
  templateUrl: './modal-general.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatDialogModule, MatIcon, CommonModule],
})
export class ModalGeneralComponent {
  title: string = '';
  message: string = '';
  success: boolean | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string , success: boolean}) {
    this.title = this.data.title;
    this.message = this.data.message;
    this.success = this.data.success;
  }
}
