/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { DocenteService } from 'app/modules/admin/docente/docente.service';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import moment from 'moment';
import { TramitesResolucionesInterface } from '../../resoluciones.types';
import { Resolucion } from 'app/modules/admin/masters/carpeta/resoluciones/resoluciones.types';
import { ResolucionesService } from '../../resoluciones.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';


@Component({
    selector       : 'tramites-oficio',
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
export class ResolucionObservadaDetalleComponent implements OnInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatAccordion) private _accordion: MatAccordion;
    @ViewChild(MatSort) private _sort: MatSort;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    resolucionForm: FormGroup;
    requisitos: any;
    requisitosCount: number = 0;
    maxDate: any;
    user: any;

    resolucion:TramitesResolucionesInterface | null = null;
    profesiones:any;
    paises:any;
    sedes:any;
    condiciones:any;
    categorias:any;
    dependenciasSGA:any;
    departamentos:any;
    dedicacionesDocente:any;
    

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        public visordialog: MatDialog,
        private snackBar: MatSnackBar,
        private _resolucionService: ResolucionesService,
        private _userService: UserService,

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
        
        // Create the selected maduritylevel form
        this.resolucionForm = this._formBuilder.group({
            fecha: [''],
            idTramite: [''],
            requisitos: [[]],
            solicitante: [''],
            tramite: [''],
            idEstado_tramite:[''],
            idTramite_detalle: [''],
            archivo: [''],
            nro_tramite:[''],
            idTipo_tramite_unidad:[''],
        });

        this._userService.user$
        .pipe((takeUntil(this._unsubscribeAll)))
        .subscribe((user: User) => {

            this.user = user;
        });
        
        this._resolucionService.tramite$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((resolucion: TramitesResolucionesInterface) => {
          
                // Get the grado
                this.resolucion = resolucion;
                this.requisitos = resolucion.requisitos;

                // Patch values to the form
                this.resolucionForm.patchValue(resolucion);

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
    
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
