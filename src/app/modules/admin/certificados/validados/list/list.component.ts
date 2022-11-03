import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CertificadoPagination, CertificadoInterface, UserInterface } from 'app/modules/admin/certificados/certificados.types';
import { CertificadosService } from 'app/modules/admin/certificados/certificados.service';
import { MatDialog } from '@angular/material/dialog';
// import { VisorPdfCertificadoComponent } from '../visorPdf/visorPdfCertificado.component';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'app/core/user/user.types';

@Component({
    selector       : 'certificados-validados-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .certificados-validados-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px 112px auto 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px 190px auto 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px 190px auto 96px 112px 190px 190px 72px;
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
export class CertificadosValidadosListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    certificados$: Observable<CertificadoInterface[]>;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };

    users: UserInterface[];
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: CertificadoPagination;
    searchInputControl: FormControl = new FormControl();
    selectedTramites = [];
    selectedCertificadosForm: FormGroup;
    tagsEditMode: boolean = false;
    certificadosCount: number = 0;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _certificadosService: CertificadosService,
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
        // Create the selected certificado form
        this.selectedCertificadosForm = this._formBuilder.group({
            idUsuario        : ['all', [Validators.required]],
            tramites         : [[]]
        });

        // Get the users
        this._certificadosService.users$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((users: UserInterface[]) => {

                // Update the users
                this.users = users;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        
        // Get the pagination
        this._certificadosService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: CertificadoPagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the certificados
        this.certificados$ = this._certificadosService.certificados$;

        this._certificadosService.certificados$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: CertificadoInterface[]) => {
                console.log(response);
                // Update the counts
                this.certificadosCount = response.length;

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
                    return this._certificadosService.getCertificadosValidados(0, 10, 'fecha', 'desc', query);
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

            // Get certificados if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.isLoading = true;
                    return this._certificadosService.getCertificadosValidados(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        }
    }

    /**
     * Add tag to the product
     *
     * @param tag
     */
    addTramiteToForm(tag: CertificadoInterface): void
    {
        // Add the tag
        this.selectedTramites.unshift(tag.idTramite);

        // Update the selected product form
        this.selectedCertificadosForm.get('tramites').patchValue(this.selectedTramites);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove tramite from the product
     *
     * @param tramite
     */
    removeTramiteFromForm(tramite: CertificadoInterface): void
    {
        // Remove the tramite
        this.selectedTramites.splice(this.selectedTramites.findIndex(item => item === tramite.idTramite), 1);

        // Update the selected product form
        this.selectedCertificadosForm.get('tramites').patchValue(this.selectedTramites);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle product tramite
     *
     * @param tramite
     * @param change
     */
    toggleTramite(tramite: CertificadoInterface, change: MatCheckboxChange): void
    {
        console.log(tramite);
        if ( change.checked )
        {
            this.addTramiteToForm(tramite);
        }
        else
        {
            this.removeTramiteFromForm(tramite);
        }
    }


    validateInclude(idTramite: number): void
    {
        console.log(this.selectedTramites.includes(idTramite));
    }

    asignarUsuarioCertificados(): void
    {
        // Get the product object
        const data = this.selectedCertificadosForm.getRawValue();
        
        // Update the product on the server
        this._certificadosService.asignarUsuarioCertificados(data).subscribe(() => {
            
            // Show a success message
            this.alert = {
                type   : 'success',
                message: 'Trámite(s) asignado(s) correctamente',
                title: 'Guardado'
            };
            this.openSnack();
            
            // Mark for check
            this._changeDetectorRef.markForCheck();

        });
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
