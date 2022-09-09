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
import { RequisitosDialogComponent } from '../dialogReq/dialogReq.component';
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
export class CertificadoAsignadoDetalleComponent implements OnInit, OnDestroy
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
            requisitos: [[]],
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
                // console.log(certificado);

                // Get the certificado
                this.certificado = certificado;

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
                this.certificado.requisitos[index].des_estado_requisito = response.getRawValue().des_estado_requisito;
                if (requisito.des_estado_requisito == 'APROBADO') {
                    this.certificado.requisitos[index].validado = 1;
                } else if (requisito.des_estado_requisito == 'RECHAZADO') {
                    this.certificado.requisitos[index].validado = 0;
                    this.certificado.requisitos[index].comentario = response.getRawValue().comentario;
                }
                this.certificadoForm.patchValue({ requisitos: this.certificado.requisitos});
                
                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the contact
     */
    updateRequisitos(): void
    {
        // Get the contact object
        const certificado = this.certificadoForm.getRawValue();

        // Update the contact on the server
        this._certificadoService.updateRequisitos(certificado.idTramite, certificado).subscribe(() => {

            // // Toggle the edit mode off
            // this.toggleEditMode(false);
        });
    }
}
