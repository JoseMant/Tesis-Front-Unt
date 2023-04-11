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
import moment from 'moment';

@Component({
    selector       : 'reportes-validados-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .reportes-vouchers-validados-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px 112px auto 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px 190px auto 72px;
                }

                @screen lg {
                    grid-template-columns: 48px auto 120px 120px 190px 190px 120px 120px 120px;
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
export class ReportesTesoreriaAprobadosListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;

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
    cronogramas: any;
    minDate: any;
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
            fecha_inicio         : [moment('2023-01-01'), Validators.required],
            fecha_fin    : [moment(), Validators.required],
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
                
                // Update the counts
                if (response) {
                    this.reportesCount = response.length;
                } else this.reportesCount = 0;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        
        this.minDate = new Date();
        
        // Subscribe to search input field value changes
        this.selectedReporteForm.get('fecha_inicio').valueChanges
            .pipe(
                switchMap(() => {
                    this.isLoading = true;
                    const form = this.selectedReporteForm.getRawValue();
                    return this._reportesService.getReporteVouchersAprobados(this.formatDate(form.fecha_inicio.toDate()), this.formatDate(form.fecha_fin.toDate()))
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        this.selectedReporteForm.get('fecha_fin').valueChanges
            .pipe(
                switchMap(() => {
                    this.isLoading = true;
                    const form = this.selectedReporteForm.getRawValue();
                    return this._reportesService.getReporteVouchersAprobados(this.formatDate(form.fecha_inicio.toDate()), this.formatDate(form.fecha_fin.toDate()))
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
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

    startDateChange(event: any) : void {
        this.selectedReporteForm.patchValue({
            fecha_inicio: event
        })
    }

    endDateChange(event: any) : void {
        this.selectedReporteForm.patchValue({
            fecha_fin: event
        })
    }

    padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }
      
    formatDate(date: Date) {
        return (
          [
            date.getFullYear(),
            this.padTo2Digits(date.getMonth() + 1),
            this.padTo2Digits(date.getDate()),
          ].join('-')
        );
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        if ( this._paginator )
        {

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // Get reportes if sort or page changes
            merge(this._paginator.page).pipe(
                switchMap(() => {
                    this.isLoading = true;
                    const form = this.selectedReporteForm.getRawValue();
                    return this._reportesService.getReporteVouchersAprobados(this.formatDate(form.fecha_inicio.toDate()), this.formatDate(form.fecha_fin.toDate()), this._paginator.pageIndex, this._paginator.pageSize)
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
}
