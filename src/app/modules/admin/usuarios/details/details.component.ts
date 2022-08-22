import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Usuario } from 'app/modules/admin/usuarios/usuarios.types';
import { UsuariosListComponent } from 'app/modules/admin/usuarios/list/list.component';
import { UsuariosService } from 'app/modules/admin/usuarios/usuarios.service';

@Component({
    selector       : 'usuarios-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuariosDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    editMode: boolean = false;
    tagsEditMode: boolean = false;
    usuario: Usuario;
    usuarioForm: FormGroup;
    usuarios: Usuario[];
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _usuariosListComponent: UsuariosListComponent,
        private _usuariosService: UsuariosService,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _renderer2: Renderer2,
        private _router: Router,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef
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
        // Open the drawer
        this._usuariosListComponent.matDrawer.open();

        // Create the usuario form
        this.usuarioForm = this._formBuilder.group({
            apellidos       : ['', Validators.required],
            nombres         : ['', Validators.required],
            celular         : ['', Validators.required],
            correo          : ['', Validators.required],
            nro_documento   : ['', Validators.required],
            nro_matricula   : ['', Validators.required],
            sexo            : ['', Validators.required],
            tipo_documento  : ['', Validators.required],
            username        : ['', Validators.required],
            password        : ['', Validators.required],
            idTipo_usuario  : ['', Validators.required]
        });

        // Get the usuarios
        this._usuariosService.usuarios$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((usuarios: Usuario[]) => {
                console.log(usuarios);
                this.usuarios = usuarios;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the usuario
        this._usuariosService.usuario$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((usuario: Usuario) => {

                // Open the drawer in case it is closed
                this._usuariosListComponent.matDrawer.open();

                // Get the usuario
                this.usuario = usuario;
                this.usuario.background = "assets/images/cards/"+ "14" +"-640x480.jpg";
                // this.user['avatar'] = null;

                // Patch values to the form
                this.usuarioForm.patchValue(usuario);


                // Toggle the edit mode off
                if(!usuario.idUsuario){
                    this.toggleEditMode(true);
                }else{
                    this.toggleEditMode(false);
                }

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

        // Dispose the overlays if they are still on the DOM
        if ( this._tagsPanelOverlayRef )
        {
            this._tagsPanelOverlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._usuariosListComponent.matDrawer.close();
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
     * Update the usuario
     */
    updateUsuario(): void
    {
        // Get the usuario object
        const usuario = this.usuarioForm.getRawValue();

        // Go through the usuario object and clear empty values
        usuario.emails = usuario.emails.filter(email => email.email);

        usuario.phoneNumbers = usuario.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

        // Update the usuario on the server
        this._usuariosService.updateUsuario(usuario.id, usuario).subscribe(() => {

            // Toggle the edit mode off
            this.toggleEditMode(false);
        });
    }

    /**
     * Delete the usuario
     */
    deleteUsuario(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete usuario',
            message: 'Are you sure you want to delete this usuario? This action cannot be undone!',
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
                // Get the current usuario's id
                const id = this.usuario.idUsuario;

                // Get the next/previous usuario's id
                const currentUsuarioIndex = this.usuarios.findIndex(item => item.idUsuario === id);
                const nextUsuarioIndex = currentUsuarioIndex + ((currentUsuarioIndex === (this.usuarios.length - 1)) ? -1 : 1);
                const nextUsuarioId = (this.usuarios.length === 1 && this.usuarios[0].idUsuario === id) ? null : this.usuarios[nextUsuarioIndex].idUsuario;

                // Delete the usuario
                this._usuariosService.deleteUsuario(id)
                    .subscribe((isDeleted) => {

                        // Return if the usuario wasn't deleted...
                        if ( !isDeleted )
                        {
                            return;
                        }

                        // Navigate to the next usuario if available
                        if ( nextUsuarioId )
                        {
                            this._router.navigate(['../', nextUsuarioId], {relativeTo: this._activatedRoute});
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
        this._usuariosService.uploadAvatar(this.usuario.idUsuario, file).subscribe();
    }

    /**
     * Remove the avatar
     */
    removeAvatar(): void
    {
        // Get the form control for 'avatar'
        const avatarFormControl = this.usuarioForm.get('avatar');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

        // Update the usuario
        this.usuario.avatar = null;
    }

    /**
     * Toggle the tags edit mode
     */
    toggleTagsEditMode(): void
    {
        this.tagsEditMode = !this.tagsEditMode;
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
