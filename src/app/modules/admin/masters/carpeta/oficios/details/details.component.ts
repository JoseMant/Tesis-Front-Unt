import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Oficio, Role, Unidad,Resolucion } from 'app/modules/admin/masters/carpeta/oficios/oficios.types';
import { OficiosListComponent } from 'app/modules/admin/masters/carpeta/oficios/list/list.component';
import { OficiosService } from 'app/modules/admin/masters/carpeta/oficios/oficios.service';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { VisorPdfComponent } from 'app/shared/visorPdf/visorPdf.component';
@Component({
    selector       : 'oficios-details',
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
export class OficiosDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    editMode: boolean = false;
    oficio: Oficio;
    oficioForm: FormGroup;
    oficios: Oficio[];
    roles: Role[];
    unidades: Unidad[];
    dependencias: any;
    facultades: any;
    resoluciones: Resolucion[];
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
        private _oficiosListComponent: OficiosListComponent,
        private _oficiosService: OficiosService,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router,
        private _matDialog: MatDialog,
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
        this._oficiosListComponent.matDrawer.open();

        // Create the oficio form
        this.oficioForm = this._formBuilder.group({
            idOficio          : [null],
            nro_oficio    : [null, [Validators.required]],
            fecha    : [null, [Validators.required]],
            archivo       : [''],
            archivoPdf        : [''],
            estado        : [null, [Validators.required]],
            avatar      : [null]
        });

        // Get the oficios
        this._oficiosService.oficios$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((oficios: Oficio[]) => {
                this.oficios = oficios;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the oficio
        this._oficiosService.oficio$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((oficio: Oficio) => {

                // Open the drawer in case it is closed
                this._oficiosListComponent.matDrawer.open();

                // Get the oficio
                this.oficio = oficio;
                this.oficio.background = "assets/images/cards/"+ "14" +"-640x480.jpg";

                // Patch values to the form
                this.oficioForm.patchValue(oficio);

                // Toggle the edit mode off
                if(!oficio.idOficio){
                    this.toggleEditMode(true);
                }else{
                    this.toggleEditMode(false);
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the country telephone codes
        this._oficiosService.roles$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((roles: Role[]) => {
                this.roles = roles;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._oficiosService.unidades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((unidades: Unidad[]) => {
                this.unidades = unidades;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the resoluciones
        this._oficiosService.resoluciones$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((resoluciones: Resolucion[]) => {
            console.log(resoluciones);
            // Update the users
            this.resoluciones = resoluciones;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    selectOficio(event): void {
        this.oficioForm.patchValue({archivoPdf: event.target.files[0]});
    }

    verDocumento(): void {
        const respDial = this._matDialog.open(
            VisorPdfComponent,
            {
                data: this.oficioForm.getRawValue(),
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

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._oficiosListComponent.matDrawer.close();
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
     * Save the oficio
     */
    saveOficio(): void
    {
        this.oficioForm.patchValue({
            fecha: (new Date(this.oficioForm.getRawValue().fecha)).toISOString().substring(0,10)
        });
        if (!this.oficio.idOficio) {
            this.createOficio();
        } else {
            this.updateOficio();
        }
    }

    /**
     * Create the oficio
     */
    createOficio(): void
    {
        // Get the oficio object
        const formData = new FormData();
        formData.append('nro_oficio', this.oficioForm.get('nro_oficio').value);
        formData.append('fecha', (new Date(this.oficioForm.get('fecha').value)).toISOString().substring(0,10));
        formData.append('archivoPdf', this.oficioForm.get('archivoPdf').value);
        

        // Create the oficio on the server
        this._oficiosService.createOficio(formData).subscribe((newOficio) => {
            // Toggle the edit mode off
            this.toggleEditMode(false);

            this._router.navigate(['./..'], {relativeTo: this._activatedRoute});
            
            this.alert = {
                type   : 'success',
                message: 'Resolución registrada correctamente',
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
     * Update the oficio
     */
    updateOficio(): void
    {
        // Get the oficio object
        const oficio = this.oficioForm.getRawValue();

        // Update the oficio on the server
        this._oficiosService.updateOficio(oficio.idOficio, oficio).subscribe(() => {

            // Toggle the edit mode off
            this.toggleEditMode(false);
        });
    }

    /**
     * Delete the oficio
     */
    deleteOficio(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete oficio',
            message: 'Are you sure you want to delete this oficio? This action cannot be undone!',
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
                // Get the current oficio's id
                const id = this.oficio.idOficio;

                // Get the next/previous oficio's id
                const currentOficioIndex = this.oficios.findIndex(item => item.idOficio === id);
                const nextOficioIndex = currentOficioIndex + ((currentOficioIndex === (this.oficios.length - 1)) ? -1 : 1);
                const nextOficioId = (this.oficios.length === 1 && this.oficios[0].idOficio === id) ? null : this.oficios[nextOficioIndex].idOficio;

                // Delete the oficio
                this._oficiosService.deleteOficio(id)
                    .subscribe((isDeleted) => {

                        // Return if the oficio wasn't deleted...
                        if ( !isDeleted )
                        {
                            return;
                        }

                        // Navigate to the next oficio if available
                        if ( nextOficioId )
                        {
                            this._router.navigate(['../', nextOficioId], {relativeTo: this._activatedRoute});
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
        // this._oficiosService.uploadAvatar(this.oficio.idOficio, file).subscribe();
    }

    /**
     * Remove the avatar
     */
    removeAvatar(): void
    {
        // Get the form control for 'avatar'
        const avatarFormControl = this.oficioForm.get('avatar');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

        // Update the oficio
        this.oficio.avatar = null;
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
