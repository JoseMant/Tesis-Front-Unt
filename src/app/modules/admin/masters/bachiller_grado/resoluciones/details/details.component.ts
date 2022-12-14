import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Resolucion, Role, Unidad } from 'app/modules/admin/masters/bachiller_grado/resoluciones/resoluciones.types';
import { ResolucionesListComponent } from 'app/modules/admin/masters/bachiller_grado/resoluciones/list/list.component';
import { ResolucionesService } from 'app/modules/admin/masters/bachiller_grado/resoluciones/resoluciones.service';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector       : 'resoluciones-details',
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
export class ResolucionesDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    editMode: boolean = false;
    resolucion: Resolucion;
    resolucionForm: FormGroup;
    resoluciones: Resolucion[];
    roles: Role[];
    unidades: Unidad[];
    dependencias: any;
    facultades: any;
    tipos_documentos = [
        {id: '1', name: 'DNI', description: 'DOCUMENTO NACIONAL DE IDENTIDAD'},
        {id: '3', name: 'CE', description: 'CARNET DE EXTRANGERÍA' }
    ];
    generos = [
        {id: 'M', name: 'MASCULINO' },
        {id: 'F', name: 'FEMENINO'}
    ];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _resolucionesListComponent: ResolucionesListComponent,
        private _resolucionesService: ResolucionesService,
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
        this._resolucionesListComponent.matDrawer.open();

        // Create the resolucion form
        this.resolucionForm = this._formBuilder.group({
            idResolucion          : [null],
            idTipo_usuario    : [null, [Validators.required]],
            resolucionname       : ['', [Validators.required]],
            nombres        : ['', [Validators.required]],
            apellidos        : ['', [Validators.required]],
            tipo_documento     : ['', [Validators.required]],
            nro_documento     : ['', [Validators.required]],
            correo        : ['', [Validators.required]],
            celular        : ['', [Validators.required]],
            sexo        : ['', [Validators.required]],
            estado        : [null, [Validators.required]],
            avatar      : [null],

            idUnidad: [''],
            idDependencia: [''],
            idFacultad: ['']
        });

        // Get the resoluciones
        this._resolucionesService.resoluciones$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((resoluciones: Resolucion[]) => {
                this.resoluciones = resoluciones;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the resolucion
        this._resolucionesService.resolucion$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((resolucion: Resolucion) => {

                // Open the drawer in case it is closed
                this._resolucionesListComponent.matDrawer.open();

                // Get the resolucion
                this.resolucion = resolucion;
                this.resolucion.background = "assets/images/cards/"+ "14" +"-640x480.jpg";

                // Patch values to the form
                this.resolucionForm.patchValue(resolucion);
                if (this.resolucionForm.get('idTipo_usuario').value == 6 || this.resolucionForm.get('idTipo_usuario').value == 8) {
                    this.resolucionForm.patchValue({idUnidad: 1});
                    this._resolucionesService.getDependenciasByUnidad(1).subscribe((response)=>{
                        this.dependencias = response;
                        
                        this._changeDetectorRef.markForCheck();
                    });
                } else if (this.resolucionForm.get('idTipo_usuario').value == 5) {
                    this.resolucionForm.patchValue({idUnidad: 1});
                    this.dependencias = [];
                    this._resolucionesService.getDependenciasByUnidad(1).subscribe((response)=>{
                        this.facultades = response;
                        
                        this._changeDetectorRef.markForCheck();
                    });
                    this._resolucionesService.getEscuelasByDependencia(resolucion.idFacultad).subscribe((response)=>{
                        this.dependencias = response;
                        
                        this._changeDetectorRef.markForCheck();
                    });
                    console.log(this.resolucionForm.getRawValue().idDependencia)
                } else if (this.resolucionForm.get('idTipo_usuario').value == 17) {
                    this.resolucionForm.patchValue({idUnidad: 4});
                    this._resolucionesService.getDependenciasByUnidad(4).subscribe((response)=>{
                        this.dependencias = response;
                        
                        this._changeDetectorRef.markForCheck();
                    });
                } else {
                    this.resolucionForm.patchValue({idUnidad: ''});
                    this.dependencias = [];
                }

                // Toggle the edit mode off
                if(!resolucion.idResolucion){
                    this.toggleEditMode(true);
                }else{
                    this.toggleEditMode(false);
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the country telephone codes
        this._resolucionesService.roles$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((roles: Role[]) => {
                this.roles = roles;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._resolucionesService.unidades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((unidades: Unidad[]) => {
                this.unidades = unidades;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    selectedRole(id): void{
        if (this.resolucionForm.get('idTipo_usuario').value == 6 || this.resolucionForm.get('idTipo_usuario').value == 8) {
            this.resolucionForm.patchValue({idUnidad: 1, idDependencia: '', idFacultad: ''});
            this._resolucionesService.getDependenciasByUnidad(1).subscribe((response)=>{
                this.dependencias = response;
                
                this._changeDetectorRef.markForCheck();
            });
        } else if (this.resolucionForm.get('idTipo_usuario').value == 5) {
            this.resolucionForm.patchValue({idUnidad: 1, idDependencia: '', idFacultad: ''});
            this.dependencias = [];
            this._resolucionesService.getDependenciasByUnidad(1).subscribe((response)=>{
                this.facultades = response;
                
                this._changeDetectorRef.markForCheck();
            });
        } else if (this.resolucionForm.get('idTipo_usuario').value == 17) {
            this.resolucionForm.patchValue({idUnidad: 4, idDependencia: '', idFacultad: ''});
            this._resolucionesService.getDependenciasByUnidad(4).subscribe((response)=>{
                this.dependencias = response;
                
                this._changeDetectorRef.markForCheck();
            });
        } else {
            this.resolucionForm.patchValue({idUnidad: '', idDependencia: '', idFacultad: ''});
            this.dependencias = [];
        }
    }

    selectedFacultad(id): void{
        this.resolucionForm.patchValue({idDependencia: '', idFacultad: id});

        this._resolucionesService.getEscuelasByDependencia(id).subscribe((response)=>{
            this.dependencias = response;
            
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
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._resolucionesListComponent.matDrawer.close();
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
console.log(editMode);
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Save the resolucion
     */
    saveResolucion(): void
    {
        if (!this.resolucion.idResolucion) {
            this.createResolucion();
        } else {
            this.updateResolucion();
        }
    }

    /**
     * Create the resolucion
     */
    createResolucion(): void
    {
        // Get the resolucion object
        const resolucion = this.resolucionForm.getRawValue();

        // Create the resolucion on the server
        this._resolucionesService.createResolucion(resolucion).subscribe((newResolucion) => {
            // Toggle the edit mode off
            this.toggleEditMode(false);

            this._router.navigate(['./..'], {relativeTo: this._activatedRoute});
            
            this.alert = {
                type   : 'success',
                message: 'Usuario registrado correctamente',
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
     * Update the resolucion
     */
    updateResolucion(): void
    {
        // Get the resolucion object
        const resolucion = this.resolucionForm.getRawValue();

        // Update the resolucion on the server
        this._resolucionesService.updateResolucion(resolucion.idResolucion, resolucion).subscribe(() => {

            // Toggle the edit mode off
            this.toggleEditMode(false);
        });
    }

    /**
     * Delete the resolucion
     */
    deleteResolucion(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete resolucion',
            message: 'Are you sure you want to delete this resolucion? This action cannot be undone!',
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
                // Get the current resolucion's id
                const id = this.resolucion.idResolucion;

                // Get the next/previous resolucion's id
                const currentResolucionIndex = this.resoluciones.findIndex(item => item.idResolucion === id);
                const nextResolucionIndex = currentResolucionIndex + ((currentResolucionIndex === (this.resoluciones.length - 1)) ? -1 : 1);
                const nextResolucionId = (this.resoluciones.length === 1 && this.resoluciones[0].idResolucion === id) ? null : this.resoluciones[nextResolucionIndex].idResolucion;

                // Delete the resolucion
                this._resolucionesService.deleteResolucion(id)
                    .subscribe((isDeleted) => {

                        // Return if the resolucion wasn't deleted...
                        if ( !isDeleted )
                        {
                            return;
                        }

                        // Navigate to the next resolucion if available
                        if ( nextResolucionId )
                        {
                            this._router.navigate(['../', nextResolucionId], {relativeTo: this._activatedRoute});
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

    /**
     * Upload avatar
     *
     * @param fileList
     */
    uploadAvatar(fileList: FileList): void
    {
        // Return if canceled
        if ( !fileList.length )
        {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];

        // Return if the file is not allowed
        if ( !allowedTypes.includes(file.type) )
        {
            return;
        }

        // Upload the avatar
        // this._resolucionesService.uploadAvatar(this.resolucion.idResolucion, file).subscribe();
    }

    /**
     * Remove the avatar
     */
    removeAvatar(): void
    {
        // Get the form control for 'avatar'
        const avatarFormControl = this.resolucionForm.get('avatar');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

        // Update the resolucion
        this.resolucion.avatar = null;
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