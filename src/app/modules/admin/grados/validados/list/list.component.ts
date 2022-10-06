import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { GradoPagination, GradoInterface, UserInterface } from 'app/modules/admin/grados/grados.types';
import { GradosService } from 'app/modules/admin/grados/grados.service';
import { MatDialog } from '@angular/material/dialog';
// import { VisorPdfGradoComponent } from '../visorPdf/visorPdfGrado.component';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'app/core/user/user.types';

@Component({
    selector       : 'grados-validados-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .grados-validados-grid {
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
export class GradosValidadosListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    grados$: Observable<GradoInterface[]>;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };

    users: UserInterface[];
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: GradoPagination;
    searchInputControl: FormControl = new FormControl();
    selectedTramites = [];
    selectedGradosForm: FormGroup;
    tagsEditMode: boolean = false;
    gradosCount: number = 0;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _gradosService: GradosService,
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
        // Create the selected grado form
        this.selectedGradosForm = this._formBuilder.group({
            idUsuario        : ['all', [Validators.required]],
            tramites         : [[]]
        });

        // Get the users
        this._gradosService.users$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((users: UserInterface[]) => {

                // Update the users
                this.users = users;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        
        // Get the pagination
        this._gradosService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: GradoPagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the grados
        this.grados$ = this._gradosService.grados$;

        this._gradosService.grados$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: GradoInterface[]) => {
                console.log(response);
                // Update the counts
                this.gradosCount = response.length;

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
                    return this._gradosService.getGradosValidados(0, 10, 'fecha', 'desc', query);
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

    // editarGrado(dataCer, lectura, estado): void {
    //     console.log(dataCer);
    //     dataCer['lectura'] = lectura;
    //     dataCer['des_estado_grado'] = estado;
    //     // dataCer['archivo'] = 'http://127.0.0.1:8000/storage/grados_tramites/001030822.pdf';
    //     const respDial = this.visordialog.open(
    //         VisorPdfGradoComponent,
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
    //             const gradoValidado = response.getRawValue();
    //             this._gradosService.updateGrado(gradoValidado.idGrado, gradoValidado ).subscribe((updateNew) => {
    //                 console.log(updateNew);
    //                 // Toggle the edit mode off
    //                 this.alert = {
    //                     type   : 'success',
    //                     message: 'Grado actualizado correctamente',
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

            // Get grados if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.isLoading = true;
                    return this._gradosService.getGradosValidados(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
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
    addTramiteToForm(tag: GradoInterface): void
    {
        // Add the tag
        this.selectedTramites.unshift(tag.idTramite);

        // Update the selected product form
        this.selectedGradosForm.get('tramites').patchValue(this.selectedTramites);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove tramite from the product
     *
     * @param tramite
     */
    removeTramiteFromForm(tramite: GradoInterface): void
    {
        // Remove the tramite
        this.selectedTramites.splice(this.selectedTramites.findIndex(item => item === tramite.idTramite), 1);

        // Update the selected product form
        this.selectedGradosForm.get('tramites').patchValue(this.selectedTramites);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle product tramite
     *
     * @param tramite
     * @param change
     */
    toggleTramite(tramite: GradoInterface, change: MatCheckboxChange): void
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

    asignarUsuarioGrados(): void
    {
        // Get the product object
        const data = this.selectedGradosForm.getRawValue();
        
        // Update the product on the server
        this._gradosService.asignarUsuarioGrados(data).subscribe(() => {
            
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
