/* eslint-disable @typescript-eslint/naming-convention */
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VouchersService } from 'app/modules/admin/vouchers/vouchers.service';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { FuseAlertType } from '@fuse/components/alert';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    entidadSelected: any;
    bancos: any;
    formulario2: FormGroup;
    // Private
    //pdfSource  = "Voucher.pdf";
    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<VisorPdfVoucherComponent>,
        private snackBar: MatSnackBar,
        private _changeDetectorRef: ChangeDetectorRef,
        private _voucherService: VouchersService,
        private fb: FormBuilder
    ) {}

    openSnack(): void {
        this.snackBar.openFromComponent(AlertaComponent, {
            horizontalPosition: 'right',
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['fondo_snackbar'],
            data: this.alert,
        });
    }

    ngOnInit(): void {
        this.cargarFormulario2();
        this.verArchivo();
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.complete();
    }

    validarDatosVoucher(): void{

        const data = this.formulario2.getRawValue();

        this._voucherService.validarDatosVoucher(data, data.idTramite).subscribe((response) => 
        {
         
            this.alert = {
                type   : 'success',
                message: 'Datos agregados y validados correctamente',
                title: 'Enviado'
            };
            this.openSnack();
        
            this._changeDetectorRef.markForCheck();
        
        },
        (response) => {
   
            this.alert = {
             //
                type   : 'warn',
                message: response.error.message,
                title: 'ERROR'
            };
            this.openSnack();
            this._changeDetectorRef.markForCheck();
        });
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
            idVoucher: [''],
            nro_operacion: [''],
            nro_documento: [''],
            nro_matricula: [''],
            nro_tramite: [''],
            validado: [''],
            comentario: [''],
            idTramite: [''],
            lectura: [''],
        });

        this._voucherService.bancos$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((bancos: any) => {
            this.bancos = bancos;

            // Mark for check
            this._changeDetectorRef.markForCheck();
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
            fecha_operacion: data.fecha_operacion,
            idTramite: data.idTramite,
            idVoucher: data.idVoucher,
            nro_operacion: data.nro_operacion,
            nro_tramite: data.nro_tramite,
            nro_documento: data.nro_documento,
            nro_matricula: data.nro_matricula,
            comentario: data.comentario,
        });
        if (data.exonerado_archivo) {
            this.formulario2.patchValue({
                exonerado: "SÍ",
            });
        } else {
            this.formulario2.patchValue({
                exonerado: "NO",
            });
        }

        this.entidadSelected = data.entidad;
       
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
