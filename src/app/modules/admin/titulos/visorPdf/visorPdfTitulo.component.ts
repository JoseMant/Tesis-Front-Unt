import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector: 'visor-dialog',
    templateUrl: './visorPdfTitulo.component.html',
    styles: [
        `
            pdf-viewer {
                height: 65vh;
                width: auto;
            }
        `
    ]
})
export class VisorPdfTituloComponent implements OnInit, OnDestroy {
    //@Input() isEdite: boolean = false;
    //@Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
    page: number = 1;
    pdfSource: any;
    // Private
    //pdfSource  = "Voucher.pdf";
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<VisorPdfTituloComponent>,
    ) {}

    ngOnInit(): void {
        this.verArchivo();
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.complete();
    }
    verArchivo(): void {
        console.log(this.data.archivoPdf);
        const file = this.data.archivoPdf;
        if (file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                this.pdfSource = e.target.result;
            };
        }
        else{
            this.pdfSource = file;
            console.log(this.pdfSource);
        }
        //reader.readAsArrayBuffer(this.data.file);
    }
}
