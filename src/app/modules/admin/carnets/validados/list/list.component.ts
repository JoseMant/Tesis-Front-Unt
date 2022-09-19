import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CarnetPagination, CarnetInterface } from 'app/modules/admin/carnets/carnets.types';
import { CarnetsService } from 'app/modules/admin/carnets/carnets.service';
import { MatDialog } from '@angular/material/dialog';
// import { VisorPdfCarnetComponent } from '../visorPdf/visorPdfCarnet.component';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector       : 'carnets-validados-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .validados-grid {
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
export class CarnetsValidadosListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    carnets$: Observable<CarnetInterface[]>;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };

    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: CarnetPagination;
    searchInputControl: FormControl = new FormControl();
    selectedCarnet: CarnetInterface | null = null;
    selectedCarnetForm: FormGroup;
    tagsEditMode: boolean = false;
    carnetsCount: number = 0;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _carnetsService: CarnetsService,
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
        // Create the selected carnet form
        this.selectedCarnetForm = this._formBuilder.group({
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
        this._carnetsService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: CarnetPagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the carnets
        this.carnets$ = this._carnetsService.carnets$;

        this._carnetsService.carnets$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: CarnetInterface[]) => {
                console.log(response);
                // Update the counts
                this.carnetsCount = response.length;

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
                    return this._carnetsService.getCarnetsValidados(0, 10, 'fecha', 'desc', query);
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


    descargarZip(): void
    {
        // Get the product object
        // const data = this.selectedCertificadosForm.getRawValue();
        
        // Update the product on the server
        this._carnetsService.descargarZip().subscribe(() => {
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
    // editarCarnet(dataCer, lectura, estado): void {
    //     console.log(dataCer);
    //     dataCer['lectura'] = lectura;
    //     dataCer['des_estado_carnet'] = estado;
    //     // dataCer['archivo'] = 'http://127.0.0.1:8000/storage/carnets_tramites/001030822.pdf';
    //     const respDial = this.visordialog.open(
    //         VisorPdfCarnetComponent,
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
    //             const carnetValidado = response.getRawValue();
    //             this._carnetsService.updateCarnet(carnetValidado.idCarnet, carnetValidado ).subscribe((updateNew) => {
    //                 console.log(updateNew);
    //                 // Toggle the edit mode off
    //                 this.alert = {
    //                     type   : 'success',
    //                     message: 'Carnet actualizado correctamente',
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

            // Get carnets if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.isLoading = true;
                    return this._carnetsService.getCarnetsValidados(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
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
