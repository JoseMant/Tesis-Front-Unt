import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitulosService } from 'app/modules/admin/titulos/titulos.service';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { FuseAlertType } from '@fuse/components/alert';

@Component({
    selector: 'titulos-pendientes-dialog',
    templateUrl: './dialog.component.html',
    styles: [
        `
        `
    ]
})
export class TituloURAPendienteDialogComponent implements OnInit, OnDestroy {
    //@Input() isEdite: boolean = false;
    //@Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
    page: number = 1;
    pdfSource: any;
    tituloForm: FormGroup;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<TituloURAPendienteDialogComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _titulosService: TitulosService,
        private snackBar: MatSnackBar
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
        console.log(this.data);

        // Create the selected maduritylevel form
        this.tituloForm = this._formBuilder.group({
            idTramite: [''],
            idTipo_tramite: [''],
            nro_documento: [''],
            idColacion: [''],
            idEstado_tramite: [''],
            idModalidad_titulo: [''],
            descripcion_estado: [''],
            codigo: [''],
            archivo: [''],
            idMotivo_tramite: [''],
            comentario: [''],
            apellidos: [''],
            nombres: [''],
            documento: [''],
            celular: [''],
            correo: [''],
            idFacultad: [''],
            idSecretaria: [''],
            sede: [''],
            nro_matricula: [''],
            tipo_documento: [''],
            idUnidad: [''],
            idTipo_tramite_unidad: [''],
            codigo_diploma: ['', [Validators.required]],
            observacion_diploma: [''],
            apply: [false, [Validators.required]]
        });

        // Patch values to the form
        this.tituloForm.patchValue(this.data);
        
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.complete();
    }

    toggleChecking(event: any): void {
        const value = this.tituloForm.get('apply').value;
        this.tituloForm.patchValue({
            apply: !value
        });
    }

    save(): void {
        const data = this.tituloForm.getRawValue();

        // Disable the form
        this.tituloForm.disable();

        this._titulosService.editCodigoDiploma(data, data.apply).subscribe((updatedCertificado) => {
            console.log(updatedCertificado)
            // Re-enable the form
            this.tituloForm.enable();
            
            // Reset the form
            // this.tituloNgForm.resetForm();

            // Close the dialog
            this.matDialogRef.close();
            
            this.alert = {
                type   : 'success',
                message: 'Notificación enviada correctamente',
                title: 'Enviado'
            };
            this.openSnack();
            
            // Mark for check
            this._changeDetectorRef.markForCheck();
        },
        (response) => {
            // Re-enable the form
            this.tituloForm.enable();

            this.alert = {
                type   : 'warn',
                message: response.error.message,
                title: 'Error'
            };
            this.openSnack();
        });
    }
}
