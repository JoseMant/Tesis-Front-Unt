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
import { VisorPdfGradoComponent } from 'app/modules/admin/grados/visorPdf/visorPdfGrado.component';

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
export class GradoFacultadAprobadoDetalleComponent implements OnInit, OnDestroy
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
    data: GradoInterface;
    contador: number = 4;
    requisitos: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    newGrado: boolean = false;
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
                this.requisitos = grado.requisitos;
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

    // validarRequisito(requisito, lectura, index): void {
    //     requisito['lectura'] = lectura;
    //     const dialogRef = this.visordialog.open(RequisitosDialogComponent, {
    //         autoFocus: false,
    //         disableClose: true,
    //         data: JSON.parse( JSON.stringify(requisito) )
    //     });
    //     //--------- desde aquí falta 
    //     dialogRef.afterClosed().subscribe( (response) => {
    //         // If the confirm button pressed...
    //         if ( response )
    //         {
    //             this.grado.requisitos[index].des_estado_requisito = response.getRawValue().des_estado_requisito;
    //             if (requisito.des_estado_requisito == 'APROBADO') {
    //                 this.grado.requisitos[index].aprobado = 1;
    //             } else if (requisito.des_estado_requisito == 'RECHAZADO') {
    //                 this.grado.requisitos[index].aprobado = 0;
    //                 this.grado.requisitos[index].comentario = response.getRawValue().comentario;
    //             }
    //             this.gradoForm.patchValue({ requisitos: this.grado.requisitos});
                
    //             // Mark for check
    //             this._changeDetectorRef.markForCheck();
    //         }
    //     });
    // }


    // updateRequisitos(): void
    // {
    //     // Get the contact object
    //     const grado = this.gradoForm.getRawValue();
    //     console.log(grado);
    //     // Disable the form
    //     this.gradoForm.disable();
        
    //     // Update the contact on the server
    //     this._gradoService.updateRequisitos(grado.idTramite, grado).subscribe(() => {

    //         // Re-enable the form
    //         this.gradoForm.enable();

    //         // Show a success message
    //         this.alert = {
    //             type   : 'success',
    //             message: 'Trámite registrado correctamente',
    //             title: 'Guardado'
    //         };
    //         this.openSnack();
            
    //         // Mark for check
    //         this._changeDetectorRef.markForCheck();
    //     });
    // }

    // rechazarRequisitos(): void {
    //     for (const itera of this.grado.requisitos) {
    //         itera['selected'] = false;
    //     }
    //     const dialogRef = this.visordialog.open(RequisitosDialogComponent, {
    //         autoFocus: false,
    //         disableClose: true,
    //         data: JSON.parse( JSON.stringify( {
    //             requisitos: this.grado.requisitos
    //         } ))
    //     });
    //     dialogRef.afterClosed().subscribe( (response) => {
    //         // If the confirm button pressed...
    //         if ( response )
    //         {
    //             console.log(response.getRawValue().requisitos);
    //             this.grado.requisitos = response.getRawValue().requisitos;
    //             console.log(this.grado.requisitos);
    //             this.gradoForm.patchValue({ requisitos: response.getRawValue().requisitos});
    //             console.log(this.gradoForm.getRawValue());
    //             // Mark for check
    //             this._changeDetectorRef.markForCheck();
    //         }
    //     });
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    selectGrado(event): void {
        const files = event.target.files[0];
        this.gradoForm.patchValue({archivo: files});
        console.log(this.gradoForm);
        this.newGrado = true;
    }
    // verDocumento(): void {
    //     console.log(this.gradoForm.getRawValue());
    //     const respDial = this.visordialog.open(
    //         VisorPdfGradoComponent,
    //         {
    //             data: this.gradoForm.getRawValue(),
    //             disableClose: true,
    //             minWidth: '50%',
    //             maxWidth: '60%'
    //         }
    //     );
    // }
    // uploadGrado(): void{
    //     const data={
    //         idTramite: this.gradoForm.getRawValue().idTramite,
    //         archivo: this.gradoForm.getRawValue().archivo,
    //     };
    //     debugger;
    //     const formData = new FormData();
    //         formData.append('idTramite', data.idTramite);
    //         formData.append('archivo', data.archivo);
    //     console.log(formData);
        
    //     this._gradoService.uploadGrado(data.idTramite,formData).subscribe((newGrado) => {
    //         // Re-enable the form
    //         this.gradoForm.enable();
            
    //         this.alert = {
    //             type   : 'success',
    //             message: 'Grado cargado correctamente',
    //             title: 'Guardado'
    //         };
    //         this.openSnack();
    //         this.newGrado = false;
    //         // Mark for check
    //         this._changeDetectorRef.markForCheck();
    //     },
    //     (response) => {
    //         // Re-enable the form
    //         this.gradoForm.enable();

    //         this.alert = {
    //             type   : 'warn',
    //             message: response,
    //             title: 'Error'
    //         };
    //         this.openSnack();
    //     });
    // }
    selectReqDocumento(event, req): void {
        const requisito = this.gradoForm.getRawValue().requisitos.find(item => item.idRequisito === req.idRequisito);
        requisito['archivoPdf'] = event.target.files[0];
    }

    verReqDocumento(req): void {
        console.log(req);
        const respDial = this.visordialog.open(
            VisorPdfGradoComponent,
            {
                data: req,
                disableClose: true,
                minWidth: '50%',
                maxWidth: '60%'
            }
        );
    }
    UpdateRequisitosFacultad(): void{
        // If the confirm button pressed...
        const data={
            idTramite: this.gradoForm.getRawValue().idTramite,
            requisitos: this.gradoForm.getRawValue().requisitos,
        };

        //Validar que subí todos los requisitos rechazados
        const requis = this.gradoForm.getRawValue().requisitos.find(element => element.responsable == 8 && ((element.archivoPdf === undefined && element.extension === 'pdf' && element.des_estado_requisito == 'RECHAZADO') || (!element.archivo && element.archivoPdf === undefined && element.extension === 'pdf' && element.des_estado_requisito == 'PENDIENTE')));
        if (requis) {
            this.alert = {
                type   : 'warn',
                message: 'Cargar el archivo en el requisito: ' + requis.nombre,
                title: 'Error'
            };
            this.openSnack();
            return;
        }

        const formData = new FormData();
        formData.append('idTramite', data.idTramite);
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
        // console.log(formData.getAll('files[]'));
        
        this._gradoService.updateRequisitos(data.idTramite, formData).subscribe((response) => {
            
            // Re-enable the form
            this.gradoForm.enable();

            this.alert = {
                type   : 'success',
                message: 'Requisitos actualizados correctamente',
                title: 'Guardado'
            };
            this.openSnack();

            // Mark for check
            this._changeDetectorRef.markForCheck();
        },
        (response) => {

            // Re-enable the form
            this.gradoForm.enable();

            this.alert = {
                type   : 'warn',
                message: response.error.message,
                title: 'Error'
            };
            this.openSnack();
        });
    }
}
