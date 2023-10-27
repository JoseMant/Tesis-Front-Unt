import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { GradoPagination, GradoInterface } from 'app/modules/admin/grados/grados.types';
import { GradosService } from 'app/modules/admin/grados/grados.service';
import { MatDialog } from '@angular/material/dialog';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DuplicadosDiplomaService } from 'app/modules/admin/duplicados_diploma/duplicados.service';
import { DuplicadosDiplomasInterface, DuplicadosDiplomasPagination } from '../../../duplicados.types';

@Component({
    selector       : 'duplicados-aprobados-secretaria-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .duplicados-validados-secretaria-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px 112px auto 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px 190px auto 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px 190px auto 96px 190px 112px 190px 72px;
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
export class ValidarDuplicadosListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    tramitesDuplicados$: Observable<DuplicadosDiplomasInterface[]>;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };

    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: DuplicadosDiplomasPagination;
    searchInputControl: FormControl = new FormControl('');
    selectedTramitesDuplicadosForm: FormGroup;
    tagsEditMode: boolean = false;
    tramitesDuplicadoCount: number = 0;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        public visordialog: MatDialog,
        private snackBar: MatSnackBar,
        private _duplicadosService: DuplicadosDiplomaService,

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
        // Create the selected grado form
        this.selectedTramitesDuplicadosForm = this._formBuilder.group({
            id               : [''],
            category         : [''],
            name             : ['', [Validators.required]],
            description      : [''],
            tags             : [[]],
            sku              : [''],
            barcode          : [''],
            brand            : [''],
            vendor           : [''],
            stock            : [''],
            reserved         : [''],
            cost             : [''],
            basePrice        : [''],
            taxPercent       : [''],
            price            : [''],
            weight           : [''],
            thumbnail        : [''],
            images           : [[]],
            currentImageIndex: [0], // Image index that is currently being viewed
            active           : [false]
        });

        // Get the pagination
        this._duplicadosService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: DuplicadosDiplomasPagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the grados
        this.tramitesDuplicados$ = this._duplicadosService.tramitesDuplicados$;

        this._duplicadosService.tramitesDuplicados$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: DuplicadosDiplomasInterface[]) => {
                
                // Update the counts
                this.tramitesDuplicadoCount = response.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.isLoading = true;
                    return this._duplicadosService.getDuplicadosValidados(0, 100, 'fecha', 'desc', query);

                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe(()=>
            {
                this._changeDetectorRef.markForCheck();
            });
    }

    cambioPagina(evento): void {
        if(this._sort.active) {
            this._duplicadosService.getDuplicadosValidados(evento.pageIndex, evento.pageSize, this._sort.active, this._sort.direction, this.searchInputControl.value).subscribe();
        }
        else {
            this._duplicadosService.getDuplicadosValidados(evento.pageIndex, evento.pageSize, 'nro_tramite', 'asc', this.searchInputControl.value).subscribe();
        }
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
        if ( this._sort && this._paginator )
        {
            // Set the initial sort
            this._sort.sort({
                id          : 'fecha',
                start       : 'desc',
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

            // Get grados if sort or page changes
            merge(this._sort.sortChange).pipe(
                switchMap(() => {
                    this.isLoading = true;
                    return this._duplicadosService.getDuplicadosValidados(Number(this.pagination.page), Number(this.pagination.size), this._sort.active, this._sort.direction, this.searchInputControl.value);
                    
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe(()=>
            {
            this._changeDetectorRef.markForCheck();
        }
        );
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
