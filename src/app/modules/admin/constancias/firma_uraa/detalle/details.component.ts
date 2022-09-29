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
import { ConstanciasService } from 'app/modules/admin/constancias/constancias.service';
import { ConstanciaInterface } from 'app/modules/admin/constancias/constancias.types';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import moment from 'moment';
// import { RequisitosDialogComponent } from '../../asignados/dialogReq/dialogReq.component';
import { ConstanciaFirmaURAAVisorPdfComponent } from '../visorPdf/visorPdfConstanciaFirmaUraa.component';
// import { VisorImagenComponent } from '../visorImagen/visorImagen.component';
import { environment } from 'environments/environment';

@Component({
    selector       : 'constancia-firma-uraa-details',
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
export class ConstanciaFirmaURAADetalleComponent implements OnInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatAccordion) private _accordion: MatAccordion;
    @ViewChild(MatSort) private _sort: MatSort;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    constancia: ConstanciaInterface | null = null;
    allconstancias: ConstanciaInterface[];
    constanciaForm: FormGroup;
    contador: number = 4;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    newConstancia: boolean = false;
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _constanciaService: ConstanciasService,
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

    // limiteFecha(): void {
    //     const now = moment();
    //     this.maxDate = now;
    // }
    /**
     * On init
     */
    ngOnInit(): void
    {
        // this.limiteFecha();
        // this.selectedGap = true;
        // Create the selected maduritylevel form
        this.constanciaForm = this._formBuilder.group({
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

        // Get the constancias
        // this._constanciaService.allconstancias$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((allconstancias: ConstanciaInterface[]) => {
        //         this.allconstancias = allconstancias;
        //         console.log(allconstancias);

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Get the constancia
        this._constanciaService.constancia$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((constancia: ConstanciaInterface) => {
                console.log(constancia);
                // Get the constancia
                this.constancia = constancia;
                // this.constancia.fut = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
                // this.constancia.voucher = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
                // this.constancia.requisitos[0].archivo = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
                // this.constancia.requisitos[0].nombre = 'PRUEBA';

                // Patch values to the form
                this.constanciaForm.patchValue(constancia);

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

    // rechazarRequisitos(): void {
    //     for (const itera of this.constancia.requisitos) {
    //         itera['selected'] = false;
    //     }
    //     const dialogRef = this.visordialog.open(RequisitosDialogComponent, {
    //         autoFocus: false,
    //         disableClose: true,
    //         data: JSON.parse( JSON.stringify( {
    //             requisitos: this.constancia.requisitos
    //         } ))
    //     });
    //     dialogRef.afterClosed().subscribe( (response) => {
    //         // If the confirm button pressed...
    //         if ( response )
    //         {
    //             console.log(response.getRawValue().requisitos);
    //             this.constancia.requisitos = response.getRawValue().requisitos;
    //             console.log(this.constancia.requisitos);
    //             this.constanciaForm.patchValue({ requisitos: response.getRawValue().requisitos});
    //             console.log(this.constanciaForm.getRawValue());
    //             // Mark for check
    //             this._changeDetectorRef.markForCheck();
    //         }
    //     });
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    selectConstancia(event): void {
        const files = event.target.files[0];
        this.constanciaForm.patchValue({archivo: files});
        console.log(this.constanciaForm);
        this.newConstancia = true;
    }
    verDocumento(): void {
        console.log(this.constanciaForm.getRawValue());
        const respDial = this.visordialog.open(
            ConstanciaFirmaURAAVisorPdfComponent,
            {
                data: this.constanciaForm.getRawValue(),
                disableClose: true,
                minWidth: '50%',
                maxWidth: '60%'
            }
        );
    }
    uploadConstancia(): void{
        const data={
            idTramite: this.constanciaForm.getRawValue().idTramite,
            archivo: this.constanciaForm.getRawValue().archivo,
        };
        console.log(data);
        const formData = new FormData();
        formData.append('idTramite', data.idTramite);
        formData.append('archivo', data.archivo);
        console.log(formData.getAll);
        // debugger;
        this._constanciaService.uploadConstancia(data.idTramite,formData).subscribe((newMadurity) => {
            console.log(newMadurity);
            // Toggle the edit mode off
            //this.toggleEditMode(false);
            // Re-enable the form
            this.constanciaForm.enable();
            // Go to new product
            //this.createFormulario(this.user);
            this.alert = {
                type   : 'success',
                message: 'Constancia cargado correctamente',
                title: 'Guardado'
            };
            this.openSnack();
            this.newConstancia = false;
            // Mark for check
            this._changeDetectorRef.markForCheck();
        },
        (error) => {
            // console.log(error);
            // Re-enable the form
            this.constanciaForm.enable();
            this.alert = {
                type   : 'warn',
                message: 'Error al registrar',
                title: 'Error'
            };
            this.openSnack();
        });
    }
    verConstancia(): string{
        return environment.baseUrl + 'constancia/'+this.constanciaForm.getRawValue().idTramite;
    }
    /**
     * Create formulario
     */
    // createFormulario(data): void
    // {
    //     //Create the formulario
    //     const newConstancia = {
    //         idModalidad_grado: 0,
    //         idFacultad: 0,
    //         idEscuela: 0,
    //         idTipo_constancia: 0,
    //         nro_documento: this.user.nro_documento,
    //         idColacion: 1,
    //         idEstado_constancia: 0,
    //         descripcion_estado: '',
    //         comentario: '',
    //         codigo: '',
    //         entidad: '',
    //         nro_operacion: '',
    //         fecha_operacion: '',
    //         idMotivo_constancia: 0,
    //         archivo: '',
    //         apellidos: data.apellidos.toUpperCase(),
    //         nombres: data.nombres.toUpperCase(),
    //         documento: data.documento,
    //         celular: data.celular,
    //         correo: data.correo,
    //         nro_matricula: data.nro_matricula,
    //         sede: data.sede,
    //         tipo_documento: data.tipo_documento,
    //         sexoNombre: data.sexoNombre,
    //         idUnidad: -1,
    //         idTipo_constancia_unidad: -1,
    //         archivo_firma: '',
    //         archivoImagen: '',
    //         requisitos: ''
    //     };
    //     this.constanciaForm.patchValue(newConstancia);
    //     this.data = newConstancia;
    // }

    // selectedTipoConstancia(id: number): void {
    //   this.constanciaForm.patchValue({idTipo_constancia: id,idUnidad: 0});
    //   this.data.idTipo_constancia = id;
    //   this.data.idUnidad = 0;
    // }

    // selectedUnidad(id): void{
    //     this.constanciaForm.patchValue({idUnidad: id, idTipo_constancia_unidad: 0, archivo: ''});
    //     this.data.idUnidad = id;
    //     this.data.idTipo_constancia_unidad = 0;
    //     this.data.archivo = '';
    //     this._constanciaService.getTipoConstanciaUnidades(this.data.idTipo_constancia, this.data.idUnidad).subscribe((resp)=>{
    //         // this.requisitos = resp.requisitos;
    //         // this.data.requisitos = resp.requisitos;
    //         this.tipoConstanciaUnidades = resp.tipo_constancia_unidad;
    //         // this.constanciaForm.patchValue({requisitos: resp.requisitos});
    //         this._changeDetectorRef.markForCheck();
    //     });

    //     this._constanciaService.getFacultadesEscuelas(this.data.idUnidad).subscribe((resp)=>{
    //         if (resp) {
    //             console.log(resp);
    //             this.facultades = resp.facultades;
    //             const idU = this.facultades[0];
    //             console.log(idU);
    //             this.data.idFacultad = idU.idDependencia;
    //             if (idU) {
    //                 const idE = idU.escuelas[0];
    //                 console.log(idE);
    //                 this.data.idEscuela = idE.idEscuela;
    //                 this.data.codigo = idE.nro_matricula;
    //                 this.data.sede = idE.sede;
    //                 this.constanciaForm.patchValue({idEscuela: idE.idEscuela, codigo: idE.nro_matricula, sede: idE.sede});
    //             }
    //             console.log(this.facultades);
    //             console.log(this.data);
    //             this.constanciaForm.patchValue({idFacultad: idU.idDependencia});
    //             let first = this.facultades.find(first => first.idDependencia === this.data.idFacultad);
    //             if (first) {
    //                 this.escuelas = first.escuelas;
    //                 console.log(this.escuelas);
    //             }
    //         }else{
    //             this.alert = {
    //                 type   : 'warn',
    //                 message: 'Acceso denegado',
    //                 title: 'Error'
    //             };
    //             this.openSnack();
    //         }
    //     },
    //     (error) => {
    //         // console.log(error);
    //         this.alert = {
    //             type   : 'warn',
    //             message: 'Error en la unidad',
    //             title: 'Error'
    //         };
    //         this.openSnack();
    //     });
    //     this._changeDetectorRef.markForCheck();
    // }

    // selectedFacultad(id): void{
    //     //falta probar si funciona ya q solo hay una sola facultad
    //     console.log(id);
    //     this.data.idFacultad = id;
    //     let first = this.facultades.find(first => first.idDependencia === this.data.idFacultad);
    //     if (first) {
    //         const idE = first.escuela[0];
    //         if (idE) {
    //             this.data.idEscuela = idE.idEscuela;
    //             this.data.codigo = idE.nro_matricula;
    //             this.data.sede = idE.sede;
    //             this.constanciaForm.patchValue({idEscuela: idE.idEscuela, codigo: idE.nro_matricula, sede: idE.sede});
    //         }
    //         this.escuelas = first.escuela;
    //         console.log(this.escuelas);
    //         console.log(idE);
    //     }
    // }

    // selectedEscuela(id): void {
    //     console.log(id);
    //     this.data.idEscuela = id;
    //     for (const itera of this.escuelas) {
    //         if (itera.idEscuela === id) {
    //             this.data.codigo = itera.nro_matricula;
    //             this.data.sede = itera.sede;
    //         }
    //     }
    //     this.constanciaForm.patchValue({idEscuela: id, codigo: this.data.codigo, sede: this.data.sede});
    // }

    // selectedTipoConstanciaUnidades(id): void{
    //     const tipo = this.tipoConstanciaUnidades.find(element => element.idTipo_constancia_unidad === id);
    //     this.costo = tipo.costo;
    //     this.constanciaForm.patchValue({ idTipo_constancia_unidad: id});
    //     this.data.idTipo_constancia_unidad = id;
    //     this._constanciaService.getRequisitos(id).subscribe((resp)=>{
    //       this.requisitos = resp.requisitos;
    //       this.data.requisitos = resp.requisitos;
    //       this.constanciaForm.patchValue({requisitos: resp.requisitos});
    //       this._changeDetectorRef.markForCheck();
    //     });
    // }

    // selectFiles(event): void {
    //     const files = event.target.files[0];
    //     console.log(files);
    //     this.constanciaForm.patchValue({archivo: files});
    //     this.data.archivo = files;
    // }

    // selectFirma(event): void {
    //     const files = event.target.files[0];
    //     console.log(files);
    //     this.constanciaForm.patchValue({archivo_firma: files, archivoImagen: files});
    //     this.data.archivo_firma = files;
    //     this.data.archivoImagen = files;
    // }

    // selectReqDocumento(event, req): void {
    //     const files = event.target.files[0];
    //     console.log(files);
    //     console.log(req);
    //     for (const requ of this.requisitos) {
    //         if (requ.idRequisito === req.idRequisito) {
    //             requ['archivo'] = files;
    //         }
    //     }
    //     this.data.requisitos = this.requisitos;
    //     this.constanciaForm.patchValue({requisitos: this.requisitos});
    //     console.log(this.data.requisitos);
    // }

    // selectReqImagen(event, req): void {
    //     const files = event.target.files[0];
    //     console.log(files);
    //     console.log(req);
    //     for (const requ of this.requisitos) {
    //         if (requ.idRequisito === req.idRequisito) {
    //             requ['archivoImagen'] = files;
    //         }
    //     }
    //     this.data.requisitos = this.requisitos;
    //     this.constanciaForm.patchValue({requisitos: this.requisitos});
    //     console.log(this.data.requisitos);
    // }

    // verReqDocumento(req): void {
    //     console.log(req);
    //     const respDial = this.visordialog.open(
    //         VisorPdfComponent,
    //         {
    //             data: req,
    //             disableClose: true,
    //             minWidth: '50%',
    //             maxWidth: '60%'
    //         }
    //     );
    // }

    // verReqImagen(req): void {
    //     console.log(this.data);
    //     const respDial = this.visordialog.open(
    //         VisorImagenComponent,
    //         {
    //             data: req,
    //             disableClose: true,
    //             width: '60%'
    //         }
    //     );
    // }

    // verImagen(): void {
    //     console.log(this.data);
    //     const respDial = this.visordialog.open(
    //         VisorImagenComponent,
    //         {
    //             data: this.data,
    //             disableClose: true,
    //             width: '60%'
    //         }
    //     );
    // }

    // verDocumento(): void {
    //     console.log(this.data);
    //     const respDial = this.visordialog.open(
    //         VisorPdfComponent,
    //         {
    //             data: this.data,
    //             disableClose: true,
    //             minWidth: '50%',
    //             maxWidth: '60%'
    //         }
    //     );
    // }

    // createConstancia(): void{
    //     // If the confirm button pressed...
    //     if (this.constanciaForm.invalid) {
    //         this.constanciaForm.markAllAsTouched();
    //         console.log('hola');
    //         return;
    //     }
    //     const requis = this.data.requisitos.find(element => element.archivo === undefined && element.extension === 'pdf');
    //     if (requis) {
    //         this.alert = {
    //             type   : 'warn',
    //             message: 'Cargar el archivo en el requisito: ' + requis.descripcion,
    //             title: 'Error'
    //         };
    //         this.openSnack();
    //     }
    //     console.log(this.constanciaForm.getRawValue());
    //     const constancia = {
    //         entidad: this.constanciaForm.getRawValue().entidad,
    //         nro_operacion: this.constanciaForm.getRawValue().nro_operacion,
    //         fecha_operacion: this.constanciaForm.getRawValue().fecha_operacion,
    //         archivo: this.constanciaForm.getRawValue().archivo,
    //         idTipo_constancia_unidad: this.constanciaForm.getRawValue().idTipo_constancia_unidad,
    //         idUnidad: this.constanciaForm.getRawValue().idUnidad,
    //         idDependencia: this.constanciaForm.getRawValue().idFacultad,
    //         idDependencia_detalle: this.constanciaForm.getRawValue().idEscuela,
    //         nro_matricula: this.constanciaForm.getRawValue().codigo,
    //         sede: this.constanciaForm.getRawValue().sede,
    //         archivo_firma: this.constanciaForm.getRawValue().archivo_firma,
    //         idMotivo_constancia: this.constanciaForm.getRawValue().idMotivo_constancia,
    //         comentario: this.constanciaForm.getRawValue().comentario,
    //         requisitos: this.constanciaForm.getRawValue().requisitos,
    //     };
    //     const cadena = (new Date(constancia.fecha_operacion)).toISOString();
    //     console.log(cadena);
    //     const cadena1 = cadena.substring(0,10);
    //     const cadena2 = cadena.substring(11,19);
    //     const fecha = cadena1 + ' ' + cadena2;
    //     constancia.fecha_operacion = fecha;
    //     console.log(constancia);
    //         const formData = new FormData();
    //         formData.append('entidad', constancia.entidad);
    //         formData.append('nro_operacion', constancia.nro_operacion);
    //         formData.append('fecha_operacion', constancia.fecha_operacion);
    //         formData.append('archivo', constancia.archivo);
    //         formData.append('idTipo_constancia_unidad', constancia.idTipo_constancia_unidad);
    //         formData.append('idUnidad', constancia.idUnidad);
    //         formData.append('idDependencia', constancia.idDependencia);
    //         formData.append('idDependencia_detalle', constancia.idDependencia_detalle);
    //         formData.append('nro_matricula', constancia.nro_matricula);
    //         formData.append('sede', constancia.sede);
    //         formData.append('archivo_firma', constancia.archivo_firma);
    //         formData.append('idMotivo_constancia', constancia.idMotivo_constancia);
    //         formData.append('comentario', constancia.comentario);
    //         constancia.requisitos.forEach((element) => {
    //             formData.append('requisitos[]', JSON.stringify(element));
    //             if (element.idRequisito && element.extension === 'pdf') {
    //                 formData.append('files[]', element.archivo);
    //             }
    //             if (element.idRequisito && element.extension === 'jpg') {
    //                 formData.append('files[]', element.archivoImagen);
    //             }
    //           });
    //         console.log(formData.getAll('requisitos'));
    //         console.log(formData.getAll('files'));
    //         // Disable the form
    //         this.constanciaForm.disable();

    //         this._constanciaService.createConstancia(formData).subscribe((newMadurity) => {
    //             console.log(newMadurity);
    //             // Toggle the edit mode off
    //             //this.toggleEditMode(false);

    //             // Re-enable the form
    //             this.constanciaForm.enable();

    //             // Go to new product
    //             this.createFormulario(this.user);

    //             this.alert = {
    //                 type   : 'success',
    //                 message: 'Trámite registrado correctamente',
    //                 title: 'Guardado'
    //             };
    //             this.openSnack();

    //             // Mark for check
    //             this._changeDetectorRef.markForCheck();
    //         },
    //         (error) => {
    //             // console.log(error);

    //             // Re-enable the form
    //             this.constanciaForm.enable();

    //             this.alert = {
    //                 type   : 'warn',
    //                 message: 'Error al registrar',
    //                 title: 'Error'
    //             };
    //             this.openSnack();
    //         });
    // }
}
