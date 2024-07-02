import { Injectable } from '@angular/core';
import { Observable, take } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { map } from "rxjs/operators";
import { DialogConfirmComponent } from "../../shared/dialog-confirm/dialog-confirm.component";
import { DialogModalComponent } from "../../shared/dialog-modal/dialog-modal.component";

export enum ModalType {
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
  CONFIRM = 'confirm',
}

interface DataDialogInterface {
  message: string;
  modalType: ModalType | string
}

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(private dialog: MatDialog) { }

  openModal(message: string, modal: string | ModalType = ModalType.SUCCESS ): Observable<any> {
    const data: DataDialogInterface = {
      message,
      modalType: modal
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    dialogConfig.width = '500px';
    dialogConfig.minHeight = '100px';

    let dialogRef;

    if (modal === ModalType.CONFIRM) {
      dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);
    } else {
      dialogRef = this.dialog.open(DialogModalComponent, dialogConfig);
    }

    return dialogRef.afterClosed().pipe(take(1), map(resp => {
      return resp;
    }));
  }
}
