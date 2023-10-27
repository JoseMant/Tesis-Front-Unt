/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { fuseAnimations } from '@fuse/animations';
import { DuplicadosDiplomaService } from '../../../duplicados.service';
import { DuplicadosDiplomasInterface } from '../../../duplicados.types';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import moment from 'moment';
import { UniversidadInterface } from 'app/shared/universidades/universidades.types';
import { UniversidadesService } from 'app/shared/universidades/universidades.service';

@Component({
    selector       : 'duplicado-datos-diploma-details',
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
export class DuplicadoDatosDiplomaDetalleComponent implements OnInit, OnDestroy
{
    @ViewChild('duplicadoNgForm') duplicadoNgForm: NgForm;
    @ViewChild('corregirNgForm') corregirNgForm: NgForm;
    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    duplicado: DuplicadosDiplomasInterface | null = null;
    duplicadoForm: FormGroup;
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
        private _duplicadoService: DuplicadosDiplomaService,
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

        // Create the selected duplicado form
        this.duplicadoForm = this._formBuilder.group({
            idTramite: [''],
            // idPrograma: [''],
            idUnidad: [''],
            idTipo_tramite_unidad: [''],

            idModalidad_carpeta: ['', Validators.required],
            fecha_colacion: ['', Validators.required],
            
            idDiploma_carpeta: ['', Validators.required],
            
            idUniversidad: ['', Validators.required],

            
        });

        // Get the duplicado
        this._duplicadoService.duplicado$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((duplicado: DuplicadosDiplomasInterface) => {

                // Get the duplicado
                this.duplicado = duplicado;

                // Patch values to the form
                this.duplicadoForm.patchValue(duplicado);

                let idTipo_tramite_unidad=duplicado.idTipo_tramite_unidad;
                if (idTipo_tramite_unidad==42||idTipo_tramite_unidad==47) {
                    idTipo_tramite_unidad=15;
                }else if (idTipo_tramite_unidad==43||idTipo_tramite_unidad==48) {
                    idTipo_tramite_unidad=16;
                } else if (idTipo_tramite_unidad==44||idTipo_tramite_unidad==49) {
                    idTipo_tramite_unidad=34;
                }

                this._duplicadoService.getDiplomasByTipoTramiteUnidad(duplicado.idUnidad, idTipo_tramite_unidad, duplicado.idPrograma)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((diplomas: any) => {
                        this.diplomas = diplomas;
            
                        // Mark for check
                        this._changeDetectorRef.markForCheck();
                    });

                this._duplicadoService.getModalidadesSustentacion(idTipo_tramite_unidad)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((modalidades_sustentacion: any) => {
                        this.modalidades_sustentacion = modalidades_sustentacion;
            
                        // Mark for check
                        this._changeDetectorRef.markForCheck();
                    });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._duplicadoService.programas_estudios$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((programas_estudios: any) => {
                this.programas_estudios = programas_estudios;
    
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
        if (this.duplicadoForm.invalid) {
            this.duplicadoForm.markAllAsTouched();
            return;
        }

        // Get the contact object
        const duplicado = this.duplicadoForm.getRawValue();
        if (duplicado.fecha_colacion) duplicado.fecha_colacion = new Date(duplicado.fecha_colacion).toISOString().substring(0,10);
        else duplicado.fecha_colacion = null;
        
        
        // Disable the form
        this.duplicadoForm.disable();
        
        // Update the contact on the server
        this._duplicadoService.sendDatos(duplicado.idTramite, duplicado).subscribe(() => {

            // Re-enable the form
            // this.duplicadoForm.enable();

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
