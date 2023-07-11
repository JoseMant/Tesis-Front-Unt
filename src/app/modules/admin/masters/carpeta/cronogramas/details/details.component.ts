import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Cronograma, Resolucion, Unidad } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.types';
import { CronogramasListComponent } from 'app/modules/admin/masters/carpeta/cronogramas/list/list.component';
import { CronogramasService } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.service';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import moment from 'moment';

@Component({
    selector       : 'cronogramas-details',
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
export class CronogramasDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    editMode: boolean = false;
    cronograma: Cronograma;
    resoluciones: Resolucion[];
    cronogramaForm: FormGroup;
    cronogramas: Cronograma[];
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
        private _cronogramasListComponent: CronogramasListComponent,
        private _cronogramasService: CronogramasService,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router,
        private snackBar: MatSnackBar,
        private _userService: UserService
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
        this._cronogramasListComponent.matDrawer.open();

        // Create the cronograma form
        this.cronogramaForm = this._formBuilder.group({
            idCronograma_carpeta    : [null],
            tipo_colacion           : ['none', [Validators.required]],
            idUnidad                : [0, [Validators.required]],
            idTipo_tramite_unidad   : [0, [Validators.required]],
            idDependencia           : [0, [Validators.required]],
            fecha_colacion          : ['', [Validators.required]],
            fecha_cierre_alumno     : ['', [Validators.required]],
            fecha_cierre_secretaria : ['', [Validators.required]],
            fecha_cierre_decanato   : ['', [Validators.required]],
            estado                  : [true, [Validators.required]],
            visible                  : [true, [Validators.required]],
            avatar                  : [null]
        });

        // Get the cronogramas
        this._cronogramasService.cronogramas$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((cronogramas: Cronograma[]) => {
                this.cronogramas = cronogramas;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
            
        // Get the user
        this._cronogramasService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {
                this.user = user;
    
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
            
        // Get the cronograma
        this._cronogramasService.cronograma$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((cronograma: Cronograma) => {

                // Open the drawer in case it is closed
                this._cronogramasListComponent.matDrawer.open();

                // Get the cronograma
                this.cronograma = cronograma;
                this.cronograma.background = "assets/images/cards/"+ "14" +"-640x480.jpg";

                // Patch values to the form
                this.cronogramaForm.patchValue(cronograma);
                console.log(cronograma);
                if (cronograma.idCronograma_carpeta) {
                    this.selectedUnidad(cronograma.idUnidad);
                } else {
                    if (this.user.idUnidad) {
                        this.selectedUnidad(this.user.idUnidad);
                        this.cronogramaForm.patchValue({idDependencia: this.user.dependencia.idDependencia});
                    }
                }

                // Toggle the edit mode off
                if(!cronograma.idCronograma_carpeta){
                    this.toggleEditMode(true);
                }else{
                    this.toggleEditMode(false);
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._cronogramasService.unidades$
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
        if(this.cronogramaForm.get('fecha_cierre_secretaria').value <= moment(this.cronogramaForm.get('fecha_colacion').value).subtract(30, 'days')) this.maxDateAlumno = this.cronogramaForm.get('fecha_cierre_secretaria').value;
        else this.maxDateAlumno = moment(this.cronogramaForm.get('fecha_colacion').value).subtract(30, 'days');
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
        return this._cronogramasListComponent.matDrawer.close();
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
     * Save the cronograma
     */
    saveCronograma(): void
    {
        
        this.cronogramaForm.patchValue({
            fecha_colacion: (new Date(this.cronogramaForm.getRawValue().fecha_colacion)).toISOString().substring(0,10),
            fecha_cierre_alumno: (new Date(this.cronogramaForm.getRawValue().fecha_cierre_alumno)).toISOString().substring(0,10),
            fecha_cierre_secretaria: (new Date(this.cronogramaForm.getRawValue().fecha_cierre_secretaria)).toISOString().substring(0,10),
            fecha_cierre_decanato: (new Date(this.cronogramaForm.getRawValue().fecha_cierre_decanato)).toISOString().substring(0,10)
        });
        if (!this.cronograma.idCronograma_carpeta) {
            this.createCronograma();
        } else {
            this.updateCronograma();
        }
    }

    /**
     * Create the cronograma
     */
    createCronograma(): void
    {
        // Get the cronograma object
        const cronograma = this.cronogramaForm.getRawValue();

        // Create the cronograma on the server
        this._cronogramasService.createCronograma(cronograma).subscribe((newCronograma) => {
            // Toggle the edit mode off
            this.toggleEditMode(false);

            this._router.navigate(['./..'], {relativeTo: this._activatedRoute});
            
            this.alert = {
                type   : 'success',
                message: 'Cronograma registrado correctamente',
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
     * Update the cronograma
     */
    updateCronograma(): void
    {
        // Get the cronograma object
        const cronograma = this.cronogramaForm.getRawValue();
        console.log(cronograma);
        // Update the cronograma on the server
        this._cronogramasService.updateCronograma(cronograma.idCronograma_carpeta, cronograma).subscribe((updatedCronograma) => {
            // Toggle the edit mode off
            this.toggleEditMode(false);
            
            this.alert = {
                type   : 'success',
                message: 'Cronograma actualizado correctamente',
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
     * Delete the cronograma
     */
    deleteCronograma(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete cronograma',
            message: 'Are you sure you want to delete this cronograma? This action cannot be undone!',
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
                // Get the current cronograma's id
                const id = this.cronograma.idCronograma_carpeta;

                // Get the next/previous cronograma's id
                const currentCronogramaIndex = this.cronogramas.findIndex(item => item.idCronograma_carpeta === id);
                const nextCronogramaIndex = currentCronogramaIndex + ((currentCronogramaIndex === (this.cronogramas.length - 1)) ? -1 : 1);
                const nextCronogramaId = (this.cronogramas.length === 1 && this.cronogramas[0].idCronograma_carpeta === id) ? null : this.cronogramas[nextCronogramaIndex].idCronograma_carpeta;

                // Delete the cronograma
                this._cronogramasService.deleteCronograma(id)
                    .subscribe((isDeleted) => {

                        // Return if the cronograma wasn't deleted...
                        if ( !isDeleted )
                        {
                            return;
                        }

                        // Navigate to the next cronograma if available
                        if ( nextCronogramaId )
                        {
                            this._router.navigate(['../', nextCronogramaId], {relativeTo: this._activatedRoute});
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
        // this.cronogramaForm.patchValue({idUnidad: id, idDependencia: 0});

        this._cronogramasService.getTipoTramiteUnidades(id).subscribe((resp)=>{
            this.tipoTramiteUnidades = resp.tipo_tramite_unidad;
            
            this._changeDetectorRef.markForCheck();
        });

        this._cronogramasService.getDependenciasByUnidad(id).subscribe((response)=>{
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
