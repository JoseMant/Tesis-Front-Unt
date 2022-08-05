/* eslint-disable @typescript-eslint/naming-convention */
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';

@Component({
    selector: 'visorPdf-dialog',
    templateUrl: './visorPdfVoucher.component.html',
    styles: [
        `
            pdf-viewer {
                height: 65vh;
                width: auto;
            }
        `
    ]
})
export class VisorPdfVoucherComponent implements OnInit, OnDestroy {
    @ViewChild(MatAccordion) accordion: MatAccordion;
    //@Input() isEdite: boolean = false;
    //@Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
    page: number = 1;
    pdfSource: any;
    formulario2: FormGroup;
    // Private
    //pdfSource  = "Voucher.pdf";
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<VisorPdfVoucherComponent>,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.verArchivo();
        this.cargarFormulario2();
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.complete();
    }

    cargarFormulario2(): void {
        this.formulario2 = this.fb.group({
            alumno: [''],
            archivo: [''],
            des_estado_voucher: [''],
            descripcion: [''],
            entidad: [''],
            estado: [''],
            exonerado: [''],
            fecha_operacion: [''],
            idUsuario_aprobador: [''],
            idVoucher: [''],
            nro_documento   : [''],
            nro_matricula: [''],
            nro_operacion: [''],
            nro_tramite: [''],
            unidad: [''],
            validado: [''],
        });
        this.llenarDialog(this.data);
    }

    llenarDialog(data: any): void {
        console.log(data);
        this.formulario2.patchValue({
            alumno: data.alumno,
            archivo: data.archivo,
            des_estado_voucher: 'PENDIENTE',
            descripcion: data.descripcion,
            entidad: data.entidad,
            exonerado: data.exonerado,
            fecha_operacion: data.fecha_operacion,
            //idUsuario_aprobador: data.idUsuario_aprobador,
            //idVoucher: data.idVoucher,
            nro_operacion: data.nro_operacion,
            nro_tramite: data.nro_tramite
        });
    }

    verArchivo(): void {
        console.log(this.data.archivo);
        const file = this.data.archivo;
        console.log(file);
        if (file.type === 'Blob') {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                this.pdfSource = e.target.result;
                console.log(this.pdfSource);
            };
        }
        else{
            this.pdfSource = file;
        }
        // reader.readAsArrayBuffer(this.data.file);
    }

    validarVoucher(): void {
        if (this.formulario2.invalid) {
            this.formulario2.markAllAsTouched();
            return;
        }
        console.log(this.formulario2.getRawValue());
    }
}
