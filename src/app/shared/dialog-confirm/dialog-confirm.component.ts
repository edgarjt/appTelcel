import { Component, Inject } from '@angular/core';
import { MaterialModule } from "../material.module";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.css'
})
export class DialogConfirmComponent {
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public  dataDialog: any,
              private mdDialogRef: MatDialogRef<DialogConfirmComponent>) {
    this.message = dataDialog.message;
  }

  closeDialog(data: boolean): void {
    this.mdDialogRef.close(data);
  }

}
