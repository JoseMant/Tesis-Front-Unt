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
import { GradosService } from 'app/modules/admin/grados/grados.service';
import { GradoInterface } from 'app/modules/admin/grados/grados.types';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import moment from 'moment';
// import { RequisitosDialogComponent } from '../../asignados/dialogReq/dialogReq.component'; comentado por ahora
// import { VisorPdfComponent } from '../visorPdf/visorPdf.component';
// import { VisorImagenComponent } from '../visorImagen/visorImagen.component';

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
export class GradoValidadoDetalleComponent implements OnInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatAccordion) private _accordion: MatAccordion;
    @ViewChild(MatSort) private _sort: MatSort;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    grado: GradoInterface | null = null;
    allgrados: GradoInterface[];
    gradoForm: FormGroup;
    contador: number = 4;
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
        this.gradoForm = this._formBuilder.group({
            idTipo_grado: [''],
            nro_documento: [''],
            idColacion: [''],
            idEstado_grado: [''],
            idModalidad_grado: [''],
            descripcion_estado: [''],
            codigo: [''],
            entidad: ['', Validators.required],
            nro_operacion: ['', [Validators.maxLength(6), Validators.pattern(/^[0-9]+$/),Validators.required]],
            fecha_operacion: ['', Validators.required],
            archivo: [''],
            idMotivo_grado: [''],
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
            idTipo_grado_unidad: [''],
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
                console.log(grado);
                // Get the grado
                this.grado = grado;
                // this.grado.fut = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
                // this.grado.voucher = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
                // this.grado.requisitos[0].archivo = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
                // this.grado.requisitos[0].nombre = 'PRUEBA';

                // Patch values to the form
                this.gradoForm.patchValue(grado);

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

    rechazarRequisitos(): void {
        // for (const itera of this.grado.requisitos) {
        //     itera['selected'] = false;
        // }
        // const dialogRef = this.visordialog.open(RequisitosDialogComponent, {
        //     autoFocus: false,
        //     disableClose: true,
        //     data: JSON.parse( JSON.stringify( {
        //         requisitos: this.grado.requisitos
        //     } ))
        // });
        // dialogRef.afterClosed().subscribe( (response) => {
        //     // If the confirm button pressed...
        //     if ( response )
        //     {
        //         console.log(response.getRawValue().requisitos);
        //         this.grado.requisitos = response.getRawValue().requisitos;
        //         console.log(this.grado.requisitos);
        //         this.gradoForm.patchValue({ requisitos: response.getRawValue().requisitos});
        //         console.log(this.gradoForm.getRawValue());
        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     }
        // });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create formulario
     */
    // createFormulario(data): void
    // {
    //     //Create the formulario
    //     const newGrado = {
    //         idModalidad_grado: 0,
    //         idFacultad: 0,
    //         idEscuela: 0,
    //         idTipo_grado: 0,
    //         nro_documento: this.user.nro_documento,
    //         idColacion: 1,
    //         idEstado_grado: 0,
    //         descripcion_estado: '',
    //         comentario: '',
    //         codigo: '',
    //         entidad: '',
    //         nro_operacion: '',
    //         fecha_operacion: '',
    //         idMotivo_grado: 0,
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
    //         idTipo_grado_unidad: -1,
    //         archivo_firma: '',
    //         archivoImagen: '',
    //         requisitos: ''
    //     };
    //     this.gradoForm.patchValue(newGrado);
    //     this.data = newGrado;
    // }

    // selectedTipoGrado(id: number): void {
    //   this.gradoForm.patchValue({idTipo_grado: id,idUnidad: 0});
    //   this.data.idTipo_grado = id;
    //   this.data.idUnidad = 0;
    // }

    // selectedUnidad(id): void{
    //     this.gradoForm.patchValue({idUnidad: id, idTipo_grado_unidad: 0, archivo: ''});
    //     this.data.idUnidad = id;
    //     this.data.idTipo_grado_unidad = 0;
    //     this.data.archivo = '';
    //     this._gradoService.getTipoGradoUnidades(this.data.idTipo_grado, this.data.idUnidad).subscribe((resp)=>{
    //         // this.requisitos = resp.requisitos;
    //         // this.data.requisitos = resp.requisitos;
    //         this.tipoGradoUnidades = resp.tipo_grado_unidad;
    //         // this.gradoForm.patchValue({requisitos: resp.requisitos});
    //         this._changeDetectorRef.markForCheck();
    //     });

    //     this._gradoService.getFacultadesEscuelas(this.data.idUnidad).subscribe((resp)=>{
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
    //                 this.gradoForm.patchValue({idEscuela: idE.idEscuela, codigo: idE.nro_matricula, sede: idE.sede});
    //             }
    //             console.log(this.facultades);
    //             console.log(this.data);
    //             this.gradoForm.patchValue({idFacultad: idU.idDependencia});
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
    //             this.gradoForm.patchValue({idEscuela: idE.idEscuela, codigo: idE.nro_matricula, sede: idE.sede});
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
    //     this.gradoForm.patchValue({idEscuela: id, codigo: this.data.codigo, sede: this.data.sede});
    // }

    // selectedTipoGradoUnidades(id): void{
    //     const tipo = this.tipoGradoUnidades.find(element => element.idTipo_grado_unidad === id);
    //     this.costo = tipo.costo;
    //     this.gradoForm.patchValue({ idTipo_grado_unidad: id});
    //     this.data.idTipo_grado_unidad = id;
    //     this._gradoService.getRequisitos(id).subscribe((resp)=>{
    //       this.requisitos = resp.requisitos;
    //       this.data.requisitos = resp.requisitos;
    //       this.gradoForm.patchValue({requisitos: resp.requisitos});
    //       this._changeDetectorRef.markForCheck();
    //     });
    // }

    // selectFiles(event): void {
    //     const files = event.target.files[0];
    //     console.log(files);
    //     this.gradoForm.patchValue({archivo: files});
    //     this.data.archivo = files;
    // }

    // selectFirma(event): void {
    //     const files = event.target.files[0];
    //     console.log(files);
    //     this.gradoForm.patchValue({archivo_firma: files, archivoImagen: files});
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
    //     this.gradoForm.patchValue({requisitos: this.requisitos});
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
    //     this.gradoForm.patchValue({requisitos: this.requisitos});
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

    // createGrado(): void{
    //     // If the confirm button pressed...
    //     if (this.gradoForm.invalid) {
    //         this.gradoForm.markAllAsTouched();
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
    //     console.log(this.gradoForm.getRawValue());
    //     const grado = {
    //         entidad: this.gradoForm.getRawValue().entidad,
    //         nro_operacion: this.gradoForm.getRawValue().nro_operacion,
    //         fecha_operacion: this.gradoForm.getRawValue().fecha_operacion,
    //         archivo: this.gradoForm.getRawValue().archivo,
    //         idTipo_grado_unidad: this.gradoForm.getRawValue().idTipo_grado_unidad,
    //         idUnidad: this.gradoForm.getRawValue().idUnidad,
    //         idDependencia: this.gradoForm.getRawValue().idFacultad,
    //         idDependencia_detalle: this.gradoForm.getRawValue().idEscuela,
    //         nro_matricula: this.gradoForm.getRawValue().codigo,
    //         sede: this.gradoForm.getRawValue().sede,
    //         archivo_firma: this.gradoForm.getRawValue().archivo_firma,
    //         idMotivo_grado: this.gradoForm.getRawValue().idMotivo_grado,
    //         comentario: this.gradoForm.getRawValue().comentario,
    //         requisitos: this.gradoForm.getRawValue().requisitos,
    //     };
    //     const cadena = (new Date(grado.fecha_operacion)).toISOString();
    //     console.log(cadena);
    //     const cadena1 = cadena.substring(0,10);
    //     const cadena2 = cadena.substring(11,19);
    //     const fecha = cadena1 + ' ' + cadena2;
    //     grado.fecha_operacion = fecha;
    //     console.log(grado);
    //         const formData = new FormData();
    //         formData.append('entidad', grado.entidad);
    //         formData.append('nro_operacion', grado.nro_operacion);
    //         formData.append('fecha_operacion', grado.fecha_operacion);
    //         formData.append('archivo', grado.archivo);
    //         formData.append('idTipo_grado_unidad', grado.idTipo_grado_unidad);
    //         formData.append('idUnidad', grado.idUnidad);
    //         formData.append('idDependencia', grado.idDependencia);
    //         formData.append('idDependencia_detalle', grado.idDependencia_detalle);
    //         formData.append('nro_matricula', grado.nro_matricula);
    //         formData.append('sede', grado.sede);
    //         formData.append('archivo_firma', grado.archivo_firma);
    //         formData.append('idMotivo_grado', grado.idMotivo_grado);
    //         formData.append('comentario', grado.comentario);
    //         grado.requisitos.forEach((element) => {
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
    //         this.gradoForm.disable();

    //         this._gradoService.createGrado(formData).subscribe((newMadurity) => {
    //             console.log(newMadurity);
    //             // Toggle the edit mode off
    //             //this.toggleEditMode(false);

    //             // Re-enable the form
    //             this.gradoForm.enable();

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
    //             this.gradoForm.enable();

    //             this.alert = {
    //                 type   : 'warn',
    //                 message: 'Error al registrar',
    //                 title: 'Error'
    //             };
    //             this.openSnack();
    //         });
    // }
}
