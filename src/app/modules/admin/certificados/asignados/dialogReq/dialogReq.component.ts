import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FuseAlertService, FuseAlertType } from '@fuse/components/alert';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatAccordion } from '@angular/material/expansion';
@Component({
    selector       : 'madurity_model-dialog',
    templateUrl    : './dialogReq.component.html',
    styles         : [

          /* language=SCSS */
          `
              .nombre {
                  position: relative;
                  top: 0;
                  margin-top: 0;
                  -webkit-backface-visibility: hidden;
                  backface-visibility: hidden;
                  transition: none;
                  font-weight: 500;
                  --tw-text-opacity: 1 !important;
                  color: rgba(var(--fuse-text-default-rgb), var(--tw-text-opacity)) !important;
              }
          `

    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequisitosDialogComponent implements OnInit, OnDestroy
{
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
        public dialogRef: MatDialogRef<RequisitosDialogComponent>,
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
            nombre: [''],
            alumno: [''],
            archivo: [''],
            des_estado_voucher: [''],
            tramite: [''],
            entidad: [''],
            exonerado: [''],
            fecha_operacion: [''],
            idVoucher: [''],
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
            nombre: data.requisito.nombre,
            lectura: data.lectura,
            alumno: data.alumno,
            archivo: data.archivo,
            des_estado_voucher: data.des_estado_voucher,
            tramite: data.tramite,
            entidad: data.entidad,
            exonerado: data.exonerado,
            fecha_operacion: data.fecha_operacion,
            idTramite: data.idTramite,
            idVoucher: data.idVoucher,
            nro_operacion: data.nro_operacion,
            nro_tramite: data.nro_tramite,
            comentario: data.comentario,
        });
        console.log(this.formulario2);
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
