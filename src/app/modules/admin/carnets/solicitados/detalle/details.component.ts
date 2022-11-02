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
import { CarnetsService } from 'app/modules/admin/carnets/carnets.service';
import { CarnetInterface } from 'app/modules/admin/carnets/carnets.types';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { RequisitosDialogComponent } from '../../duplicados/dialogReq/dialogReq.component';

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
export class CarnetSolicitadoDetalleComponent implements OnInit, OnDestroy
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
}
