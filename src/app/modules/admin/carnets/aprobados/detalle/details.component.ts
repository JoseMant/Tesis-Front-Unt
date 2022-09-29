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
import { CarnetsService } from 'app/modules/admin/carnets/carnets.service';
import { CarnetInterface } from 'app/modules/admin/carnets/carnets.types';
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
    selector       : 'carnet-details',
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
export class CarnetAprobadoDetalleComponent implements OnInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatAccordion) private _accordion: MatAccordion;
    @ViewChild(MatSort) private _sort: MatSort;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    carnet: CarnetInterface | null = null;
    carnets: CarnetInterface[];
    carnetForm: FormGroup;
    contador: number = 4;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _carnetService: CarnetsService,
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
        this.carnetForm = this._formBuilder.group({
            idTipo_carnet: [''],
            nro_documento: [''],
            idColacion: [''],
            idEstado_carnet: [''],
            idModalidad_grado: [''],
            descripcion_estado: [''],
            codigo: [''],
            entidad: ['', Validators.required],
            nro_operacion: ['', [Validators.maxLength(6), Validators.pattern(/^[0-9]+$/),Validators.required]],
            fecha_operacion: ['', Validators.required],
            archivo: [''],
            idMotivo_carnet: [''],
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
            idTipo_carnet_unidad: [''],
            archivo_firma: [''],
            archivoImagen: [''],
            requisitos: [''],
        });

        // Get the carnets
        this._carnetService.carnets$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((carnets: CarnetInterface[]) => {
                this.carnets = carnets;
                console.log(carnets);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the carnet
        this._carnetService.carnet$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((carnet: CarnetInterface) => {
                console.log(carnet);
                // Get the carnet
                this.carnet = carnet;
                // this.carnet.fut = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
                // this.carnet.voucher = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
                // this.carnet.requisitos[0].archivo = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
                // this.carnet.requisitos[0].nombre = 'PRUEBA';

                // Patch values to the form
                this.carnetForm.patchValue(carnet);

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
        for (const itera of this.carnet.requisitos) {
            itera['selected'] = false;
        }
        const dialogRef = this.visordialog.open(RequisitosDialogComponent, {
            autoFocus: false,
            disableClose: true,
            data: JSON.parse( JSON.stringify( {
                requisitos: this.carnet.requisitos
            } ))
        });
        dialogRef.afterClosed().subscribe( (response) => {
            // If the confirm button pressed...
            if ( response )
            {
                console.log(response.getRawValue().requisitos);
                this.carnet.requisitos = response.getRawValue().requisitos;
                console.log(this.carnet.requisitos);
                this.carnetForm.patchValue({ requisitos: response.getRawValue().requisitos});
                console.log(this.carnetForm.getRawValue());
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
    //     const newCarnet = {
    //         idModalidad_grado: 0,
    //         idFacultad: 0,
    //         idEscuela: 0,
    //         idTipo_carnet: 0,
    //         nro_documento: this.user.nro_documento,
    //         idColacion: 1,
    //         idEstado_carnet: 0,
    //         descripcion_estado: '',
    //         comentario: '',
    //         codigo: '',
    //         entidad: '',
    //         nro_operacion: '',
    //         fecha_operacion: '',
    //         idMotivo_carnet: 0,
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
    //         idTipo_carnet_unidad: -1,
    //         archivo_firma: '',
    //         archivoImagen: '',
    //         requisitos: ''
    //     };
    //     this.carnetForm.patchValue(newCarnet);
    //     this.data = newCarnet;
    // }

    // selectedTipoCarnet(id: number): void {
    //   this.carnetForm.patchValue({idTipo_carnet: id,idUnidad: 0});
    //   this.data.idTipo_carnet = id;
    //   this.data.idUnidad = 0;
    // }

    // selectedUnidad(id): void{
    //     this.carnetForm.patchValue({idUnidad: id, idTipo_carnet_unidad: 0, archivo: ''});
    //     this.data.idUnidad = id;
    //     this.data.idTipo_carnet_unidad = 0;
    //     this.data.archivo = '';
    //     this._carnetService.getTipoCarnetUnidades(this.data.idTipo_carnet, this.data.idUnidad).subscribe((resp)=>{
    //         // this.requisitos = resp.requisitos;
    //         // this.data.requisitos = resp.requisitos;
    //         this.tipoCarnetUnidades = resp.tipo_carnet_unidad;
    //         // this.carnetForm.patchValue({requisitos: resp.requisitos});
    //         this._changeDetectorRef.markForCheck();
    //     });

    //     this._carnetService.getFacultadesEscuelas(this.data.idUnidad).subscribe((resp)=>{
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
    //                 this.carnetForm.patchValue({idEscuela: idE.idEscuela, codigo: idE.nro_matricula, sede: idE.sede});
    //             }
    //             console.log(this.facultades);
    //             console.log(this.data);
    //             this.carnetForm.patchValue({idFacultad: idU.idDependencia});
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
    //             this.carnetForm.patchValue({idEscuela: idE.idEscuela, codigo: idE.nro_matricula, sede: idE.sede});
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
    //     this.carnetForm.patchValue({idEscuela: id, codigo: this.data.codigo, sede: this.data.sede});
    // }

    // selectedTipoCarnetUnidades(id): void{
    //     const tipo = this.tipoCarnetUnidades.find(element => element.idTipo_carnet_unidad === id);
    //     this.costo = tipo.costo;
    //     this.carnetForm.patchValue({ idTipo_carnet_unidad: id});
    //     this.data.idTipo_carnet_unidad = id;
    //     this._carnetService.getRequisitos(id).subscribe((resp)=>{
    //       this.requisitos = resp.requisitos;
    //       this.data.requisitos = resp.requisitos;
    //       this.carnetForm.patchValue({requisitos: resp.requisitos});
    //       this._changeDetectorRef.markForCheck();
    //     });
    // }

    // selectFiles(event): void {
    //     const files = event.target.files[0];
    //     console.log(files);
    //     this.carnetForm.patchValue({archivo: files});
    //     this.data.archivo = files;
    // }

    // selectFirma(event): void {
    //     const files = event.target.files[0];
    //     console.log(files);
    //     this.carnetForm.patchValue({archivo_firma: files, archivoImagen: files});
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
    //     this.carnetForm.patchValue({requisitos: this.requisitos});
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
    //     this.carnetForm.patchValue({requisitos: this.requisitos});
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

    // createCarnet(): void{
    //     // If the confirm button pressed...
    //     if (this.carnetForm.invalid) {
    //         this.carnetForm.markAllAsTouched();
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
    //     console.log(this.carnetForm.getRawValue());
    //     const carnet = {
    //         entidad: this.carnetForm.getRawValue().entidad,
    //         nro_operacion: this.carnetForm.getRawValue().nro_operacion,
    //         fecha_operacion: this.carnetForm.getRawValue().fecha_operacion,
    //         archivo: this.carnetForm.getRawValue().archivo,
    //         idTipo_carnet_unidad: this.carnetForm.getRawValue().idTipo_carnet_unidad,
    //         idUnidad: this.carnetForm.getRawValue().idUnidad,
    //         idDependencia: this.carnetForm.getRawValue().idFacultad,
    //         idDependencia_detalle: this.carnetForm.getRawValue().idEscuela,
    //         nro_matricula: this.carnetForm.getRawValue().codigo,
    //         sede: this.carnetForm.getRawValue().sede,
    //         archivo_firma: this.carnetForm.getRawValue().archivo_firma,
    //         idMotivo_carnet: this.carnetForm.getRawValue().idMotivo_carnet,
    //         comentario: this.carnetForm.getRawValue().comentario,
    //         requisitos: this.carnetForm.getRawValue().requisitos,
    //     };
    //     const cadena = (new Date(carnet.fecha_operacion)).toISOString();
    //     console.log(cadena);
    //     const cadena1 = cadena.substring(0,10);
    //     const cadena2 = cadena.substring(11,19);
    //     const fecha = cadena1 + ' ' + cadena2;
    //     carnet.fecha_operacion = fecha;
    //     console.log(carnet);
    //         const formData = new FormData();
    //         formData.append('entidad', carnet.entidad);
    //         formData.append('nro_operacion', carnet.nro_operacion);
    //         formData.append('fecha_operacion', carnet.fecha_operacion);
    //         formData.append('archivo', carnet.archivo);
    //         formData.append('idTipo_carnet_unidad', carnet.idTipo_carnet_unidad);
    //         formData.append('idUnidad', carnet.idUnidad);
    //         formData.append('idDependencia', carnet.idDependencia);
    //         formData.append('idDependencia_detalle', carnet.idDependencia_detalle);
    //         formData.append('nro_matricula', carnet.nro_matricula);
    //         formData.append('sede', carnet.sede);
    //         formData.append('archivo_firma', carnet.archivo_firma);
    //         formData.append('idMotivo_carnet', carnet.idMotivo_carnet);
    //         formData.append('comentario', carnet.comentario);
    //         carnet.requisitos.forEach((element) => {
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
    //         this.carnetForm.disable();

    //         this._carnetService.createCarnet(formData).subscribe((newMadurity) => {
    //             console.log(newMadurity);
    //             // Toggle the edit mode off
    //             //this.toggleEditMode(false);

    //             // Re-enable the form
    //             this.carnetForm.enable();

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
    //             this.carnetForm.enable();

    //             this.alert = {
    //                 type   : 'warn',
    //                 message: 'Error al registrar',
    //                 title: 'Error'
    //             };
    //             this.openSnack();
    //         });
    // }
}
