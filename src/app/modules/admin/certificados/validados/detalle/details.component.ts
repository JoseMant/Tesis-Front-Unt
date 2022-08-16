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
import { CertificadosService } from 'app/modules/admin/certificados/certificados.service';
import { CertificadoInterface } from 'app/modules/admin/certificados/certificados.types';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import moment from 'moment';
import { RequisitosDialogComponent } from '../../asignados/dialogReq/dialogReq.component';
// import { VisorPdfComponent } from '../visorPdf/visorPdf.component';
// import { VisorImagenComponent } from '../visorImagen/visorImagen.component';

@Component({
    selector       : 'certificado-details',
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
export class CertificadoValidadoDetalleComponent implements OnInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatAccordion) private _accordion: MatAccordion;
    @ViewChild(MatSort) private _sort: MatSort;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    certificado: CertificadoInterface | null = null;
    allcertificados: CertificadoInterface[];
    certificadoForm: FormGroup;
    contador: number = 4;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _certificadoService: CertificadosService,
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
        this.certificadoForm = this._formBuilder.group({
            idTipo_certificado: [''],
            nro_documento: [''],
            idColacion: [''],
            idEstado_certificado: [''],
            idModalidad_grado: [''],
            descripcion_estado: [''],
            codigo: [''],
            entidad: ['', Validators.required],
            nro_operacion: ['', [Validators.maxLength(6), Validators.pattern(/^[0-9]+$/),Validators.required]],
            fecha_operacion: ['', Validators.required],
            archivo: [''],
            idMotivo_certificado: [''],
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
            idTipo_certificado_unidad: [''],
            archivo_firma: [''],
            archivoImagen: [''],
            requisitos: [''],
        });

        // Get the certificados
        this._certificadoService.allcertificados$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((allcertificados: CertificadoInterface[]) => {
                this.allcertificados = allcertificados;
                console.log(allcertificados);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the certificado
        this._certificadoService.certificado$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((certificado: CertificadoInterface) => {
                console.log(certificado);
                // Get the certificado
                this.certificado = certificado;
                this.certificado.fut = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
                this.certificado.voucher = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
                this.certificado.requisitos[0].archivo = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
                this.certificado.requisitos[0].nombre = 'PRUEBA';

                // Patch values to the form
                this.certificadoForm.patchValue(certificado);

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
        for (const itera of this.certificado.requisitos) {
            itera['selected'] = false;
        }
        const dialogRef = this.visordialog.open(RequisitosDialogComponent, {
            autoFocus: false,
            disableClose: true,
            data: JSON.parse( JSON.stringify( {
                requisitos: this.certificado.requisitos
            } ))
        });
        dialogRef.afterClosed().subscribe( (response) => {
            // If the confirm button pressed...
            if ( response )
            {
                console.log(response.getRawValue().requisitos);
                this.certificado.requisitos = response.getRawValue().requisitos;
                console.log(this.certificado.requisitos);
                this.certificadoForm.patchValue({ requisitos: response.getRawValue().requisitos});
                console.log(this.certificadoForm.getRawValue());
                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });
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
    //     const newCertificado = {
    //         idModalidad_grado: 0,
    //         idFacultad: 0,
    //         idEscuela: 0,
    //         idTipo_certificado: 0,
    //         nro_documento: this.user.nro_documento,
    //         idColacion: 1,
    //         idEstado_certificado: 0,
    //         descripcion_estado: '',
    //         comentario: '',
    //         codigo: '',
    //         entidad: '',
    //         nro_operacion: '',
    //         fecha_operacion: '',
    //         idMotivo_certificado: 0,
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
    //         idTipo_certificado_unidad: -1,
    //         archivo_firma: '',
    //         archivoImagen: '',
    //         requisitos: ''
    //     };
    //     this.certificadoForm.patchValue(newCertificado);
    //     this.data = newCertificado;
    // }

    // selectedTipoCertificado(id: number): void {
    //   this.certificadoForm.patchValue({idTipo_certificado: id,idUnidad: 0});
    //   this.data.idTipo_certificado = id;
    //   this.data.idUnidad = 0;
    // }

    // selectedUnidad(id): void{
    //     this.certificadoForm.patchValue({idUnidad: id, idTipo_certificado_unidad: 0, archivo: ''});
    //     this.data.idUnidad = id;
    //     this.data.idTipo_certificado_unidad = 0;
    //     this.data.archivo = '';
    //     this._certificadoService.getTipoCertificadoUnidades(this.data.idTipo_certificado, this.data.idUnidad).subscribe((resp)=>{
    //         // this.requisitos = resp.requisitos;
    //         // this.data.requisitos = resp.requisitos;
    //         this.tipoCertificadoUnidades = resp.tipo_certificado_unidad;
    //         // this.certificadoForm.patchValue({requisitos: resp.requisitos});
    //         this._changeDetectorRef.markForCheck();
    //     });

    //     this._certificadoService.getFacultadesEscuelas(this.data.idUnidad).subscribe((resp)=>{
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
    //                 this.certificadoForm.patchValue({idEscuela: idE.idEscuela, codigo: idE.nro_matricula, sede: idE.sede});
    //             }
    //             console.log(this.facultades);
    //             console.log(this.data);
    //             this.certificadoForm.patchValue({idFacultad: idU.idDependencia});
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
    //             this.certificadoForm.patchValue({idEscuela: idE.idEscuela, codigo: idE.nro_matricula, sede: idE.sede});
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
    //     this.certificadoForm.patchValue({idEscuela: id, codigo: this.data.codigo, sede: this.data.sede});
    // }

    // selectedTipoCertificadoUnidades(id): void{
    //     const tipo = this.tipoCertificadoUnidades.find(element => element.idTipo_certificado_unidad === id);
    //     this.costo = tipo.costo;
    //     this.certificadoForm.patchValue({ idTipo_certificado_unidad: id});
    //     this.data.idTipo_certificado_unidad = id;
    //     this._certificadoService.getRequisitos(id).subscribe((resp)=>{
    //       this.requisitos = resp.requisitos;
    //       this.data.requisitos = resp.requisitos;
    //       this.certificadoForm.patchValue({requisitos: resp.requisitos});
    //       this._changeDetectorRef.markForCheck();
    //     });
    // }

    // selectFiles(event): void {
    //     const files = event.target.files[0];
    //     console.log(files);
    //     this.certificadoForm.patchValue({archivo: files});
    //     this.data.archivo = files;
    // }

    // selectFirma(event): void {
    //     const files = event.target.files[0];
    //     console.log(files);
    //     this.certificadoForm.patchValue({archivo_firma: files, archivoImagen: files});
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
    //     this.certificadoForm.patchValue({requisitos: this.requisitos});
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
    //     this.certificadoForm.patchValue({requisitos: this.requisitos});
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

    // createCertificado(): void{
    //     // If the confirm button pressed...
    //     if (this.certificadoForm.invalid) {
    //         this.certificadoForm.markAllAsTouched();
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
    //     console.log(this.certificadoForm.getRawValue());
    //     const certificado = {
    //         entidad: this.certificadoForm.getRawValue().entidad,
    //         nro_operacion: this.certificadoForm.getRawValue().nro_operacion,
    //         fecha_operacion: this.certificadoForm.getRawValue().fecha_operacion,
    //         archivo: this.certificadoForm.getRawValue().archivo,
    //         idTipo_certificado_unidad: this.certificadoForm.getRawValue().idTipo_certificado_unidad,
    //         idUnidad: this.certificadoForm.getRawValue().idUnidad,
    //         idDependencia: this.certificadoForm.getRawValue().idFacultad,
    //         idDependencia_detalle: this.certificadoForm.getRawValue().idEscuela,
    //         nro_matricula: this.certificadoForm.getRawValue().codigo,
    //         sede: this.certificadoForm.getRawValue().sede,
    //         archivo_firma: this.certificadoForm.getRawValue().archivo_firma,
    //         idMotivo_certificado: this.certificadoForm.getRawValue().idMotivo_certificado,
    //         comentario: this.certificadoForm.getRawValue().comentario,
    //         requisitos: this.certificadoForm.getRawValue().requisitos,
    //     };
    //     const cadena = (new Date(certificado.fecha_operacion)).toISOString();
    //     console.log(cadena);
    //     const cadena1 = cadena.substring(0,10);
    //     const cadena2 = cadena.substring(11,19);
    //     const fecha = cadena1 + ' ' + cadena2;
    //     certificado.fecha_operacion = fecha;
    //     console.log(certificado);
    //         const formData = new FormData();
    //         formData.append('entidad', certificado.entidad);
    //         formData.append('nro_operacion', certificado.nro_operacion);
    //         formData.append('fecha_operacion', certificado.fecha_operacion);
    //         formData.append('archivo', certificado.archivo);
    //         formData.append('idTipo_certificado_unidad', certificado.idTipo_certificado_unidad);
    //         formData.append('idUnidad', certificado.idUnidad);
    //         formData.append('idDependencia', certificado.idDependencia);
    //         formData.append('idDependencia_detalle', certificado.idDependencia_detalle);
    //         formData.append('nro_matricula', certificado.nro_matricula);
    //         formData.append('sede', certificado.sede);
    //         formData.append('archivo_firma', certificado.archivo_firma);
    //         formData.append('idMotivo_certificado', certificado.idMotivo_certificado);
    //         formData.append('comentario', certificado.comentario);
    //         certificado.requisitos.forEach((element) => {
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
    //         this.certificadoForm.disable();

    //         this._certificadoService.createCertificado(formData).subscribe((newMadurity) => {
    //             console.log(newMadurity);
    //             // Toggle the edit mode off
    //             //this.toggleEditMode(false);

    //             // Re-enable the form
    //             this.certificadoForm.enable();

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
    //             this.certificadoForm.enable();

    //             this.alert = {
    //                 type   : 'warn',
    //                 message: 'Error al registrar',
    //                 title: 'Error'
    //             };
    //             this.openSnack();
    //         });
    // }
}
