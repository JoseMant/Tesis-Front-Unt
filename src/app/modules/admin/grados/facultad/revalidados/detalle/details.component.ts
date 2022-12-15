/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { fuseAnimations } from '@fuse/animations';
import { GradosService } from 'app/modules/admin/grados/grados.service';
import { GradoInterface } from 'app/modules/admin/grados/grados.types';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';

@Component({
    selector       : 'grado-details',
    templateUrl    : './details.component.html',
    styles         : [
        /* language=SCSS */
        `
            fuse-alert {
                margin: 16px 0;
            }
            .fondo_snackbar {
                background-color:transparent !important;
                padding: 0px !important;
                height: 0px;
                min-height: 0px !important;
            }
            .spinner {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 40px;
                width: 56px;
            }
            .spinner > div {
                width: 12px;
                height: 12px;
                background-color: #1E96F7;
                border-radius: 100%;
                display: inline-block;
                -webkit-animation: fuse-bouncedelay 1s infinite ease-in-out both;
                animation: fuse-bouncedelay 1s infinite ease-in-out both;
            }
            .spinner .bounce1 {
                -webkit-animation-delay: -0.32s;
                animation-delay: -0.32s;
            }
            .spinner .bounce2 {
                -webkit-animation-delay: -0.16s;
                animation-delay: -0.16s;
            }
            @-webkit-keyframes fuse-bouncedelay {
                0%, 80%, 100% {
                    -webkit-transform: scale(0)
                }
                40% {
                    -webkit-transform: scale(1.0)
                }
            }

            @keyframes fuse-bouncedelay {
                0%, 80%, 100% {
                    -webkit-transform: scale(0);
                    transform: scale(0);
                }
                40% {
                    -webkit-transform: scale(1.0);
                    transform: scale(1.0);
                }
            }
        `
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations
})
export class GradoFacultadRevalidadoDetalleComponent implements OnInit, OnDestroy
{
    @ViewChild('gradoNgForm') gradoNgForm: NgForm;
    @ViewChild('corregirNgForm') corregirNgForm: NgForm;
    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    grado: GradoInterface | null = null;
    gradoForm: FormGroup;
    corregirForm: FormGroup;
    contador: number = 4;
    listEstados = [
        {id: 0, value: 0, name: 'Seleccionar estado a retornar...'},
        {id: 1, value: 20, name: 'VALIDANDO DOCUMENTOS DEL ALUMNO Y ESCUELA EN LA FACULTAD'},
        {id: 2, value: 32, name: 'ADJUNTANDO DOCUMENTOS EN FACULTAD'}
    ];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _gradoService: GradosService,
        public visordialog: MatDialog,
        private snackBar: MatSnackBar
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    openSnack(): void {
        this.snackBar.openFromComponent(AlertaComponent, {
            horizontalPosition: 'right',
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['fondo_snackbar'],
            data: this.alert,
        });
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the selected maduritylevel form
        this.corregirForm = this._formBuilder.group({
            idTramite: ['', Validators.required],
            newEstado: [0, Validators.required]
        });

        this.gradoForm = this._formBuilder.group({
            idTramite: [''],
            idTipo_tramite: [''],
            nro_documento: [''],
            idColacion: [''],
            idEstado_tramite: [''],
            idModalidad_grado: [''],
            descripcion_estado: [''],
            codigo: [''],
            entidad: ['', Validators.required],
            nro_operacion: ['', [Validators.maxLength(6), Validators.pattern(/^[0-9]+$/),Validators.required]],
            fecha_operacion: ['', Validators.required],
            archivo: [''],
            idMotivo_tramite: [''],
            comentario: [''],
            apellidos: [''],
            nombres: [''],
            documento: [''],
            celular: [''],
            correo: [''],
            idFacultad: [''],
            idEscuela: [''],
            sede: [''],
            nro_matricula: [''],
            tipo_documento: [''],
            sexoNombre: [''],
            idUnidad: [''],
            idTipo_tramite_unidad: [''],
            archivo_firma: [''],
            archivoImagen: [''],
            requisitos: [''],
        });

        // Get the grados
        // this._gradoService.allgrados$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((allgrados: GradoInterface[]) => {
        //         this.allgrados = allgrados;
        //         console.log(allgrados);

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Get the grado
        this._gradoService.grado$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((grado: GradoInterface) => {

                // Get the grado
                this.grado = grado;

                // Patch values to the form
                this.gradoForm.patchValue(grado);
                this.corregirForm.patchValue(grado);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.complete();
    }
    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
    updateEstado(): void
    {
        // Get the contact object
        const grado = this.corregirForm.getRawValue();
        console.log(grado);
        // Disable the form
        this.corregirForm.disable();
        
        // Update the contact on the server
        this._gradoService.updateEstado(grado.idTramite, grado).subscribe(() => {

            // Re-enable the form
            this.corregirForm.enable();

            // Show a success message
            this.alert = {
                type   : 'success',
                message: 'Trámite retornado correctamente',
                title: 'Guardado'
            };
            this.openSnack();
            
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    enviarEscuela(): void {
        // Get the contact object
        const grado = this.gradoForm.getRawValue();
        
        // Disable the form
        this.corregirForm.disable();
        
        // Update the contact on the server
        this._gradoService.sendEscuela(grado.idTramite, grado).subscribe(() => {

            // Re-enable the form
            this.corregirForm.enable();

            // Show a success message
            this.alert = {
                type   : 'success',
                message: 'Trámite enviado correctamente',
                title: 'Guardado'
            };
            this.openSnack();
            
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }
    
}
