/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { fuseAnimations } from '@fuse/animations';
import { DocenteService } from 'app/modules/admin/docente/docente.service';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';
import moment from 'moment';
import { TramitesDocenteInterface } from '../../docente.types';
import { ActivatedRoute, Router } from '@angular/router';
import { VisorPdfDocenteComponent } from 'app/modules/admin/docente/visorPdf/visorPdfDocente.component';
import { isUndefined } from 'lodash';


@Component({
    selector       : 'tramites-oficio',
    templateUrl    : './details.component.html',
    styles         : [
        /* language=SCSS */
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations
})
export class RegistrarDocenteDetalleComponent implements OnInit, OnDestroy
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
    searchInputControl: FormControl = new FormControl('');
    

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _matDialog: MatDialog,
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
            telefono: ['',[Validators.maxLength(9)]],
            celular: ['',[Validators.required,Validators.maxLength(9)]],
            correo: ['',[Validators.required,Validators.email]],
            correounitru: ['',[Validators.email]],

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
                if(!docente.idPais){
                    this.docente.idPais=51;
                }
                this.requisitos = docente.requisitos;
                
                // Patch values to the form
                this.tramiteForm.patchValue(this.docente);
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
                
                // this.getUnidadByDependencia(1);
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
        key=key.replace(/[0-9]/g, '');
        } else {
          key = event.keyCode;
          key = String.fromCharCode(key);
        }
        

        const regex = /[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+|\./;
         if (!regex.test(key)) {
          event.returnValue = false;
           if (event.preventDefault) {
            event.preventDefault();
           }
         }
         key=key.toUpperCase();
         

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
    
    verReqDocumento(req): void {
        const respDial = this.visordialog.open(
            VisorPdfDocenteComponent,
            {
                data: req,
                disableClose: true,
                minWidth: '50%',
                maxWidth: '60%'
            }
        );
    }

    buscarDocente(){
    
        if (this.searchInputControl.value) {
            this._docenteService.getDocenteByCodigo(this.searchInputControl.value,this.docente.nro_tramite).subscribe(
                (docente) => {
                         
                    // console.log(docente)
                    this._docenteService.docente$
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((docente: TramitesDocenteInterface) => {
    
                        // Get the grado
                        this.docente = docente;
                        this.docente.idPais=Number(this.docente.idPais);
                        this.requisitos = docente.requisitos;
                        // Patch values to the form
                        this.tramiteForm.patchValue(this.docente);
                        console.log(this.tramiteForm.getRawValue());
                        this.changedDependencia(docente.idDependencia);
                        
                        // Mark for check
                        this._changeDetectorRef.markForCheck();
                    });
                         
                         this.searchInputControl.disable()
                
                         // Mark for check
                         this._changeDetectorRef.markForCheck();
    
                    if(docente.apellidos){
                        // Config the alert
                        this.alert = {
                            type   : 'success',
                            message:"Docente encontrado",
                            title: 'Encontrado'
                        }
                        this.openSnack();
                        // Mark for check
                        this._changeDetectorRef.markForCheck();
                    }else{         
                        // Config the alert
                        this.alert = {
                            type   : 'error',
                            message:"Docente no econtrado",
                            title: 'Error'
                        }
                        this.openSnack();
                        // Mark for check
                        this._changeDetectorRef.markForCheck();
                    };
          
                }
            );
        }else{
            // Config the alert
            this.alert = {
                type   : 'error',
                message:"Ingrese código",
                title: 'Error'
            }
            this.openSnack();
            // Mark for check
            this._changeDetectorRef.markForCheck();
        }
        
    }

    limpiarDocente(){
        this.tramiteForm.reset();
        this.searchInputControl.setValue("");
        this.searchInputControl.enable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    createTramite(): void{

        console.log(this.tramiteForm.getRawValue().correounitru);
        if (this.tramiteForm.getRawValue().correounitru==null) {
            this.tramiteForm.get('correounitru').setValue("");
        }
        console.log(this.tramiteForm.getRawValue().correounitru);
    
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

        const data={
            requisitos: this.tramiteForm.getRawValue().requisitos,
        };
        
        const formData = new FormData();

        data.requisitos.forEach((element) => {
            formData.append('requisitos[]', JSON.stringify(element));
            if (element.idRequisito && element.extension === 'pdf') {
                if (element.archivoPdf) {
                    formData.append('files[]', element.archivoPdf);
                } else {
                    formData.append('files[]', new File([""], "vacio.kj"));
                }
            }
            if (element.idRequisito && element.extension === 'jpg') {
                formData.append('files[]', new File([""], "vacio.kj"));
            }
        });

        // formData.append('archivo', this.tramiteForm.getRawValue().archivoPdf);
        formData.append('idTramite', this.tramiteForm.getRawValue().idTramite);
        formData.append('apellidos', this.tramiteForm.getRawValue().apellidos);
        formData.append('nombres', this.tramiteForm.getRawValue().nombres);
        formData.append('idProfesion', this.tramiteForm.getRawValue().idProfesion);
        formData.append('sexo', this.tramiteForm.getRawValue().sexo);
        formData.append('fecha_nacimiento',(new Date(this.tramiteForm.getRawValue().fecha_nacimiento)).toISOString().substring(0,10));
        formData.append('direccion', this.tramiteForm.getRawValue().direccion);
        formData.append('idPais', this.tramiteForm.getRawValue().idPais);
        formData.append('dni', this.tramiteForm.getRawValue().dni);
        formData.append('telefono', this.tramiteForm.getRawValue().telefono);
        formData.append('celular', this.tramiteForm.getRawValue().celular);
        formData.append('correo', this.tramiteForm.getRawValue().correo);
        formData.append('correounitru', this.tramiteForm.getRawValue().correounitru);
        formData.append('jefe', this.tramiteForm.getRawValue().jefe);
        formData.append('idDependencia', this.tramiteForm.getRawValue().idDependencia);
        formData.append('idDepartamento', this.tramiteForm.getRawValue().idDepartamento);
        formData.append('idSede', this.tramiteForm.getRawValue().idSede);
        formData.append('idCondicion', this.tramiteForm.getRawValue().idCondicion);
        formData.append('idCategoria', this.tramiteForm.getRawValue().idCategoria);
        formData.append('idDedicacion', this.tramiteForm.getRawValue().idDedicacion);

        
        // Disable the form
        this.tramiteForm.disable();
        
        this._docenteService.createDocente(formData).subscribe((newTramite) => {
            
            // Re-enable the form
            this.tramiteForm.enable();

            this._router.navigate(['./..'], {relativeTo: this._activatedRoute});

            // Go to new product
            // this.createFormulario(this.user);

            this.alert = {
                type   : 'success',
                message: 'Docente registrado correctamente',
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
