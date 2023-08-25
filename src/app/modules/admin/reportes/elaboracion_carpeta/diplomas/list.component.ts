import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { ReporteInterface } from 'app/modules/admin/reportes/reportes.types';
import { ReportesService } from 'app/modules/admin/reportes/reportes.service';
import { MatDialog } from '@angular/material/dialog';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector       : 'reportes-validados-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .reporte-diplomas-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px 112px auto 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 190px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px auto 120px 190px 300px 72px;
                }
            }
            .fondo_snackbar {
                background-color:transparent !important;
                padding: 0px !important;
                height: 0px;
                min-height: 0px !important;
            }
        `
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations
})
export class ReporteCarpetasDiplomasListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('selectedDiplomaNgForm') selectedDiplomaNgForm: NgForm;
    diplomas$: Observable<ReporteInterface[]>;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };

    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl('');
    searchOptionControl: FormControl = new FormControl('');
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    columns = ['title', 'detail'];
    rows: any;
    selectedDiploma: ReporteInterface | null = null;
    
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _reportesService: ReportesService,
        public visordialog: MatDialog,
        private snackBar: MatSnackBar,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    
    

    ngOnInit(): void
    {
        this.diplomas$ = this._reportesService.cleanReportes$;

        // Get the diplomas
        // this.diplomas$ = this._reportesService.diplomas$;
    }
    
    buscarDiploma(){
        this._reportesService.getCarpetaBySearch(this.searchOptionControl.value, this.searchInputControl.value).subscribe(
            (response) => {
                // this.diplomas = response;
                // console.log(response.length);
                                
                this.searchOptionControl.disable()
                this.searchInputControl.disable()
    
                // Mark for check
                this._changeDetectorRef.markForCheck();
                
    
                // Config the alert
                this.alert = {
                    type   : 'success',
                    message: response.length + " diploma(s) encontrada(s)",
                    title: 'Encontrado'
                };

                this.openSnack();
    
                // Mark for check
                this._changeDetectorRef.markForCheck();
                
            },
            (response) => {
                // this.diploma = null;
                // this.rows = [];
                
                // Config the alert
                this.alert = {
                    type   : 'warn',
                    message: response.error.message,
                    title: 'Error'
                };
                this.openSnack();
                
                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        );
    }


    limpiarDiploma(){
        this.searchOptionControl.setValue("");
        this.searchInputControl.setValue("");
        this.searchOptionControl.enable();
        this.searchInputControl.enable();
    }

    openSnack(): void {
        this.snackBar.openFromComponent(AlertaComponent, {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: ['fondo_snackbar'],
            data: this.alert,
        });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle tramite details
     *
     * @param tramiteId
     */
    toggleDetails(tramiteId: number): void
    {
        // If the tramite is already selected...
        if ( this.selectedDiploma && this.selectedDiploma.idTramite === tramiteId )
        {
            // Close the details
            this.closeDetails();
            return;
        }

        // Get the diploma by id
        this._reportesService.getReporteById(tramiteId)
            .subscribe((diploma) => {
                
                // Set the selected diploma
                this.selectedDiploma = diploma;
                this.rows = [
                    {
                        id: 1,
                        title: 'Denominación Diploma',
                        detail: diploma.denominacion
                    },
                    {
                        id: 2,
                        title: 'Código Diploma',
                        detail: diploma.codigo_diploma
                    },
                    {
                        id: 3,
                        title: 'Fecha Emitido',
                        detail: diploma.fecha_colacion
                    },
                    {
                        id: 4,
                        title: 'Grado/Título',
                        detail: diploma.tipo_tramite,
                    },
                    {
                        id: 5,
                        title: 'Modalidad de Obtención',
                        detail: diploma.modalidadSustentancion
                    },
                    {
                        id: 6,
                        title: 'Registrado en el libro de títulos Nro.',
                        detail: diploma.nro_libro
                    },
                    {
                        id: 7,
                        title: 'Folio',
                        detail: diploma.folio
                    },
                    {
                        id: 8,
                        title: 'Registro de secretaria general Nro.',
                        detail: diploma.nro_registro
                    },
                    {
                        id: 9,
                        title: 'Resolución de otorgamiento',
                        detail: 'RCU N° ' + diploma.nro_resolucion
                    },
                    {
                        id: 10,
                        title: 'Emisión del diploma',
                        detail: 'O-ORIGINAL'
                    }
                    
                ]

                // Fill the form
                // console.log(this.rows);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * Close the details
     */
    closeDetails(): void
    {
        this.selectedDiploma = null;
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
}
