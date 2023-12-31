import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ConstanciaPagination, ConstanciaInterface } from 'app/modules/admin/constancias/constancias.types';
import { ConstanciasService } from 'app/modules/admin/constancias/constancias.service';
import { MatDialog } from '@angular/material/dialog';
// import { VisorPdfConstanciaComponent } from '../visorPdf/visorPdfConstancia.component';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector       : 'constancias-aprobados-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .asignadas-grid {
                grid-template-columns: 96px auto 90px;

                @screen sm {
                    grid-template-columns: 96px 190px auto 90px;
                }

                @screen md {
                    grid-template-columns: 96px 190px auto 96px 90px;
                }

                @screen lg {
                    grid-template-columns: 50px auto 96px 120px auto 96px 96px 96px 96px 96px;
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
export class ConstanciasAprobadosListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    constancias$: Observable<ConstanciaInterface[]>;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };

    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: ConstanciaPagination;
    searchInputControl: FormControl = new FormControl('');
    selectedConstancia: ConstanciaInterface | null = null;
    selectedConstanciaForm: FormGroup;
    tagsEditMode: boolean = false;
    constanciasCount: number = 0;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _constanciasService: ConstanciasService,
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
        // Create the selected constancia form
        this.selectedConstanciaForm = this._formBuilder.group({
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
        this._constanciasService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: ConstanciaPagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the constancias
        this.constancias$ = this._constanciasService.constancias$;

        this._constanciasService.constancias$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: ConstanciaInterface[]) => {
                console.log(response);
                // Update the counts
                this.constanciasCount = response.length;

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
                    return this._constanciasService.getConstanciasAsignados(0, 10, 'fecha', 'desc', query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            )
            .subscribe();
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

    // editarConstancia(dataCer, lectura, estado): void {
    //     console.log(dataCer);
    //     dataCer['lectura'] = lectura;
    //     dataCer['des_estado_constancia'] = estado;
    //     // dataCer['archivo'] = 'http://127.0.0.1:8000/storage/constancias_tramites/001030822.pdf';
    //     const respDial = this.visordialog.open(
    //         VisorPdfConstanciaComponent,
    //         {
    //             data: dataCer,
    //             disableClose: true,
    //             width: '75%',
    //         }
    //     );
    //     respDial.afterClosed().subscribe( (response) => {
    //         // If the confirm button pressed...
    //         if ( response )
    //         {
    //             console.log(response.getRawValue());
    //             const constanciaAprobado = response.getRawValue();
    //             this._constanciasService.updateConstancia(constanciaAprobado.idConstancia, constanciaAprobado ).subscribe((updateNew) => {
    //                 console.log(updateNew);
    //                 // Toggle the edit mode off
    //                 this.alert = {
    //                     type   : 'success',
    //                     message: 'Constancia actualizado correctamente',
    //                     title: 'Guardado'
    //                 };
    //                 this.openSnack();
    //             });
    //         }
    //     });
    // }

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

            // Get constancias if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.isLoading = true;
                    return this._constanciasService.getConstanciasAsignados(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
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
