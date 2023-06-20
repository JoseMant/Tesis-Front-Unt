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
import { TitulosService } from 'app/modules/admin/titulos_SE/titulos_SE.service';
import { TituloInterface } from 'app/modules/admin/titulos_SE/titulos_SE.types';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { VisorPdfTituloComponent } from 'app/modules/admin/titulos/visorPdf/visorPdfTitulo.component';

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
export class TituloFacultadAprobadoDetalleComponent implements OnInit, OnDestroy
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
    data: TituloInterface;
    contador: number = 4;
    requisitos: any;
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

            fecha_cierre_decanato: ['']
        });

        // Get the titulo
        this._tituloService.titulo$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((titulo: TituloInterface) => {
                console.log(titulo);
                // Get the titulo
                this.titulo = titulo;
                this.requisitos = titulo.requisitos;

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

    

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    selectTitulo(event): void {
        const files = event.target.files[0];
        this.tituloForm.patchValue({archivo: files});
        console.log(this.tituloForm);
        this.newTitulo = true;
    }
    
    selectReqDocumento(event, req): void {
        const requisito = this.tituloForm.getRawValue().requisitos.find(item => item.idRequisito === req.idRequisito);
        requisito['archivoPdf'] = event.target.files[0];
    }

    verReqDocumento(req): void {
        console.log(req);
        const respDial = this.visordialog.open(
            VisorPdfTituloComponent,
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
        const date = new Date().toISOString().substring(0,10);
        if (this.tituloForm.get('fecha_cierre_decanato').value < date) {
            // Show a success message
            this.alert = {
                type   : 'warn',
                message: 'La fecha límite para este trámite fue ' + this.tituloForm.get('fecha_cierre_decanato').value,
                title: 'Fuera de fecha'
            };
            this.openSnack();
            return;
        }
        
        const data={
            idTramite: this.tituloForm.getRawValue().idTramite,
            requisitos: this.tituloForm.getRawValue().requisitos,
        };

        //Validar que subí todos los requisitos rechazados
        const requis = this.tituloForm.getRawValue().requisitos.find(element => element.responsable == 8 && ((element.archivoPdf === undefined && element.extension === 'pdf' && element.des_estado_requisito == 'RECHAZADO') || (!element.archivo && element.archivoPdf === undefined && element.extension === 'pdf' && element.des_estado_requisito == 'PENDIENTE')));
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
        
        // Disable the form
        this.tituloForm.disable();
        
        this._tituloService.updateRequisitos(data.idTramite, formData).subscribe((response) => {
            
            // Re-enable the form
            this.tituloForm.enable();

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
            this.tituloForm.enable();

            this.alert = {
                type   : 'warn',
                message: response.error.message,
                title: 'Error'
            };
            this.openSnack();
        });
    }
}
