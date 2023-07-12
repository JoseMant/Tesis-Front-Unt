/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { fuseAnimations } from '@fuse/animations';
import { TitulosService } from 'app/modules/admin/titulos/titulos.service';
import { UniversidadesService } from 'app/shared/universidades/universidades.service';
import { TituloInterface } from 'app/modules/admin/titulos/titulos.types';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import moment from 'moment';
import { UniversidadInterface } from 'app/shared/universidades/universidades.types';

@Component({
    selector       : 'titulo-escuela-diplomas-details',
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
export class TituloEscuelaDiplomaDetalleComponent implements OnInit, OnDestroy
{
    @ViewChild('tituloNgForm') tituloNgForm: NgForm;
    @ViewChild('corregirNgForm') corregirNgForm: NgForm;
    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    titulo: TituloInterface | null = null;
    tituloForm: FormGroup;
    corregirForm: FormGroup;
    contador: number = 4;
    maxDate: any;
    modalidades_sustentacion: any;
    programas_estudios: any;
    diplomas: any;
    universidades: UniversidadInterface[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _tituloService: TitulosService,
        private _universidadesService: UniversidadesService,
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

        // Create the selected titulo form
        this.tituloForm = this._formBuilder.group({
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
            requisitos: [''],
            fecha: ['', Validators.required],

            idModalidad_carpeta: ['', Validators.required],
            fecha_inicio_acto_academico: ['', Validators.required],
            fecha_sustentacion_carpeta: ['', Validators.required],
            nombre_trabajo_carpeta: [''],
            url_trabajo_carpeta: [''],
            nro_creditos_carpeta: ['', Validators.required],
            originalidad: ['', Validators.required],
            idPrograma_estudios_carpeta: ['', Validators.required],
            fecha_primera_matricula: ['', Validators.required],
            fecha_ultima_matricula: ['', Validators.required],
            idDiploma_carpeta: ['', Validators.required],
            idUniversidad: [null, Validators.required],
            // requisito_idioma: [null, Validators.required],

            idAcreditacion: [{value: '', disabled: true}],
            dependencia_acreditado: [{value: '', disabled: true}],
            fecha_inicio: [{value: '', disabled: true}],
            fecha_fin: [{value: '', disabled: true}],
        });

        // Get the titulo
        this._tituloService.titulo$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((titulo: TituloInterface) => {

                // Get the titulo
                this.titulo = titulo;
                console.log(titulo);
                // Patch values to the form
                this.tituloForm.patchValue(titulo);
                this.calcularTiempo();

                this._tituloService.getDiplomasByTipoTramiteUnidad(titulo.idUnidad, titulo.idTipo_tramite_unidad, titulo.idPrograma)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((diplomas: any) => {
                        // 
                        this.diplomas = diplomas;
            
                        // Mark for check
                        this._changeDetectorRef.markForCheck();
                    });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._tituloService.modalidades_sustentacion$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((modalidades_sustentacion: any) => {
                this.modalidades_sustentacion = modalidades_sustentacion;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._universidadesService.universidades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((universidades: UniversidadInterface[]) => {
                this.universidades = universidades;
    
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        
        this._tituloService.programas_estudios$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((programas_estudios: any) => {
                this.programas_estudios = programas_estudios;
    
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });       
    }

    selectedActo(acto_academico: number): void {
        this.tituloForm.controls.nombre_trabajo_carpeta.clearValidators();
        this.tituloForm.controls.url_trabajo_carpeta.clearValidators();
        this.tituloForm.patchValue({
            fecha_inicio_acto_academico: '',
            fecha_sustentacion_carpeta: ''
        });
        if (acto_academico != 1) {
            this.tituloForm.controls.nombre_trabajo_carpeta.setValidators([Validators.required]);
            this.tituloForm.controls.url_trabajo_carpeta.setValidators([Validators.required]);
        } else {
            this.tituloForm.patchValue({
                fecha_inicio_acto_academico: moment(this.tituloForm.get('fecha').value),
                fecha_sustentacion_carpeta: moment(this.tituloForm.get('fecha').value),
                nombre_trabajo_carpeta: '',
                url_trabajo_carpeta: ''
            });
        }
        this.tituloForm.controls.nombre_trabajo_carpeta.updateValueAndValidity();
        this.tituloForm.controls.url_trabajo_carpeta.updateValueAndValidity();
    }
    
    calcularTiempo(): void {
        let tiempo = moment(this.tituloForm.get('fecha_primera_matricula').value).from(this.tituloForm.get('fecha_ultima_matricula').value);
        let tiempo_parcial = tiempo.split(" ");
        this.tituloForm.patchValue({anios_estudios: (Number(tiempo_parcial[0])+1) + " años"});
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

    enviarDatos(): void {
        if (this.tituloForm.invalid) {
            this.tituloForm.markAllAsTouched();
            return;
        }

        // Get the contact object
        const titulo = this.tituloForm.getRawValue();
        titulo.fecha_inicio_acto_academico = new Date(titulo.fecha_inicio_acto_academico).toISOString().substring(0,10);
        titulo.fecha_sustentacion_carpeta = new Date(titulo.fecha_sustentacion_carpeta).toISOString().substring(0,10);
        titulo.fecha_primera_matricula = new Date(titulo.fecha_primera_matricula).toISOString().substring(0,10);
        titulo.fecha_ultima_matricula = new Date(titulo.fecha_ultima_matricula).toISOString().substring(0,10);
        
        // Disable the form
        this.tituloForm.disable();
        
        // Update the contact on the server
        this._tituloService.sendDatos(titulo.idTramite, titulo).subscribe(() => {

            // Re-enable the form
            // this.tituloForm.enable();

            // Show a success message
            this.alert = {
                type   : 'success',
                message: 'Trámite enviado correctamente',
                title: 'Guardado'
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
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }
    validateFormatNumber(event) {
        let key;
        if (event.type === 'paste') {
          key = event.clipboardData.getData('text/plain');
        } else {
          key = event.keyCode;
          key = String.fromCharCode(key);
        }
        const regex = /[0-9]|\./;
         if (!regex.test(key)) {
          event.returnValue = false;
           if (event.preventDefault) {
            event.preventDefault();
           }
         }
    }
}
