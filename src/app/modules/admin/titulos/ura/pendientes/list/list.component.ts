import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TituloPagination, TituloInterface } from 'app/modules/admin/titulos/titulos.types';
import { TitulosService } from 'app/modules/admin/titulos/titulos.service';
import { MatDialog } from '@angular/material/dialog';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { TituloURAPendienteDialogComponent } from 'app/modules/admin/titulos/ura/pendientes/dialog/dialog.component';

@Component({
    selector       : 'titulos-pendientes-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .titulos-pendientes-grid {
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
export class TitulosURAPendientesListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    @ViewChild('selectedResolucionNgForm') selectedResolucionNgForm: NgForm;

    titulos$: Observable<TituloInterface[]>;
    
    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: TituloPagination;
    searchInputControl: FormControl = new FormControl();
    selectedTitulo: TituloInterface | null = null;
    selectedTituloForm: FormGroup;
    selectedResolucionForm: FormGroup;
    tagsEditMode: boolean = false;
    titulosCount: number = 0;
    asignando: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    
    /**
     * Constructor
    */
   constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _titulosService: TitulosService,
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
        this._titulosService.cleanTitulos$;
        
        // Create the selected resolucion form
        this.selectedResolucionForm = this._formBuilder.group({
            idResolucion     : [''],
            nro_resolucion             : ['', [Validators.required]]
        });

        // Create the selected titulo form
        this.selectedTituloForm = this._formBuilder.group({
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
        this._titulosService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: TituloPagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the titulos
        this.titulos$ = this._titulosService.titulos$;

        this._titulosService.titulos$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: TituloInterface[]) => {
                console.log(response);
                // Update the counts
                if (response) {
                    this.titulosCount = response.length;
                } else this.titulosCount = 0;

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
                    var data = this.selectedResolucionForm.get('nro_resolucion').value;
                    return this._titulosService.getTitulosPendientesImpresion(data, 0, 10, 'fecha', 'desc', query);
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

    limpiarResolucion() {
        this.selectedResolucionForm.enable();
        this.selectedResolucionForm.patchValue({nro_resolucion: ''});
        this._titulosService.cleanTitulos$;
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

            // Get titulos if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.isLoading = true;
                    // Get the product object
                    const data = this.selectedResolucionForm.get('nro_resolucion').value;
                    return this._titulosService.getTitulosPendientesImpresion(data, this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        }
    }

    verLibro() {
        
    }

    getFileDiploma(fileName: string) {
        return environment.baseUrlStorage + fileName;
    }

    verCodigoDiploma(titulo): void {
        const respDial = this.visordialog.open(
            TituloURAPendienteDialogComponent,
            {
                data: titulo,
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

    buscarResolucion(): void
    {
        // Get the product object
        const data = this.selectedResolucionForm.get('nro_resolucion').value;
        
        this._titulosService.getTitulosPendientesImpresion(data).subscribe((response) => {
            console.log(response)
            if (response.resolucion) {
                this.selectedResolucionForm.patchValue(response.resolucion);
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
            } else {
                this.selectedResolucionForm.enable();
                
                // Show a warn message
                this.alert = {
                    type   : 'warn',
                    message: 'Resolución no encontrada, inténtelo nuevamente',
                    title: 'No encontrado'
                };
                this.openSnack();
                
                // Mark for check
                this._changeDetectorRef.markForCheck();
            }

        });
    }

    registrarEnLibro() {
        const data = this.selectedResolucionForm.getRawValue();
        // Create the cronograma on the server
        this._titulosService.registrarLibro(data.idResolucion).subscribe((response) => {
            this.alert = {
                type   : 'success',
                message: 'Registrados en el libro correctamente',
                title: 'Guardado'
            };
            this.openSnack();
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
