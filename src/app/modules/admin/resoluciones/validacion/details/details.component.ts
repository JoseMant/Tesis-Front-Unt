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
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import moment from 'moment';
import { TramitesResolucionesInterface } from '../../resoluciones.types';
import { ActivatedRoute, Router } from '@angular/router';
import { ResolucionesService } from '../../resoluciones.service';
import { RequisitosDialogComponent } from '../dialogReq/dialogReq.component';
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
export class ResolucionValidarDetalleComponent implements OnInit, OnDestroy
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
        private _activatedRoute: ActivatedRoute,

        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        public visordialog: MatDialog,
        private snackBar: MatSnackBar,
        private _router: Router,
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
        this.resolucionForm = this._formBuilder.group({
            // codigo: [''],
            // correo: [''],
            // escuela: [''],
            // facultad: [''],
            fecha: [''],
            // fut: [''],
            idTramite: [''],
            // motivo: [''],
            // nro_documento: [''],
            // nro_matricula: [''],
            requisitos: [[]],
            solicitante: [''],
            tramite: [''],
            // voucher: [''],
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
                this.resolucionForm.patchValue(resolucion);
                
                // Get the grado
                this.resolucion = resolucion;
                this.requisitos = resolucion.requisitos;                
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

    selectReqDocumento(event, req): void {
        const requisito = this.resolucionForm.getRawValue().requisitos.find(item => item.idRequisito === req.idRequisito);
        requisito['archivoPdf'] = event.target.files[0];
    }

    validarRequisito(requisito, lectura, index): void {
        requisito['lectura'] = lectura;
        const dialogRef = this.visordialog.open(RequisitosDialogComponent, {
            autoFocus: false,
            disableClose: true,
            data: JSON.parse( JSON.stringify(requisito) )
        });
        //--------- desde aquí falta 
        dialogRef.afterClosed().subscribe( (response) => {
            // If the confirm button pressed...
            if ( response )
            {
                this.resolucion.requisitos[index].des_estado_requisito = response.getRawValue().des_estado_requisito;
                if (requisito.des_estado_requisito == 'APROBADO') {
                    this.resolucion.requisitos[index].validado = 1;
                } else if (requisito.des_estado_requisito == 'RECHAZADO') {
                    this.resolucion.requisitos[index].validado = 0;
                    this.resolucion.requisitos[index].comentario = response.getRawValue().comentario;
                }
                this.resolucionForm.patchValue({ requisitos: this.resolucion.requisitos});
                
                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });
    }
    updateRequisitos(): void
    {
        // Get the contact object
        const resolucion = this.resolucionForm.getRawValue();
        // Disable the form
        this.resolucionForm.disable();
        
        // Update the contact on the server
        this._resolucionService.updateRequisitos(resolucion.idTramite, resolucion).subscribe(() => {

            // Re-enable the form
            this.resolucionForm.enable();

            // Show a success message
            this.alert = {
                type   : 'success',
                message: 'Trámite actualizado correctamente',
                title: 'Guardado'
            };
            this.openSnack();
            
            this._router.navigate(['./..'], {relativeTo: this._activatedRoute});
            
            // Mark for check
            this._changeDetectorRef.markForCheck();
        },(response) => {

            // Re-enable the form
            this.resolucionForm.enable();

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
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    // rechazarDocente(){
    //     this._resolucionService.rechazarDocente(this.docente.idTramite).subscribe((newTramite) => {
            
    //         // Re-enable the form
    //         this.tramiteForm.enable();

    //         this._router.navigate(['./..'], {relativeTo: this._activatedRoute});

    //         // Go to new product
    //         // this.createFormulario(this.user);

    //         this.alert = {
    //             type   : 'success',
    //             message: 'Resolución rechazada',
    //             title: 'Guardado'
    //         };
    //         this.openSnack();

    //         // Mark for check
    //         this._changeDetectorRef.markForCheck();
    //     },
    //     (response) => {

    //         // Re-enable the form
    //         this.tramiteForm.enable();

    //         this.alert = {
    //             type   : 'warn',
    //             message: response.error.message,
    //             title: 'Error'
    //         };
    //         this.openSnack();
    //     });
    // }


    // validarTramite(): void{
    //     // If the confirm button pressed...
    //     if (this.tramiteForm.invalid) {
    //         this.tramiteForm.markAllAsTouched();
    //         this.alert = {
    //             type   : 'warn',
    //             message: 'Datos incorrectos',
    //             title: 'Error'
    //         };
    //         this.openSnack();
    //         return;
    //     }
        
    //     const formData = new FormData();
    //     const tramite = this.tramiteForm.getRawValue();
    //     // formData.append('archivo', tramite.archivoPdf);
    //     formData.append('idTramite', tramite.idTramite);
    //     formData.append('apellidos', tramite.apellidos);
    //     formData.append('nombres', tramite.nombres);
    //     formData.append('idProfesion', tramite.idProfesion);
    //     formData.append('sexo', tramite.sexo);
    //     formData.append('fecha_nacimiento',(new Date(tramite.fecha_nacimiento)).toISOString().substring(0,10));
    //     formData.append('direccion', tramite.direccion);
    //     formData.append('idPais', tramite.idPais);
    //     formData.append('dni', tramite.dni);
    //     formData.append('telefono', tramite.telefono);
    //     formData.append('celular', tramite.celular);
    //     formData.append('correo', tramite.correo);
    //     if(tramite.correounitru){
    //     formData.append('correounitru', tramite.correounitru);
    //     }
    //     if(tramite.per_login){
    //         formData.append('per_login', tramite.per_login);
    //     }
    //     formData.append('jefe', tramite.jefe);
    //     formData.append('idDependencia', tramite.idDependencia);
    //     formData.append('idDepartamento', tramite.idDepartamento);
    //     formData.append('idSede', tramite.idSede);
    //     formData.append('idCondicion', tramite.idCondicion);
    //     formData.append('idCategoria', tramite.idCategoria);
    //     formData.append('idDedicacion', tramite.idDedicacion);
        
    //     // Disable the form
    //     this.tramiteForm.disable();
        
    //     this._docenteService.validarDocente(formData).subscribe((newTramite) => {
            
    //         // Re-enable the form
    //         this.tramiteForm.enable();

    //         this._router.navigate(['./..'], {relativeTo: this._activatedRoute});

    //         // Go to new product
    //         // this.createFormulario(this.user);

    //         this.alert = {
    //             type   : 'success',
    //             message: 'Docente validado correctamente',
    //             title: 'Guardado'
    //         };
    //         this.openSnack();

    //         // Mark for check
    //         this._changeDetectorRef.markForCheck();
    //     },
    //     (response) => {

    //         // Re-enable the form
    //         this.tramiteForm.enable();

    //         this.alert = {
    //             type   : 'warn',
    //             message: response.error.message,
    //             title: 'Error'
    //         };
    //         this.openSnack();
    //     });
    // }
}
