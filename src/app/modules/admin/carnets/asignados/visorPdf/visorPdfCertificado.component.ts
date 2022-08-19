/* eslint-disable @typescript-eslint/naming-convention */
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';

@Component({
    selector: 'visorPdf-dialog',
    templateUrl: './visorPdfCarnet.component.html',
    styles: [
        `
            pdf-viewer {
                height: 65vh;
                width: auto;
            }
        `
    ]
})
export class VisorPdfCarnetComponent implements OnInit, OnDestroy {
    @ViewChild(MatAccordion) accordion: MatAccordion;
    //@Input() isEdite: boolean = false;
    //@Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
    page: number = 1;
    pdfSource: any;
    formulario2: FormGroup;
    // Private
    //pdfSource  = "Carnet.pdf";
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<VisorPdfCarnetComponent>,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.cargarFormulario2();
        this.verArchivo();
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
            tramite: [''],
            entidad: [''],
            exonerado: [''],
            fecha_operacion: [''],
            idCarnet: [''],
            nro_operacion: [''],
            nro_tramite: [''],
            validado: [''],
            comentario: [''],
            idTramite: [''],
            lectura: [''],
        });
        this.llenarDialog(this.data);
    }

    llenarDialog(data: any): void {
        console.log(data);
        this.formulario2.patchValue({
            lectura: data.lectura,
            alumno: data.alumno,
            archivo: data.archivo,
            des_estado_voucher: data.des_estado_voucher,
            tramite: data.tramite,
            entidad: data.entidad,
            exonerado: data.exonerado,
            fecha_operacion: data.fecha_operacion,
            idTramite: data.idTramite,
            idCarnet: data.idCarnet,
            nro_operacion: data.nro_operacion,
            nro_tramite: data.nro_tramite,
            comentario: data.comentario,
        });
    }

    verArchivo(): void {
        const file = this.data.archivo;
        if (file.type === 'Blob') {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                console.log(e);
                this.pdfSource = e.target.result;
            };
        }
        else{
            this.pdfSource = file;
            console.log(this.pdfSource);
        }
        // reader.readAsArrayBuffer(this.data.file);
    }
    selectedEstado(option: string): void {
        console.log(option);
        this.data.des_estado_voucher = option;
        this.formulario2.patchValue({
            des_estado_voucher: option
        });
    }
}
