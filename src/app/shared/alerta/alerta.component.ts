import { FuseAlertService } from '@fuse/components/alert';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'alerta',
    templateUrl: 'alerta.component.html',
    styles     : [
        `
            fuse-alert {
                margin: 16px 0;
            }
        `
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class AlertaComponent implements OnInit
  {
    constructor(
        public sbRef: MatSnackBarRef<AlertaComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: any
      ) {}
    ngOnInit(): void
    {}
  }
