import { Component, Inject } from '@angular/core';
import { ModalType } from "../../core/services/modals.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MaterialModule } from "../material.module";

@Component({
  selector: 'app-dialog-modal',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-modal.component.html',
  styleUrl: './dialog-modal.component.css'
})
export class DialogModalComponent {
  protected readonly ModalType = ModalType;

  message: string;
  type_modal: string;

  constructor(@Inject(MAT_DIALOG_DATA) public  dataDialog: any,
              private mdDialogRef: MatDialogRef<DialogModalComponent>,) {
    this.message = dataDialog.message;
    this.type_modal = dataDialog.modalType;
  }

  closeDialog(): void {
    this.mdDialogRef.close();
  }
}
