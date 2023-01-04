import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Acreditada, Unidad } from 'app/modules/admin/masters/bachiller_grado/acreditadas/acreditadas.types';
import { AcreditadasListComponent } from 'app/modules/admin/masters/bachiller_grado/acreditadas/list/list.component';
import { AcreditadasService } from 'app/modules/admin/masters/bachiller_grado/acreditadas/acreditadas.service';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';

@Component({
    selector       : 'acreditadas-details',
    templateUrl    : './details.component.html',
    styles         : [
        /* language=SCSS */
        `
            .fondo_snackbar {
                background-color:transparent !important;
                padding: 0px !important;
                height: 0px;
                min-height: 0px !important;
            }
        `
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcreditadasDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    editMode: boolean = false;
    acreditada: Acreditada;
    acreditadaForm: FormGroup;
    acreditadas: Acreditada[];
    dependencias: any;
    user: any;
    tipos_colaciones = [
        {id: 'ORDINARIO', name: 'ORDINARIO'},
        {id: 'EXTRAORDINARIO', name: 'EXTRAORDINARIO'}
    ];
    tipoTramiteUnidades: any;
    unidades: Unidad[];
    minDate: any;
    maxDateAlumno: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _acreditadasListComponent: AcreditadasListComponent,
        private _acreditadasService: AcreditadasService,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router,
        private snackBar: MatSnackBar
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

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
     * On init
     */
    ngOnInit(): void
    {
        // Open the drawer
        this._acreditadasListComponent.matDrawer.open();

        // Create the acreditada form
        this.acreditadaForm = this._formBuilder.group({
            idAcreditacion    : [null],
            idUnidad                : [0, [Validators.required]],
            idDependencia           : [0, [Validators.required]],
            fecha_inicio          : ['', [Validators.required]],
            fecha_fin     : ['', [Validators.required]],
            empresa_acreditadora : ['', [Validators.required]],
            estado                  : [true, [Validators.required]],
            avatar      : [null]
        });

        // Get the acreditadas
        this._acreditadasService.acreditadas$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((acreditadas: Acreditada[]) => {
                this.acreditadas = acreditadas;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
            
        // Get the user
        this._acreditadasService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {
                this.user = user;
    
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
            
        // Get the acreditada
        this._acreditadasService.acreditada$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((acreditada: Acreditada) => {

                // Open the drawer in case it is closed
                this._acreditadasListComponent.matDrawer.open();

                // Get the acreditada
                this.acreditada = acreditada;
                this.acreditada.background = "assets/images/cards/"+ "14" +"-640x480.jpg";

                // Patch values to the form
                this.acreditadaForm.patchValue(acreditada);
                console.log(acreditada);
                if (acreditada.idAcreditacion) {
                    this.selectedUnidad(acreditada.idUnidad);
                } else {
                    if (this.user.idUnidad) {
                        this.selectedUnidad(this.user.idUnidad);
                        this.acreditadaForm.patchValue({idDependencia: this.user.dependencia.idDependencia});
                    }
                }

                // Toggle the edit mode off
                if(!acreditada.idAcreditacion){
                    this.toggleEditMode(true);
                }else{
                    this.toggleEditMode(false);
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._acreditadasService.unidades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((unidades: Unidad[]) => {
                this.unidades = unidades;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this.minDate = moment();
    }

    endDateChange(event: any): void
    {
        if(this.acreditadaForm.get('fecha_cierre_secretaria').value <= moment(this.acreditadaForm.get('fecha_colacion').value).subtract(30, 'days')) this.maxDateAlumno = this.acreditadaForm.get('fecha_cierre_secretaria').value;
        else this.maxDateAlumno = moment(this.acreditadaForm.get('fecha_colacion').value).subtract(30, 'days');
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
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._acreditadasListComponent.matDrawer.close();
    }

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void
    {
        if ( editMode === null )
        {
            this.editMode = !this.editMode;
        }
        else
        {
            this.editMode = editMode;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Save the acreditada
     */
    saveAcreditada(): void
    {
        
        this.acreditadaForm.patchValue({
            fecha_colacion: (new Date(this.acreditadaForm.getRawValue().fecha_colacion)).toISOString().substring(0,10),
            fecha_cierre_alumno: (new Date(this.acreditadaForm.getRawValue().fecha_cierre_alumno)).toISOString().substring(0,10),
            fecha_cierre_secretaria: (new Date(this.acreditadaForm.getRawValue().fecha_cierre_secretaria)).toISOString().substring(0,10),
            fecha_cierre_decanato: (new Date(this.acreditadaForm.getRawValue().fecha_cierre_decanato)).toISOString().substring(0,10)
        });
        if (!this.acreditada.idAcreditacion) {
            this.createAcreditada();
        } else {
            this.updateAcreditada();
        }
    }

    /**
     * Create the acreditada
     */
    createAcreditada(): void
    {
        // Get the acreditada object
        const acreditada = this.acreditadaForm.getRawValue();

        // Create the acreditada on the server
        this._acreditadasService.createAcreditada(acreditada).subscribe((newAcreditada) => {
            // Toggle the edit mode off
            this.toggleEditMode(false);

            this._router.navigate(['./..'], {relativeTo: this._activatedRoute});
            
            this.alert = {
                type   : 'success',
                message: 'Acreditada registrado correctamente',
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
     * Update the acreditada
     */
    updateAcreditada(): void
    {
        // Get the acreditada object
        const acreditada = this.acreditadaForm.getRawValue();

        // Update the acreditada on the server
        this._acreditadasService.updateAcreditada(acreditada.idAcreditacion, acreditada).subscribe((updatedAcreditada) => {
            // Toggle the edit mode off
            this.toggleEditMode(false);
            
            this.alert = {
                type   : 'success',
                message: 'Acreditada actualizado correctamente',
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
     * Delete the acreditada
     */
    deleteAcreditada(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete acreditada',
            message: 'Are you sure you want to delete this acreditada? This action cannot be undone!',
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
                // Get the current acreditada's id
                const id = this.acreditada.idAcreditacion;

                // Get the next/previous acreditada's id
                const currentAcreditadaIndex = this.acreditadas.findIndex(item => item.idAcreditacion === id);
                const nextAcreditadaIndex = currentAcreditadaIndex + ((currentAcreditadaIndex === (this.acreditadas.length - 1)) ? -1 : 1);
                const nextAcreditadaId = (this.acreditadas.length === 1 && this.acreditadas[0].idAcreditacion === id) ? null : this.acreditadas[nextAcreditadaIndex].idAcreditacion;

                // Delete the acreditada
                this._acreditadasService.deleteAcreditada(id)
                    .subscribe((isDeleted) => {

                        // Return if the acreditada wasn't deleted...
                        if ( !isDeleted )
                        {
                            return;
                        }

                        // Navigate to the next acreditada if available
                        if ( nextAcreditadaId )
                        {
                            this._router.navigate(['../', nextAcreditadaId], {relativeTo: this._activatedRoute});
                        }
                        // Otherwise, navigate to the parent
                        else
                        {
                            this._router.navigate(['../'], {relativeTo: this._activatedRoute});
                        }

                        // Toggle the edit mode off
                        this.toggleEditMode(false);
                    });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

    }

    selectedUnidad(id): void{
        // this.acreditadaForm.patchValue({idUnidad: id, idDependencia: 0});

        this._acreditadasService.getTipoTramiteUnidades(id).subscribe((resp)=>{
            this.tipoTramiteUnidades = resp.tipo_tramite_unidad;
            
            this._changeDetectorRef.markForCheck();
        });

        this._acreditadasService.getDependenciasByUnidad(id).subscribe((response)=>{
            this.dependencias = response;
            
            this._changeDetectorRef.markForCheck();
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
