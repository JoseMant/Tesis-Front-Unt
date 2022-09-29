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
import { VisorPdfCertificadoComponent } from '../visorPdf/visorPdfCertificado.component';
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
export class CertificadoAprobadoDetalleComponent implements OnInit, OnDestroy
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
    newCertificado: boolean = false;
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

        // Get the certificados
        // this._certificadoService.allcertificados$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((allcertificados: CertificadoInterface[]) => {
        //         this.allcertificados = allcertificados;
        //         console.log(allcertificados);

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Get the certificado
        this._certificadoService.certificado$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((certificado: CertificadoInterface) => {
                console.log(certificado);
                // Get the certificado
                this.certificado = certificado;
                // this.certificado.fut = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
                // this.certificado.voucher = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
                // this.certificado.requisitos[0].archivo = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
                // this.certificado.requisitos[0].nombre = 'PRUEBA';

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
    selectCertificado(event): void {
        const files = event.target.files[0];
        this.certificadoForm.patchValue({archivo: files});
        console.log(this.certificadoForm);
        this.newCertificado = true;
    }
    verDocumento(): void {
        console.log(this.certificadoForm.getRawValue());
        const respDial = this.visordialog.open(
            VisorPdfCertificadoComponent,
            {
                data: this.certificadoForm.getRawValue(),
                disableClose: true,
                minWidth: '50%',
                maxWidth: '60%'
            }
        );
    }
    uploadCertificado(): void{
        const data={
            idTramite: this.certificadoForm.getRawValue().idTramite,
            archivo: this.certificadoForm.getRawValue().archivo,
        };
        const formData = new FormData();
            formData.append('idTramite', data.idTramite);
            formData.append('archivo', data.archivo);
        console.log(formData);
        
        this._certificadoService.uploadCertificado(data.idTramite,formData).subscribe((newCertificado) => {
            console.log(newCertificado);
            // Toggle the edit mode off
            //this.toggleEditMode(false);
            // Re-enable the form
            this.certificadoForm.enable();
            // Go to new product
            //this.createFormulario(this.user);
            this.alert = {
                type   : 'success',
                message: 'Certificado cargado correctamente',
                title: 'Guardado'
            };
            this.openSnack();
            this.newCertificado = false;
            // Mark for check
            this._changeDetectorRef.markForCheck();
        },
        (error) => {
            // console.log(error);
            // Re-enable the form
            this.certificadoForm.enable();
            this.alert = {
                type   : 'warn',
                message: 'Error al registrar',
                title: 'Error'
            };
            this.openSnack();
        });
    }
    
}
