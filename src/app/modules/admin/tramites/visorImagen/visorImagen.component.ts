import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector: 'visor-dialog',
    templateUrl: './visorImagen.component.html',
})
export class VisorImagenComponent implements OnInit, OnDestroy {
    //@Input() isEdite: boolean = false;
    //@Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
    page: number = 1;
    previsualizacion: any;
    // Private
    //pdfSource  = "Voucher.pdf";
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<VisorImagenComponent>,
    ) {}

    ngOnInit(): void {
        this.verArchivo();
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.complete();
    }
    verArchivo(): void {
        console.log(this.data.archivoImagen);
        const file = this.data.archivoImagen;
        console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.previsualizacion = e.target.result;
            console.log(this.previsualizacion);
        };
        //reader.readAsArrayBuffer(this.data.file);
    }
}
