/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { CarpetasService } from 'app/modules/admin/carpetas/carpetas.service';
import { CarpetaInterface } from 'app/modules/admin/carpetas/carpetas.types';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
// import { CarpetaSecretariaValidadosDialogComponent } from 'app/modules/admin/carpetas/secretaria/validados/dialog/dialog.component';
import moment from 'moment';

@Component({
    selector       : 'carpeta-secretaria-validados-details',
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
export class CarpetasSecretariaValidadosDetalleComponent implements OnInit, OnDestroy
{
    @ViewChild('carpetaNgForm') carpetaNgForm: NgForm;
    @ViewChild('corregirNgForm') corregirNgForm: NgForm;
    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    carpeta: CarpetaInterface | null = null;
    carpetaForm: FormGroup;
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
        private _carpetaService: CarpetasService,
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

        // Create the selected carpeta form
        this.carpetaForm = this._formBuilder.group({
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

            idModalidad_carpeta: [{value: '', disabled: true}, Validators.required],
            fecha_inicio_acto_academico: [{value: '', disabled: true}, Validators.required],
            fecha_sustentacion_carpeta: [{value: '', disabled: true}, Validators.required],
            nombre_trabajo_carpeta: [{value: '', disabled: true}],
            url_trabajo_carpeta: [{value: '', disabled: true}],
            nro_creditos_carpeta: [{value: '', disabled: true}, Validators.required],
            idPrograma_estudios_carpeta: [{value: '', disabled: true}, Validators.required],
            fecha_primera_matricula: [{value: '', disabled: true}, Validators.required],
            fecha_ultima_matricula: [{value: '', disabled: true}, Validators.required],
            idDiploma_carpeta: [{value: '', disabled: true}, Validators.required],
            anios_estudios: [{value: '', disabled: true}],

            idAcreditacion: [{value: '', disabled: true}],
            dependencia_acreditado: [{value: '', disabled: true}],
            fecha_inicio: [{value: '', disabled: true}],
            fecha_fin: [{value: '', disabled: true}],
        });

        // Get the carpeta
        this._carpetaService.carpeta$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((carpeta: CarpetaInterface) => {

                // Get the carpeta
                this.carpeta = carpeta;

                // Patch values to the form
                this.carpetaForm.patchValue(carpeta);
                console.log(this.carpeta);
                this.calcularTiempo();

                this._carpetaService.getModalidadesSustentacion(carpeta.idTipo_tramite_unidad)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((modalidades: any) => {
                        this.modalidades_sustentacion = modalidades;
            
                        // Mark for check
                        this._changeDetectorRef.markForCheck();
                    });

                this._carpetaService.getDiplomasByTipoTramiteUnidad(carpeta.idUnidad, carpeta.idTipo_tramite_unidad, carpeta.idPrograma)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((diplomas: any) => {
                        this.diplomas = diplomas;
            
                        // Mark for check
                        this._changeDetectorRef.markForCheck();
                    });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._carpetaService.programas_estudios$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((programas_estudios: any) => {
                this.programas_estudios = programas_estudios;
    
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });       
    }
    
    calcularTiempo(): void {
        let tiempo = moment(this.carpetaForm.get('fecha_primera_matricula').value).from(this.carpetaForm.get('fecha_ultima_matricula').value);
        let tiempo_parcial = tiempo.split(" ");
        this.carpetaForm.patchValue({anios_estudios: (Number(tiempo_parcial[0])+1) + " años"});
    }

    modalNotification(): void {
        // console.log(this.carpetaForm.getRawValue());
        // const respDial = this.visordialog.open(
        //     CarpetaSecretariaValidadosDialogComponent,
        //     {
        //         data: this.carpetaForm.getRawValue(),
        //         disableClose: true,
        //         minWidth: '50%',
        //         maxWidth: '60%'
        //     }
        // );
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

    
    
}
