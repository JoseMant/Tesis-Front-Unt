import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CarpetasPagination, CarpetaInterface } from 'app/modules/admin/carpetas/carpetas.types';
import { CarpetasService } from 'app/modules/admin/carpetas/carpetas.service';
import { MatDialog } from '@angular/material/dialog';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { CarpetaURAPendienteDialogComponent } from 'app/modules/admin/carpetas/ura/pendientes/dialog/dialog.component';
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import { Resolucion } from 'app/modules/admin/masters/carpeta/resoluciones/resoluciones.types';

@Component({
    selector       : 'carpetas-pendientes-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .carpetas-pendientes-grid {
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
export class CarpetasURAPendientesListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    @ViewChild('selectedResolucionNgForm') selectedResolucionNgForm: NgForm;

    carpetas$: Observable<CarpetaInterface[]>;
    resolucion$: Observable<Resolucion>;
    
    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: CarpetasPagination;
    searchInputControl: FormControl = new FormControl('');
    selectedCarpeta: CarpetaInterface | null = null;
    selectedCarpetaForm: FormGroup;
    selectedResolucionForm: FormGroup;
    tagsEditMode: boolean = false;
    carpetasCount: number = 0;
    asignando: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    
    /**
     * Constructor
    */
   constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _carpetasService: CarpetasService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
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
        // Create the selected resolucion form
        this.selectedResolucionForm = this._formBuilder.group({
            idResolucion     : [''],
            nro_resolucion   : ['', [Validators.required]]
        });

        // Create the selected carpeta form
        this.selectedCarpetaForm = this._formBuilder.group({
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

        const idResolucion: any = this._activatedRoute.snapshot.params.idResolucion || null;

        if (idResolucion) {
            // Get the resolucion
            this.resolucion$ = this._carpetasService.resolucion$;

            this._carpetasService.resolucion$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: Resolucion) => {

                this.selectedResolucionForm.patchValue(response);
                this.selectedResolucionForm.disable();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        }
        else {
            this.selectedResolucionForm.enable();
            this.selectedResolucionForm.patchValue({nro_resolucion: ''});

            this._carpetasService.cleanCarpetas$;
        };

        // Get the pagination
        this._carpetasService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: CarpetasPagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the carpetas
        this.carpetas$ = this._carpetasService.carpetas$;

        this._carpetasService.carpetas$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: CarpetaInterface[]) => {
                console.log(response);
                // Update the counts
                if (response) {
                    this.carpetasCount = response.length;
                } else this.carpetasCount = 0;

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
                    var data = this.selectedResolucionForm.get('idResolucion').value;
                    return this._carpetasService.getCarpetasPendientesImpresion(data, 0, this._paginator.pageSize, this._sort.active, this._sort.direction, query);
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

            // Get carpetas if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.isLoading = true;
                    // Get the product object
                    const data = this.selectedResolucionForm.get('idResolucion').value;
                    if (this.searchInputControl.value) {
                        return this._carpetasService.getCarpetasPendientesImpresion(data, this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction, this.searchInputControl.value);
                    } else {
                        return this._carpetasService.getCarpetasPendientesImpresion(data, this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
                    }
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        }
    }

    limpiarResolucion() {
        // Get the parent url
        const parentUrl = this._router.url.split('/').slice(0, -1).join('/');
        
        // Navigate to there
        this._router.navigateByUrl(parentUrl);
    }

    getFileDiploma(fileName: number) {
        return environment.baseUrlStorage + fileName;
    }

    verCodigoDiploma(carpeta): void {
        const respDial = this.visordialog.open(
            CarpetaURAPendienteDialogComponent,
            {
                data: carpeta,
                disableClose: true,
                minWidth: '50%',
                maxWidth: '60%'
            }
        );
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

    buscarResolucion(state: RouterStateSnapshot): void
    {
        // Get the product object
        const data = this.selectedResolucionForm.get('nro_resolucion').value;
        
        this._carpetasService.getResolucion(data).subscribe((response) => {
            console.log(response);
            if (response.resolucion) {
                this.selectedResolucionForm.patchValue(response.resolucion);
                console.log(this.selectedResolucionForm.getRawValue());
                this.selectedResolucionForm.disable();
                
                // Show a success message
                this.alert = {
                    type   : 'success',
                    message: 'Resolución encontrada',
                    title: 'Encontrado'
                };
                this.openSnack();
                
                // Mark for check
                this._changeDetectorRef.markForCheck();

                // Get the parent url
                const parentUrl = this._router.url + '/' + response.resolucion.idResolucion;
                
                // Navigate to there
                this._router.navigateByUrl(parentUrl);
            }
        },
        (response) => {
            this.alert = {
                type   : 'warn',
                message: response.error.message,
                title: 'Error'
            };
            this.openSnack();
        });
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
