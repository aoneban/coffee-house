import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Product2 } from '../../interfaces';

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product2) {}
}
