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
import { TramitesDocenteInterface } from '../../docente.types';
import { ActivatedRoute, Router } from '@angular/router';


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
export class DocenteValidadicionesDetalleComponent implements OnInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatAccordion) private _accordion: MatAccordion;
    @ViewChild(MatSort) private _sort: MatSort;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    tramiteForm: FormGroup;
    requisitos: any;
    requisitosCount: number = 0;
    maxDate: any;

    docente:TramitesDocenteInterface | null = null;
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
        private _docenteService: DocenteService,
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
        this.tramiteForm = this._formBuilder.group({
            idTramite : [''],
            apellidos: ['',[Validators.required,Validators.maxLength(60)]],
            nombres: ['',[Validators.required,Validators.maxLength(60)]],


            idProfesion: ['',[Validators.required]],
            idPais:[51,[Validators.required]],
            sexo: ['',[Validators.required]],
            fecha_nacimiento: ['',[Validators.required]],
            direccion: ['',[Validators.required,Validators.maxLength(200)]],
            dni: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
            telefono: ['',[Validators.required,Validators.maxLength(9)]],
            celular: ['',[Validators.required,Validators.maxLength(9)]],
            correo: ['',[Validators.required,Validators.email]],
            correounitru: [' ',[Validators.email]],

            jefe: ['',[Validators.required]],
            idDependencia: ['',[Validators.required]],
            idDepartamento: ['',[Validators.required]],
            idSede: ['',[Validators.required]],
            idCondicion: ['',[Validators.required]],
            idCategoria: ['',[Validators.required]],
            idDedicacion: ['',[Validators.required]],
            requisitos: ['']

        });

       
        this._docenteService.docente$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((docente: TramitesDocenteInterface) => {
                
                // Get the grado
                this.docente = docente;
                this.requisitos = docente.requisitos;
                // Patch values to the form
                
                this.tramiteForm.patchValue(docente);

                this.changedDependencia(docente.idDependencia);
                
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


        this._docenteService.profesiones$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((profesiones: any) => {
                this.profesiones = profesiones;
                
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

            this._docenteService.paises$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((paises: any) => {
                this.paises = paises;
                
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

         this._docenteService.sedes$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((sedes: any) => {
                this.sedes = sedes;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

            this._docenteService.categorias$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((categorias: any) => {
                this.categorias = categorias;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

            this._docenteService.dependenciasSGA$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((_dependenciasSGA: any) => {
                this.dependenciasSGA = _dependenciasSGA;
            
                // Mark for check
                this._changeDetectorRef.markForCheck();
           
            });
            
            this._docenteService.dedicacionesDocente$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((dedicacionesDocente: any) => {
                this.dedicacionesDocente = dedicacionesDocente;

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

    validateFormatLetter(event) {
        let key;
        if (event.type === 'paste') {
          key = event.clipboardData.getData('text/plain');
        } else {
          key = event.keyCode;
          key = String.fromCharCode(key);
        }
        const regex = /[A-Za-z]|\./;
         if (!regex.test(key)) {
          event.returnValue = false;
           if (event.preventDefault) {
            event.preventDefault();
           }
         }
    }

    changedDependencia(dependencia: number) : void {
    
        this._docenteService.DepartamentosByDependencia(dependencia).subscribe((response)=>{
            this.departamentos = response;

            this._changeDetectorRef.markForCheck();
        });
    }
    
    selectReqDocumento(event, req): void {
        const requisito = this.tramiteForm.getRawValue().requisitos.find(item => item.idRequisito === req.idRequisito);
        requisito['archivoPdf'] = event.target.files[0];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    rechazarDocente(){
        this._docenteService.rechazarDocente(this.docente.idTramite).subscribe((newTramite) => {
            
            // Re-enable the form
            this.tramiteForm.enable();

            this._router.navigate(['./..'], {relativeTo: this._activatedRoute});

            // Go to new product
            // this.createFormulario(this.user);

            this.alert = {
                type   : 'success',
                message: 'Docente rechazado',
                title: 'Guardado'
            };
            this.openSnack();

            // Mark for check
            this._changeDetectorRef.markForCheck();
        },
        (response) => {

            // Re-enable the form
            this.tramiteForm.enable();

            this.alert = {
                type   : 'warn',
                message: response.error.message,
                title: 'Error'
            };
            this.openSnack();
        });
    }


    validarTramite(): void{
        // If the confirm button pressed...
        if (this.tramiteForm.invalid) {
            this.tramiteForm.markAllAsTouched();
            this.alert = {
                type   : 'warn',
                message: 'Datos incorrectos',
                title: 'Error'
            };
            this.openSnack();
            return;
        }
        
        const formData = new FormData();
        const tramite = this.tramiteForm.getRawValue();
        // formData.append('archivo', tramite.archivoPdf);
        formData.append('idTramite', tramite.idTramite);
        formData.append('apellidos', tramite.apellidos);
        formData.append('nombres', tramite.nombres);
        formData.append('idProfesion', tramite.idProfesion);
        formData.append('sexo', tramite.sexo);
        formData.append('fecha_nacimiento',(new Date(tramite.fecha_nacimiento)).toISOString().substring(0,10));
        formData.append('direccion', tramite.direccion);
        formData.append('idPais', tramite.idPais);
        formData.append('dni', tramite.dni);
        formData.append('telefono', tramite.telefono);
        formData.append('celular', tramite.celular);
        formData.append('correo', tramite.correo);
        if(tramite.correounitru){
        formData.append('correounitru', tramite.correounitru);
        }
        formData.append('jefe', tramite.jefe);
        formData.append('idDependencia', tramite.idDependencia);
        formData.append('idDepartamento', tramite.idDepartamento);
        formData.append('idSede', tramite.idSede);
        formData.append('idCondicion', tramite.idCondicion);
        formData.append('idCategoria', tramite.idCategoria);
        formData.append('idDedicacion', tramite.idDedicacion);
        
        // Disable the form
        this.tramiteForm.disable();
        
        this._docenteService.validarDocente(formData).subscribe((newTramite) => {
            
            // Re-enable the form
            this.tramiteForm.enable();

            this._router.navigate(['./..'], {relativeTo: this._activatedRoute});

            // Go to new product
            // this.createFormulario(this.user);

            this.alert = {
                type   : 'success',
                message: 'Docente validado correctamente',
                title: 'Guardado'
            };
            this.openSnack();

            // Mark for check
            this._changeDetectorRef.markForCheck();
        },
        (response) => {

            // Re-enable the form
            this.tramiteForm.enable();

            this.alert = {
                type   : 'warn',
                message: response.error.message,
                title: 'Error'
            };
            this.openSnack();
        });
    }
}
