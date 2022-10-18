import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/core/user/user.service';
import { SettingsService } from 'app/modules/admin/settings/settings.service';
import { takeUntil } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import { Role } from 'app/modules/admin/masters/access/users/users.types';
import { Subject } from 'rxjs';
import { FuseAlertService, FuseAlertType } from '@fuse/components/alert';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';

@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
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
export class SettingsAccountComponent implements OnInit
{
    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    accountForm: FormGroup;
    user: User;
    roles: Role[];
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
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _settingsService: SettingsService,
        private _changeDetectorRef: ChangeDetectorRef,
        private snackBar: MatSnackBar
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
        // Create the form
        this.accountForm = this._formBuilder.group({
            nombres     : ['', Validators.required],
            apellidos   : ['', Validators.required],
            username    : ['', Validators.required],
            correo      : ['', [Validators.required, Validators.email]],
            celular     : [''],
            sexo        : [''],
            rol         : ['', Validators.required],
            tipo_documento  : ['', Validators.required],
            nro_documento   : ['', Validators.required]
        });

        // Subscribe to the user service
        this._userService.user$
        .pipe((takeUntil(this._unsubscribeAll)))
        .subscribe((user: User) => {
            switch (user.tipo_documento) {
                case '1':
                    user.tipo_documento = 'DOCUMENTO NACIONAL DE IDENTIDAD';
                    break;
                    
                case '3':
                    user.tipo_documento = 'CARNET DE EXTRANGERÍA';
                    break;
            }
            this.user = user;

            // Patch values to the form
            this.accountForm.patchValue(user);
            
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    openSnack(): void {
        this.snackBar.openFromComponent(AlertaComponent, {
            horizontalPosition: 'right',
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['fondo_snackbar'],
            data: this.alert,
        });
    }

    updatePerfil(): void
    {
         // Get the contact object
         const user = this.accountForm.getRawValue();
         console.log(user);
         this._settingsService.updateUser(user).subscribe(() => {
             // Toggle the edit mode off
             //this.toggleEditMode(false);

             this.alert = {
                 type   : 'success',
                 message: 'Perfil actualizado correctamente',
                 title: 'Guardado'
             };

             this.openSnack();
         });
    }
}
