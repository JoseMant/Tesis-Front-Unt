import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { ApexOptions } from 'ng-apexcharts';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { HomePagination, HomeTramite } from 'app/modules/admin/home/home.types';
import { HomeService } from 'app/modules/admin/home/home.service';

@Component({
    selector       : 'home-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .home-grid {
                grid-template-columns: 96px auto 40px;

                @screen sm {
                    grid-template-columns: 96px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 112px auto 112px 190px 72px;
                }

                @screen lg {
                    grid-template-columns: 112px auto 112px 224px 72px;
                }
            }

            .home-details-grid {
                grid-template-columns: 96px auto 40px;

                @screen sm {
                    grid-template-columns: 96px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 112px auto 112px 190px 72px;
                }

                @screen lg {
                    grid-template-columns: 112px auto 112px 224px 72px;
                }
            }
        `
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations
})
export class HomeListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    tramites$: Observable<HomeTramite[]>;

    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: HomePagination;
    searchInputControl: FormControl = new FormControl();
    selectedTramite: HomeTramite | null = null;
    selectedTramiteForm: FormGroup;
    data: any;
    accountBalanceOptions: ApexOptions;
    recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['nro_tramite', 'tramite', 'created_at', 'estado', 'opciones'];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _homeService: HomeService
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
        // Get the pagination
        this._homeService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: HomePagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the tramites
        this.tramites$ = this._homeService.tramites$;

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._homeService.getTramites(0, 10, 'created_at', 'desc', query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            )
            .subscribe();
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
                id          : 'created_at',
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

                    // Close the details
                    this.closeDetails();
                });

            // Get tramites if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._homeService.getTramites(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
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
     * Toggle tramite details
     *
     * @param tramiteId
     */
    toggleDetails(tramiteId: number): void
    {
        // If the tramite is already selected...
        if ( this.selectedTramite && this.selectedTramite.idTramite === tramiteId )
        {
            // Close the details
            this.closeDetails();
            return;
        }

        // Get the tramite by id
        this._homeService.getTramiteById(tramiteId)
            .subscribe((tramite) => {

                // Set the selected tramite
                console.log(tramite);
                this.selectedTramite = tramite;
                this.recentTransactionsDataSource.data = tramite.historial;

                // Fill the form
                // this.selectedTramiteForm.patchValue(tramite);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * Close the details
     */
    closeDetails(): void
    {
        this.selectedTramite = null;
    }

    /**
     * Cycle through images of selected tramite
     */
    cycleImages(forward: boolean = true): void
    {
        // Get the image count and current image index
        const count = this.selectedTramiteForm.get('images').value.length;
        const currentIndex = this.selectedTramiteForm.get('currentImageIndex').value;

        // Calculate the next and previous index
        const nextIndex = currentIndex + 1 === count ? 0 : currentIndex + 1;
        const prevIndex = currentIndex - 1 < 0 ? count - 1 : currentIndex - 1;

        // If cycling forward...
        if ( forward )
        {
            this.selectedTramiteForm.get('currentImageIndex').setValue(nextIndex);
        }
        // If cycling backwards...
        else
        {
            this.selectedTramiteForm.get('currentImageIndex').setValue(prevIndex);
        }
    }

    createTramite(): void
    {
        // Create the tramite
        this._homeService.createTramite().subscribe((newTramite) => {

            // Go to new tramite
            this.selectedTramite = newTramite;

            // Fill the form
            this.selectedTramiteForm.patchValue(newTramite);

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Update the selected tramite using the form data
     */
    updateSelectedTramite(): void
    {
        // Get the tramite object
        const tramite = this.selectedTramiteForm.getRawValue();

        // Remove the currentImageIndex field
        delete tramite.currentImageIndex;

        // Update the tramite on the server
        this._homeService.updateTramite(tramite.id, tramite).subscribe(() => {

            // Show a success message
            this.showFlashMessage('success');
        });
    }

    /**
     * Delete the selected tramite using the form data
     */
    deleteSelectedTramite(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete tramite',
            message: 'Are you sure you want to remove this tramite? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {

                // Get the tramite object
                const tramite = this.selectedTramiteForm.getRawValue();

                // Delete the tramite on the server
                this._homeService.deleteTramite(tramite.id).subscribe(() => {

                    // Close the details
                    this.closeDetails();
                });
            }
        });
    }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void
    {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {

            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
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