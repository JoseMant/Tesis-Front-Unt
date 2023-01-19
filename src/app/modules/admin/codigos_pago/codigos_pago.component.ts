import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-codigos-pago',
  templateUrl: './codigos_pago.component.html',
  styleUrls: []
})
export class CodigosPagoComponent implements OnInit {

  constructor(public dialog: MatDialog) { }


  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(CodigosPagoComponent, dialogConfig);
  }
  ngOnInit(): void {
    //this.openDialog();
  }

}
