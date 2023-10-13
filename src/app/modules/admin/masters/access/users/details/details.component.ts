import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { User, Role, Unidad, Tipo_documento } from 'app/modules/admin/masters/access/users/users.types';
import { UsersListComponent } from 'app/modules/admin/masters/access/users/list/list.component';
import { UsersService } from 'app/modules/admin/masters/access/users/users.service';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector       : 'users-details',
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
export class UsersDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    editMode: boolean = false;
    user: User;
    userForm: FormGroup;
    users: User[];
    roles: Role[];
    unidades: Unidad[];
    dependencias: any;
    facultades: any;
    tipos_documentos: Tipo_documento[];
    generos = [
        {id: 'M', name: 'MASCULINO' },
        {id: 'F', name: 'FEMENINO'}
    ];
    searchEscuelaControl: FormControl = new FormControl('');
    filteredProgramas: any[];
    dependencia_usuario: any;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _usersListComponent: UsersListComponent,
        private _usersService: UsersService,
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

    getDependenciaUsuario(id, tipo_usuario): void{

        if(tipo_usuario==5){
            this.facultades.forEach(function (item) {
                if(item.idDependencia==id){
                    this.dependencia_usuario = item.nombre;
                }
            });
        }
        
        
        if(tipo_usuario==6 || tipo_usuario==8 || tipo_usuario==17){
            this.dependencias.forEach(function (item) {
                if(item.idDependencia==id){
                    this.dependencia_usuario = item.nombre;
                }
            });
        }
        
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Open the drawer
        this._usersListComponent.matDrawer.open();

        // Create the user form
        this.userForm = this._formBuilder.group({
            idUsuario          : [null],
            idTipo_usuario    : [null, [Validators.required]],
            username       : ['', [Validators.required]],
            nombres        : ['', [Validators.required]],
            apellido_paterno   : ['', [Validators.required]],
            apellido_materno  : [''],
            apellidos : [''],
            tipo_documento     : [null, [Validators.required]],
            nro_documento     : ['', [Validators.required]],
            correo        : ['', [Validators.required]],
            correo2        : [''],
            celular        : [''],
            sexo        : ['', [Validators.required]],
            estado        : [null, [Validators.required]],
            avatar      : [null],

            idUnidad: [''],
            idDependencia: [''],
            idFacultad: [''],

            programas: [[]]
        });

        // Get the users
        this._usersService.users$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((users: User[]) => {
                this.users = users;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the user
        this._usersService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {

                // Open the drawer in case it is closed
                this._usersListComponent.matDrawer.open();

                // Get the user
                this.user = user;
                this.user.background = "assets/images/cards/"+ "14" +"-640x480.jpg";

                // Patch values to the form
                this.userForm.patchValue(user);
                if (this.userForm.get('idTipo_usuario').value == 6 || this.userForm.get('idTipo_usuario').value == 8) {
                    this.userForm.patchValue({idUnidad: 1});
                    this._usersService.getDependenciasByUnidad(1).subscribe((response)=>{
                        this.dependencias = response;
                        
                        this._changeDetectorRef.markForCheck();
                    });
                } else if (this.userForm.get('idTipo_usuario').value == 5) {
                    this.userForm.patchValue({idUnidad: 1});
                    this.dependencias = [];
                    this._usersService.getDependenciasByUnidad(1).subscribe((response)=>{
                        this.facultades = response;
                        
                        this._changeDetectorRef.markForCheck();
                    });
                    this._usersService.getEscuelasByDependencia(user.idFacultad).subscribe((response)=>{
                        this.dependencias = response;
                        this.filteredProgramas = response;
                        
                        this._changeDetectorRef.markForCheck();
                    });
                    // console.log(this.userForm.getRawValue().idDependencia)
                } else if (this.userForm.get('idTipo_usuario').value == 17) {
                    this.userForm.patchValue({idUnidad: 4});
                    this._usersService.getDependenciasByUnidad(4).subscribe((response)=>{
                        this.dependencias = response;
                        
                        this._changeDetectorRef.markForCheck();
                    });
                } else {
                    this.userForm.patchValue({idUnidad: ''});
                    this.dependencias = [];
                }

                // Toggle the edit mode off
                if(!user.idUsuario){
                    this.toggleEditMode(true);
                }else{
                    this.toggleEditMode(false);
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the country telephone codes
        this._usersService.roles$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((roles: Role[]) => {
                this.roles = roles;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._usersService.unidades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((unidades: Unidad[]) => {
                this.unidades = unidades;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._usersService.tipos_documentos$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tipos_documentos: Tipo_documento[]) => {
                this.tipos_documentos = tipos_documentos;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    selectedRole(id): void{
        if (this.userForm.get('idTipo_usuario').value == 6 || this.userForm.get('idTipo_usuario').value == 8) {
            this.userForm.patchValue({idUnidad: 1, idDependencia: '', idFacultad: ''});
            this._usersService.getDependenciasByUnidad(1).subscribe((response)=>{
                this.dependencias = response;
                
                this._changeDetectorRef.markForCheck();
            });
        } else if (this.userForm.get('idTipo_usuario').value == 5) {
            this.userForm.patchValue({idUnidad: 1, idDependencia: '', idFacultad: ''});
            this.dependencias = [];
            this._usersService.getDependenciasByUnidad(1).subscribe((response)=>{
                this.facultades = response;
                
                this._changeDetectorRef.markForCheck();
            });
        } else if (this.userForm.get('idTipo_usuario').value == 17) {
            this.userForm.patchValue({idUnidad: 4, idDependencia: '', idFacultad: ''});
            this._usersService.getDependenciasByUnidad(4).subscribe((response)=>{
                this.dependencias = response;
                
                this._changeDetectorRef.markForCheck();
            });
        } else {
            this.userForm.patchValue({idUnidad: '', idDependencia: '', idFacultad: ''});
            this.dependencias = [];
        }
    }

    selectedFacultad(id): void{
        this.userForm.patchValue({idDependencia: '', idFacultad: id});

        this._usersService.getEscuelasByDependencia(id)
            .subscribe((response)=>{
                // Update the programas
                this.dependencias = response;
                this.filteredProgramas = response;
                // console.log(response);
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

    /**
     * Toggle programa
     *
     * @param programa
     * @param change
     */
    togglePrograma(programa: any, change: MatCheckboxChange): void
    {
        if ( change.checked )
        {
            this.addProgramaToUsuario(programa);
        }
        else
        {
            this.removeProgramaFromUsuario(programa);
        }
    }

    /**
     * Add programa to the product
     *
     * @param programa
     */
    addProgramaToUsuario(programa: any): void
    {
        // Add the programa
        this.user.programas.unshift(programa.idPrograma);

        // Update the selected product form
        this.userForm.get('programas').patchValue(this.user.programas);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove programa from the product
     *
     * @param programa
     */
    removeProgramaFromUsuario(programa: any): void
    {
        // Remove the programa
        this.user.programas.splice(this.user.programas.findIndex(item => item === programa.idPrograma), 1);

        // Update the selected product form
        this.userForm.get('programas').patchValue(this.user.programas);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._usersListComponent.matDrawer.close();
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
     * Save the user
     */
    saveUser(): void
    {
        if (!this.user.idUsuario) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    /**
     * Create the user
     */
    createUser(): void
    {
        // Get the user object
        this.userForm.patchValue({
            apellidos: this.userForm.get('apellido_paterno').value+' '+this.userForm.get('apellido_materno').value
        });

        console.log(this.userForm.get('apellidos').value);

        const user = this.userForm.getRawValue();

        // Create the user on the server

        this._usersService.createUser(user).subscribe((newUser) => {
            // Toggle the edit mode off
            this.toggleEditMode(false);
            
            this._router.navigate(['./..'], {relativeTo: this._activatedRoute});
            
            this.alert = {
                type   : 'success',
                message: 'Usuario registrado correctamente',
                title: 'Guardado'
            };
            this.openSnack();
                    
            this._changeDetectorRef.markForCheck();
        },
        (response) => {
            this.alert = {
                type   : 'warn',
                message: response.error.message,
                title: 'Error'
            };
            this.openSnack();
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Update the user
     */
    updateUser(): void
    {
        // Get the user object
        const user = this.userForm.getRawValue();
        console.log(user);
        //return;
        // Update the user on the server
        this._usersService.updateUser(user.idUsuario, user).subscribe(() => {

            // Toggle the edit mode off
            this.toggleEditMode(false);
        });
    }

    /**
     * Delete the user
     */
    deleteUser(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete user',
            message: 'Are you sure you want to delete this user? This action cannot be undone!',
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
                // Get the current user's id
                const id = this.user.idUsuario;

                // Get the next/previous user's id
                const currentUserIndex = this.users.findIndex(item => item.idUsuario === id);
                const nextUserIndex = currentUserIndex + ((currentUserIndex === (this.users.length - 1)) ? -1 : 1);
                const nextUserId = (this.users.length === 1 && this.users[0].idUsuario === id) ? null : this.users[nextUserIndex].idUsuario;

                // Delete the user
                this._usersService.deleteUser(id)
                    .subscribe((isDeleted) => {

                        // Return if the user wasn't deleted...
                        if ( !isDeleted )
                        {
                            return;
                        }

                        // Navigate to the next user if available
                        if ( nextUserId )
                        {
                            this._router.navigate(['../', nextUserId], {relativeTo: this._activatedRoute});
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
        // this._usersService.uploadAvatar(this.user.idUsuario, file).subscribe();
    }

    /**
     * Remove the avatar
     */
    removeAvatar(): void
    {
        // Get the form control for 'avatar'
        const avatarFormControl = this.userForm.get('avatar');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

        // Update the user
        this.user.avatar = null;
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
