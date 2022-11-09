import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SettingsService } from 'app/modules/admin/settings/settings.service';
import { FuseAlertService, FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';

@Component({
    selector       : 'settings-security',
    templateUrl    : './security.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsSecurityComponent implements OnInit
{
    @ViewChild('securityNgForm') securityNgForm: NgForm;
    securityForm: FormGroup;
    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _settingsService: SettingsService,
        private snackBar: MatSnackBar,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    
    openSnack(): void {
        this.snackBar.openFromComponent(AlertaComponent, {
            horizontalPosition: 'right',
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['fondo_snackbar'],
            data: this.alert,
        });
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.securityForm = this._formBuilder.group({
            currentPassword  : ['', [Validators.required]],
            newPassword      : ['', [Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ])/), Validators.required]],
            repeatNewPassword: ['', [Validators.required]],
        },
        {
            validators: FuseValidators.mustMatch('newPassword', 'repeatNewPassword')
        });
    }

    resetPassword(): void
    {
        // Get the contact object
        const user = this.securityForm.getRawValue();
        if (this.securityForm.invalid) {
            this.securityForm.markAllAsTouched();
            return;
        }
        
        // Disable the form
        this.securityForm.disable();

        this._settingsService.resetPassword(user).subscribe((response) => {

            // Re-enable the form
            this.securityForm.enable();

            // Reset the form
            this.securityNgForm.resetForm();

            this.alert = {
                type   : 'success',
                message: 'Contraseña actualizada correctamente',
                title: 'Guardado'
            };
            this.openSnack();
        },
        (error) => {
            console.log(error);
            this.alert = {
                type   : 'warn',
                message: error.error.message,
                title: 'Error'
            };
            this.openSnack();
        });
    }
}
