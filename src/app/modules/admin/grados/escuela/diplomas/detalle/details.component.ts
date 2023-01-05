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
import moment from 'moment';

@Component({
    selector       : 'grado-escuela-diplomas-details',
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
export class GradoEscuelaDiplomaDetalleComponent implements OnInit, OnDestroy
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
    maxDate: any;
    modalidades_sustentacion: any;
    programas_estudios: any;
    diplomas: any;
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

    limiteFecha(): void {
        const now = moment();
        this.maxDate = now;
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.limiteFecha();

        // Create the selected grado form
        this.gradoForm = this._formBuilder.group({
            idTramite: [''],
            idTipo_tramite: [''],
            nro_documento: [''],
            idColacion: [''],
            idEstado_tramite: [''],
            descripcion_estado: [''],
            codigo: [''],
            entidad: [''],
            nro_operacion: [''],
            fecha_operacion: [''],
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

            idModalidad_carpeta: ['', Validators.required],
            fecha_sustentacion_carpeta: ['', Validators.required],
            nombre_trabajo_carpeta: ['', Validators.required],
            url_trabajo_carpeta: ['', Validators.required],
            nro_creditos_carpeta: [{value: '', disabled: true}, Validators.required],
            idPrograma_estudios_carpeta: ['', Validators.required],
            fecha_primera_matricula: [{value: '', disabled: true}, Validators.required],
            fecha_ultima_matricula: [{value: '', disabled: true}, Validators.required],
            idDiploma_carpeta: ['', Validators.required],
            anios_estudios: [{value: '', disabled: true}],

            idAcreditacion: [{value: '', disabled: true}],
            dependencia_acreditado: [{value: '', disabled: true}],
            fecha_inicio: [{value: '', disabled: true}],
            fecha_fin: [{value: '', disabled: true}],
        });

        // Get the grado
        this._gradoService.grado$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((grado: GradoInterface) => {

                // Get the grado
                this.grado = grado;

                // Patch values to the form
                this.gradoForm.patchValue(grado);
                this.calcularTiempo();

                this._gradoService.getDiplomasByTipoTramiteUnidad(grado.idUnidad, grado.idTipo_tramite_unidad, grado.idDependencia_detalle)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((diplomas: any) => {
                        this.diplomas = diplomas;
                        
                        // this.gradoForm.patchValue({idDiploma_carpeta: diplomas[0]});
            
                        // Mark for check
                        this._changeDetectorRef.markForCheck();
                    });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._gradoService.modalidades_sustentacion$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((modalidades_sustentacion: any) => {
                this.modalidades_sustentacion = modalidades_sustentacion;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._gradoService.programas_estudios$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((programas_estudios: any) => {
                this.programas_estudios = programas_estudios;
    
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
    
    // updateEstado(): void
    // {
    //     // Get the contact object
    //     const grado = this.corregirForm.getRawValue();
    //     console.log(grado);
    //     // Disable the form
    //     this.corregirForm.disable();
        
    //     // Update the contact on the server
    //     this._gradoService.updateEstado(grado.idTramite, grado).subscribe(() => {

    //         // Re-enable the form
    //         this.corregirForm.enable();

    //         // Show a success message
    //         this.alert = {
    //             type   : 'success',
    //             message: 'Trámite retornado correctamente',
    //             title: 'Guardado'
    //         };
    //         this.openSnack();
            
    //         // Mark for check
    //         this._changeDetectorRef.markForCheck();
    //     });
    // }
    calcularTiempo(): void {
        this.gradoForm.patchValue({anios_estudios: moment(this.gradoForm.get('fecha_primera_matricula').value).from(this.gradoForm.get('fecha_ultima_matricula').value)});
    }

    enviarDatos(): void {
        if (this.gradoForm.invalid) {
            this.gradoForm.markAllAsTouched();
            return;
        }

        // Get the contact object
        const grado = this.gradoForm.getRawValue();
        grado.fecha_sustentacion_carpeta = new Date(grado.fecha_sustentacion_carpeta).toISOString().substring(0,10);
        grado.fecha_primera_matricula = new Date(grado.fecha_primera_matricula).toISOString().substring(0,10);
        grado.fecha_ultima_matricula = new Date(grado.fecha_ultima_matricula).toISOString().substring(0,10);
        
        // Disable the form
        this.gradoForm.disable();
        
        // Update the contact on the server
        this._gradoService.sendDatos(grado.idTramite, grado).subscribe(() => {

            // Re-enable the form
            // this.gradoForm.enable();

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
    
}
