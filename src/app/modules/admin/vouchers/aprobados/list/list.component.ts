import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { VoucherPagination, VoucherInterface } from 'app/modules/admin/vouchers/vouchers.types';
import { VouchersService } from 'app/modules/admin/vouchers/vouchers.service';

@Component({
    selector       : 'vouchers-aprobados-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .aprobados-grid {
                grid-template-columns: 96px auto 40px;

                @screen sm {
                    grid-template-columns: 96px 190px auto 72px;
                }

                @screen md {
                    grid-template-columns: 96px 190px auto 96px 72px;
                }

                @screen lg {
                    grid-template-columns: 96px 190px auto 96px 96px 96px 96px 72px;
                }
            }
        `
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations
})
export class VouchersAprobadosListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    vouchers$: Observable<VoucherInterface[]>;

    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: VoucherPagination;
    searchInputControl: FormControl = new FormControl();
    selectedVoucher: VoucherInterface | null = null;
    selectedVoucherForm: FormGroup;
    tagsEditMode: boolean = false;
    vouchersCount: number = 0;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _vouchersService: VouchersService
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
        // Create the selected voucher form
        this.selectedVoucherForm = this._formBuilder.group({
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
        this._vouchersService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: VoucherPagination) => {
        
                // Update the pagination
                this.pagination = pagination;
        
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the vouchers
        this.vouchers$ = this._vouchersService.vouchers$;

        this._vouchersService.vouchers$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: VoucherInterface[]) => {

                // Update the counts
                this.vouchersCount = response.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._vouchersService.getVouchersAprobados(0, 10, 'nro_tramite', 'asc', query);
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

                    // Close the details
                    this.closeDetails();
                });

            // Get vouchers if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._vouchersService.getVouchersAprobados(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
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
     * Toggle voucher details
     *
     * @param voucherId
     */
    toggleDetails(voucherId: number): void
    {
        // If the voucher is already selected...
        if ( this.selectedVoucher && this.selectedVoucher.idVoucher === voucherId )
        {
            // Close the details
            this.closeDetails();
            return;
        }

        // Get the voucher by id
        this._vouchersService.getVoucherById(voucherId)
            .subscribe((voucher) => {

                // Set the selected voucher
                this.selectedVoucher = voucher;

                // Fill the form
                this.selectedVoucherForm.patchValue(voucher);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * Close the details
     */
    closeDetails(): void
    {
        this.selectedVoucher = null;
    }

    /**
     * Cycle through images of selected voucher
     */
    cycleImages(forward: boolean = true): void
    {
        // Get the image count and current image index
        const count = this.selectedVoucherForm.get('images').value.length;
        const currentIndex = this.selectedVoucherForm.get('currentImageIndex').value;

        // Calculate the next and previous index
        const nextIndex = currentIndex + 1 === count ? 0 : currentIndex + 1;
        const prevIndex = currentIndex - 1 < 0 ? count - 1 : currentIndex - 1;

        // If cycling forward...
        if ( forward )
        {
            this.selectedVoucherForm.get('currentImageIndex').setValue(nextIndex);
        }
        // If cycling backwards...
        else
        {
            this.selectedVoucherForm.get('currentImageIndex').setValue(prevIndex);
        }
    }

    /**
     * Toggle the tags edit mode
     */
    toggleTagsEditMode(): void
    {
        this.tagsEditMode = !this.tagsEditMode;
    }

    /**
     * Create voucher
     */
    createVoucher(): void
    {
        // Create the voucher
        this._vouchersService.createVoucher().subscribe((newVoucher) => {

            // Go to new voucher
            this.selectedVoucher = newVoucher;

            // Fill the form
            this.selectedVoucherForm.patchValue(newVoucher);

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Update the selected voucher using the form data
     */
    updateSelectedVoucher(): void
    {
        // Get the voucher object
        const voucher = this.selectedVoucherForm.getRawValue();

        // Remove the currentImageIndex field
        delete voucher.currentImageIndex;

        // Update the voucher on the server
        this._vouchersService.updateVoucher(voucher.id, voucher).subscribe(() => {

            // Show a success message
            this.showFlashMessage('success');
        });
    }

    /**
     * Delete the selected voucher using the form data
     */
    deleteSelectedVoucher(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete voucher',
            message: 'Are you sure you want to remove this voucher? This action cannot be undone!',
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

                // Get the voucher object
                const voucher = this.selectedVoucherForm.getRawValue();

                // Delete the voucher on the server
                this._vouchersService.deleteVoucher(voucher.id).subscribe(() => {

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
