import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil, finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CarnetPagination, CarnetInterface, SedeInterface } from 'app/modules/admin/carnets/carnets.types';
import { CarnetsService } from 'app/modules/admin/carnets/carnets.service';
import { MatDialog } from '@angular/material/dialog';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { AuthService } from 'app/core/auth/auth.service';
@Component({
    selector       : 'carnets-recibidos-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .carnets-finalizados-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px 112px auto 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px 190px auto 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 114px 210px auto 150px 132px 118px 204px 114px 120px;
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
export class CarnetsFinalizadosListComponent implements OnInit, AfterViewInit, OnDestroy
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
    searchInputControl: FormControl = new FormControl('');
    searchOptionControl: FormControl = new FormControl('TRUJILLO');
    selectedCarnet: CarnetInterface | null = null;
    selectedCarnetForm: FormGroup;
    tagsEditMode: boolean = false;
    carnetsCount: number = 0;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    sedes: SedeInterface[];
    anio:any;
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
        private _authService: AuthService
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
            sede :['']
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
                
                // Update the counts
                this.carnetsCount = response.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

            this._carnetsService.sedes$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: SedeInterface[]) => {
                
                // Update the counts
                this.sedes = response;
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
                    const form = this.selectedCarnetForm.getRawValue();
                    return this._carnetsService.getCarnetsFinalizados(0, 100, 'fecha', 'desc', query,form.sede);

                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe(()=>
            {
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to search input field value changes
        this.selectedCarnetForm.get('sede').valueChanges
            .pipe(
                switchMap(() => {
                    this.isLoading = true;
                    const form = this.selectedCarnetForm.getRawValue();
                    return this._carnetsService.getCarnetsFinalizados(0, 100, 'fecha', 'desc','',form.sede)
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
    }

    cambioPagina(evento): void {
        const form = this.selectedCarnetForm.getRawValue();
        if(this._sort.active) {
            this._carnetsService.getCarnetsFinalizados(evento.pageIndex, evento.pageSize, this._sort.active, this._sort.direction, this.searchInputControl.value,form.sede).subscribe();
        }
        else {
            this._carnetsService.getCarnetsFinalizados(evento.pageIndex, evento.pageSize, 'nro_tramite', 'asc', this.searchInputControl.value,form.sede).subscribe();
        }
    }

    verCarnetsFinalizadosSecretaria() {

        /* const data = this.selectedResolucionForm.getRawValue(); */
        const form = this.selectedCarnetForm.getRawValue();
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', environment.baseUrl + 'carnets/finalizados?access='+ this._authService.accessToken+'&sede='+form.sede);
        /* link.setAttribute('href', environment.baseUrl + 'padron_sunedu/' + data.idResolucion); */
        document.body.appendChild(link);
        link.click();
        link.remove();
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

            // Get carnets if sort or page changes
            merge(this._sort.sortChange).pipe(
                switchMap(() => {
                    this.isLoading = true;
                    const form = this.selectedCarnetForm.getRawValue();
                    return this._carnetsService.getCarnetsFinalizados(Number(this.pagination.page), Number(this.pagination.size), this._sort.active, this._sort.direction, this.searchInputControl.value,form.sede);

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

    finalizarCarnet(carnet: CarnetInterface): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Entregar carnet a ' +  carnet.solicitante,
            message: '¿Estás seguro de que quieres entregar este carnet? ¡Esta acción no se puede deshacer!',
            actions: {
                confirm: {
                    label: 'Entregar'
                },
                cancel: {
                    label: 'Cancelar'
                }

            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {
                // Get the tramite object
                // const tramite = this.selectedTramite;
                
                // // Config the alert
                // this.alert = {
                //     type   : 'warning',
                //     message: 'El sistema está cargando...',
                //     title: 'Advertencia'
                // };
                
                // Delete the tramite on the server
                this._carnetsService.finalizarCarnet(carnet.idTramite, carnet)
                .pipe(
                    finalize(() => {
                        // Config the alert
                        this.alert = {
                            type   : 'success',
                            message: 'Carné entregado al alumno',
                            title: 'Actualizado'
                        };

                        // Show the alert
                        this.openSnack();
                        
                        // Mark for check
                        this._changeDetectorRef.markForCheck();
                    })
                )
                .subscribe(
                    (response) => {
                        console.log(response);
                
                        this.openSnack();
                    }
                );
            }
        });
    }
}
