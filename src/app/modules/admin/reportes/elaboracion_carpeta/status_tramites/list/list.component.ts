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
import { CronogramasService } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.service';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Unidad } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.types';
import { User } from 'app/core/user/user.types';
import { environment } from 'environments/environment';
@Component({
    selector       : 'reportes-validados-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .reportes-elaboracion_carpeta-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px 112px auto 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px 190px auto 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 120px auto 190px 120px 120px 450px;
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
    searchInputControl: FormControl = new FormControl('');
    selectedReporte: ReporteInterface | null = null;
    selectedReporteForm: FormGroup;
    tagsEditMode: boolean = false;
    reportesCount: number = 0;
    unidades: Unidad;
    tipoTramiteUnidades: any;
    dependencias: any;
    programas: any;
    cronogramas: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    respuesta: String;
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _reportesService: ReportesService,
        private _userService: UserService,
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
            idPrograma : [0],
            idTipo_tramite_unidad : [0],
            cronograma       : [0],
             
        });

        // Get the user
        this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) => {
                if (user.idTipoUsuario == 5) {
                    this._reportesService.getDependenciaByDependenciaDetalle(user.idDependencia).subscribe((dependencia)=>{
                        
                        this.changedUnidad(1);
                        this.changedDependencia(dependencia.idDependencia);
                        
                        this.selectedReporteForm.patchValue({
                            idUnidad: 1,
                            idDependencia: dependencia.idDependencia,
                            idPrograma: user.idDependencia
                        });
                        
                        this._changeDetectorRef.markForCheck();
                    });
                }
            });

        // Get the unidades
        this._reportesService.unidades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((unidades: any) => {
                this.unidades = unidades;

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
                
                // Update the counts
                if (response) {
                    this.reportesCount = response.length;
                } else this.reportesCount = 0;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to search input field value changes
        this.selectedReporteForm.get('idUnidad').valueChanges
            .pipe(
                switchMap(() => {
                    this.isLoading = true;
                    const form = this.selectedReporteForm.getRawValue();
                    return this._reportesService.getReporteStatusTramites(form.idUnidad, form.idDependencia, form.idPrograma, form.idTipo_tramite_unidad, form.cronograma)
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        this.selectedReporteForm.get('idDependencia').valueChanges
            .pipe(
                switchMap(() => {
                    this.isLoading = true;
                    const form = this.selectedReporteForm.getRawValue();
                    return this._reportesService.getReporteStatusTramites(form.idUnidad, form.idDependencia, form.idPrograma, form.idTipo_tramite_unidad, form.cronograma)
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        this.selectedReporteForm.get('idPrograma').valueChanges
            .pipe(
                switchMap(() => {
                    this.isLoading = true;
                    const form = this.selectedReporteForm.getRawValue();
                    return this._reportesService.getReporteStatusTramites(form.idUnidad, form.idDependencia, form.idPrograma, form.idTipo_tramite_unidad, form.cronograma)
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        this.selectedReporteForm.get('idTipo_tramite_unidad').valueChanges
            .pipe(
                switchMap(() => {
                    this.isLoading = true;
                    const form = this.selectedReporteForm.getRawValue();
                    return this._reportesService.getReporteStatusTramites(form.idUnidad, form.idDependencia, form.idPrograma, form.idTipo_tramite_unidad, form.cronograma)
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        this.selectedReporteForm.get('cronograma').valueChanges
            .pipe(
                switchMap(() => {
                    this.isLoading = true;
                    const form = this.selectedReporteForm.getRawValue();
                    return this._reportesService.getReporteStatusTramites(form.idUnidad, form.idDependencia, form.idPrograma, form.idTipo_tramite_unidad, form.cronograma)
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

    changedUnidad(idUnidad: number) : void {

        this.selectedReporteForm.patchValue({
            idDependencia: 0,
            idPrograma: 0,
            idTipo_tramite_unidad: 0,
            cronograma: 0
        });
        
        this._reportesService.getTipoTramiteUnidades(idUnidad).subscribe((resp)=>{
            this.tipoTramiteUnidades = resp.tipo_tramite_unidad;
            
            this._changeDetectorRef.markForCheck();
        });

        this._reportesService.getDependenciasByUnidad(idUnidad).subscribe((response)=>{
            this.dependencias = response;
            
            this._changeDetectorRef.markForCheck();
        });

    }

    changedDependencia(idDependencia: number) : void {
        this.selectedReporteForm.patchValue({
            idPrograma: 0,
            cronograma: 0
        });
        
        this._reportesService.getProgramasByDependencia(idDependencia).subscribe((response)=>{
            console.log(response);
            this.programas = response;
            
            this._changeDetectorRef.markForCheck();
        });

        this._reportesService.getCronogramasByDependencia(idDependencia, this.selectedReporteForm.get('idTipo_tramite_unidad').value).subscribe((response)=>{
            this.cronogramas = response;
            
            this._changeDetectorRef.markForCheck();
        });

    }

    changedTipo_tramite_unidad(idTipo_tramite_unidad: number) : void {
        this.selectedReporteForm.patchValue({
            cronograma: 0
        });

        this._reportesService.getCronogramasByDependencia(this.selectedReporteForm.get('idDependencia').value, idTipo_tramite_unidad).subscribe((response)=>{
            this.cronogramas = response;
            
            this._changeDetectorRef.markForCheck();
        });
    }

    verExcel(){
        const form = this.selectedReporteForm.getRawValue();
        console.log(form.idDependencia,form.cronograma);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', environment.baseUrl + 'reporte/status_tramites/excel/' + form.idDependencia+'/'+form.cronograma);
        document.body.appendChild(link);
        link.click();
        link.remove();
        

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
                    return this._reportesService.getReporteStatusTramites(form.idUnidad, form.idDependencia, form.idPrograma, form.idTipo_tramite_unidad, form.cronograma, this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction)
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
