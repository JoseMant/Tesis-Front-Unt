import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil, finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CarnetPagination, CarnetInterface } from 'app/modules/admin/carnets/carnets.types';
import { CarnetsService } from 'app/modules/admin/carnets/carnets.service';
import { MatDialog } from '@angular/material/dialog';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';

@Component({
    selector       : 'carnets-renovaciones-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .renovaciones-grid {
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
export class CarnetsRenovacionesListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    @ViewChild('selectedCarnetNgForm') selectedCarnetNgForm: NgForm;

    carnets$: Observable<CarnetInterface[]>;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    showAlert: boolean = false;
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
            file             : ['', [Validators.required]],
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
                    return this._carnetsService.getCarnetsRenovaciones(0, 10, 'fecha', 'desc', query);
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
                    return this._carnetsService.getCarnetsRenovaciones(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
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

    descargarZip(): void
    {
        this._carnetsService.setCarnetsValidados()
        .pipe(
            finalize(() => {

                // Show the alert
                this.openSnack();
            })
        )
        .subscribe(
            (response) => {
                let a = document.createElement('a')
                a.target = '_blanck'
                a.href = environment.baseUrl + 'download/fotos'
                a.click();
                
                // Set the alert
                this.alert = {
                    type   : 'warning',
                    message: 'Descargando ZIP...',
                    title  : 'Advertencia'
                };

            },
            (response) => {

                // Set the alert
                this.alert = {
                    type   : 'error',
                    message: 'Algo salió mal. Por favor, vuelva a intentarlo.',
                    title  : 'Error'
                };
            }
        );
    }

    selectObservados(event): void {
        const files = event.target.files[0];
        console.log(files);
        this.selectedCarnetForm.patchValue({file: files});
        this.uploadObservados();
    }

    uploadObservados(): void{
        const formData = new FormData();
        formData.append('file', this.selectedCarnetForm.getRawValue().file);
        
        // Disable the form
        this.selectedCarnetForm.disable();

        this._carnetsService.updateCarnets(formData)
        .pipe(
            finalize(() => {

                // Re-enable the form
                this.selectedCarnetForm.enable();

                // Reset the form
                this.selectedCarnetNgForm.resetForm();

                // Show the alert
                this.openSnack();
                
                // Mark for check
                this._changeDetectorRef.markForCheck();
            })
        )
        .subscribe(
            (newCarnet) => {
                
                // Config the alert
                this.alert = {
                    type   : 'success',
                    message: 'Datos cargados correctamente',
                    title: 'Guardado'
                };
            },
            (error) => {
                
                // Config the alert
                this.alert = {
                    type   : 'warn',
                    message: 'Error al cargar los datos',
                    title: 'Error'
                };
            });
    }
}
