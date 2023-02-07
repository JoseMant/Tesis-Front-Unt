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
import { TitulosService } from 'app/modules/admin/titulos/titulos.service';
import { TituloInterface } from 'app/modules/admin/titulos/titulos.types';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { RequisitosDialogComponent } from 'app/modules/admin/titulos/dialogReq/dialogReq.component';

@Component({
    selector       : 'titulo-details',
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
export class TituloURAValidacionDetalleComponent implements OnInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatAccordion) private _accordion: MatAccordion;
    @ViewChild(MatSort) private _sort: MatSort;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    titulo: TituloInterface | null = null;
    alltitulos: TituloInterface[];
    tituloForm: FormGroup;
    contador: number = 4;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    newTitulo: boolean = false;
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _tituloService: TitulosService,
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
        // Create the selected maduritylevel form
        this.tituloForm = this._formBuilder.group({
            idTramite: [''],
            idTipo_tramite: [''],
            nro_documento: [''],
            idColacion: [''],
            idEstado_tramite: [''],
            idModalidad_titulo: [''],
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
            idDependencia_detalle: [''],
            sede: [''],
            nro_matricula: [''],
            tipo_documento: [''],
            sexoNombre: [''],
            idUnidad: [''],
            idTipo_tramite_unidad: [''],
            archivo_firma: [''],
            archivoImagen: [''],
            requisitos: [''],
            certificado_final: ['', Validators.required]
        });

        // Get the titulo
        this._tituloService.titulo$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((titulo: TituloInterface) => {
                console.log(titulo);
                // Get the titulo
                this.titulo = titulo;

                // Patch values to the form
                this.tituloForm.patchValue(titulo);

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
                this.titulo.requisitos[index].des_estado_requisito = response.getRawValue().des_estado_requisito;
                if (requisito.des_estado_requisito == 'APROBADO') {
                    this.titulo.requisitos[index].validado = 1;
                } else if (requisito.des_estado_requisito == 'RECHAZADO') {
                    this.titulo.requisitos[index].validado = 0;
                    this.titulo.requisitos[index].comentario = response.getRawValue().comentario;
                }
                this.tituloForm.patchValue({ requisitos: this.titulo.requisitos});
                
                // Mark for check
                this._changeDetectorRef.markForCheck();

                this.updateRequisito();
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
    updateRequisitos(): void
    {
        // Get the contact object
        const titulo = this.tituloForm.getRawValue();
        console.log(titulo);
        // Disable the form
        this.tituloForm.disable();
        
        // Update the contact on the server
        this._tituloService.updateTitulo(titulo.idTramite, titulo).subscribe(() => {

            // Re-enable the form
            this.tituloForm.enable();

            // Show a success message
            this.alert = {
                type   : 'success',
                message: 'Trámite registrado correctamente',
                title: 'Guardado'
            };
            this.openSnack();
            
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    updateRequisito(): void
    {
        // Get the contact object
        const titulo = this.tituloForm.getRawValue();
        
        // Disable the form
        this.tituloForm.disable();
        
        // Update the contact on the server
        this._tituloService.updateTituloRequisito(titulo.idTramite, titulo).subscribe(() => {

            // Re-enable the form
            this.tituloForm.enable();

            // Show a success message
            this.alert = {
                type   : 'success',
                message: 'Requisito actualizado correctamente',
                title: 'Guardado'
            };
            this.openSnack();
            
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }
}
