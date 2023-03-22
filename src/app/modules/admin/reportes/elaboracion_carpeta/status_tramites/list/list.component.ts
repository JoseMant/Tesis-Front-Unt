import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ReportePagination, ReporteInterface } from 'app/modules/admin/reportes/reportes.types';
import { ReportesService } from 'app/modules/admin/reportes/reportes.service';
import { TramiteService } from 'app/modules/admin/tramites/tramites.service';
import { CronogramasService } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.service';
import { MatDialog } from '@angular/material/dialog';
// import { VisorPdfReporteComponent } from '../visorPdf/visorPdfReporte.component';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Unidad } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.types';

@Component({
    selector       : 'reportes-validados-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .reportes-validados-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px 112px auto 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px 190px auto 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px 190px 190px 96px 190px auto;
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
export class ReporteCarpetasStatusTramitesListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    reportes$: Observable<ReporteInterface[]>;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };

    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: ReportePagination;
    searchInputControl: FormControl = new FormControl();
    selectedReporte: ReporteInterface | null = null;
    selectedReporteForm: FormGroup;
    tagsEditMode: boolean = false;
    reportesCount: number = 0;
    unidades: Unidad;
    tipoTramiteUnidades: any;
    dependencias: any;
    dependencias_detalle: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _reportesService: ReportesService,
        private _tramiteService: TramiteService,
        private _cronogramasService: CronogramasService,
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
        // Create the selected reporte form
        this.selectedReporteForm = this._formBuilder.group({
            idUnidad         : [0],
            idDependencia    : [0],
            idDependencia_detalle : [0, [Validators.required]],
            idTipo_tramite_unidad : [0],
        });

        // Get the unidades
        this._reportesService.unidades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((unidades: any) => {
                this.unidades = unidades;
                console.log(unidades);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the pagination
        this._reportesService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: ReportePagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the reportes
        this.reportes$ = this._reportesService.reportes$;

        this._reportesService.reportes$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: ReporteInterface[]) => {
                console.log(response);
                // Update the counts
                if (response) {
                    this.reportesCount = response.length;
                } else this.reportesCount = 0;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to search input field value changes
        // this.searchInputControl.valueChanges
        //     .pipe(
        //         takeUntil(this._unsubscribeAll),
        //         debounceTime(300),
        //         switchMap((query) => {
        //             this.isLoading = true;
        //             return this._reportesService.getReportesEscuela(0, 10, 'fecha', 'desc', query);
        //         }),
        //         map(() => {
        //             this.isLoading = false;
        //         })
        //     )
        //     .subscribe();
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

    changedUnidad(idUnidad: number) : void {

        this.selectedReporteForm.patchValue({
            idDependencia: 0,
            idDependencia_detalle: 0,
            idTipo_tramite_unidad: 0
        });
        
        this._reportesService.getTipoTramiteUnidades(idUnidad).subscribe((resp)=>{
            this.tipoTramiteUnidades = resp.tipo_tramite_unidad;
            
            this._changeDetectorRef.markForCheck();
        });

        this._reportesService.getDependenciasByUnidad(idUnidad).subscribe((response)=>{
            this.dependencias = response;
            
            this._changeDetectorRef.markForCheck();
        });

        this.ngAfterViewInit();
    }

    changedDependencia(idDependencia: number) : void {
        this.selectedReporteForm.patchValue({
            idDependencia_detalle: 0
        });

        this._reportesService.getDependenciaDetalleByDependencia(idDependencia).subscribe((response)=>{
            this.dependencias_detalle = response;
            
            this._changeDetectorRef.markForCheck();
        });

        this.ngAfterViewInit();
    }

    changedDependencia_detalle() : void {
        this.ngAfterViewInit();
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        if ( this._sort && this._paginator )
        {
            // Set the initial sort
            this._sort.sort({
                id          : 'nro_tramite',
                start       : 'asc',
                disableClear: true
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    // Reset back to the first page
                    this._paginator.pageIndex = 0;
                });

            // Get reportes if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.isLoading = true;
                    const form = this.selectedReporteForm.getRawValue();
                    return this._reportesService.getReporteStatusTramites(form.idUnidad, form.idDependencia, form.idDependencia_detalle, form.idTipo_tramite_unidad, this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction)
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        }
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
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    getDataReporte(): void {
        console.log("llamando service...")
        const form = this.selectedReporteForm.getRawValue();
        merge(form).pipe(
            switchMap(() => {
                this.isLoading = true;
                return this._reportesService.getReporteStatusTramites(form.idUnidad, form.idDependencia, form.idDependencia_detalle, form.idTipo_tramite_unidad, this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction)
            }),
            map(() => {
                this.isLoading = false;
            })
        ).subscribe();
        // this._reportesService.getReporteStatusTramites(form.idUnidad, form.idDependencia, form.idDependencia_detalle, form.idTipo_tramite_unidad, this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction)
    }
}