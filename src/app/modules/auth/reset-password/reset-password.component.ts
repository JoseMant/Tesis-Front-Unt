import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, timer, Subject, takeUntil, takeWhile, tap } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseValidators } from '@fuse/validators';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'auth-reset-password',
    templateUrl  : './reset-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthResetPasswordComponent implements OnInit
{
    @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    code : any;
    message : any;
    showAlert: boolean = false;
    resetPasswordForm: FormGroup;
    countdown: number = 3;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        public _router: Router
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
        this.resetPasswordForm = this._formBuilder.group({
                code           : ['', Validators.required],
                password       : ['', Validators.required],
                passwordConfirm: ['', Validators.required]
            },
            {
                validators: FuseValidators.mustMatch('password', 'passwordConfirm')
            }
        );

        // Get the code
        this._authService.code$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: any) => {
                console.log(response);
                // Update the code
                this.resetPasswordForm.patchValue({ code: response});

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    redirect(): void
    {
        this._router.navigate(['sign-in']);
    }

    /**
     * Reset password
     */
    resetPassword(): void
    {
        // Return if the form is invalid
        if ( this.resetPasswordForm.invalid )
        {
            return;
        }

        // Disable the form
        this.resetPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Send the request to the server
        this._authService.resetPassword(this.resetPasswordForm.get('code').value, this.resetPasswordForm.get('password').value)
            .pipe(
                finalize(() => {

                    // Reset the form
                    this.resetPasswordNgForm.resetForm();

                    // Show the alert
                    this.showAlert = true;
                })
            )
            .subscribe(
                (response) => {

                    // Set the alert
                    this.alert = {
                        type   : 'success',
                        message: 'Tu contraseña ha sido restablecida.'
                    };

                    // Redirect after the countdown
                    timer(1000, 1000)
                        .pipe(
                            finalize(() => {
                                this._router.navigate(['sign-in']);
                            }),
                            takeWhile(() => this.countdown > 0),
                            takeUntil(this._unsubscribeAll),
                            tap(() => {
                                this.alert = {
                                    type   : 'success',
                                    message: 'Tu contraseña ha sido restablecida. Redirigiendo en ' + this.countdown
                                };
                                this.countdown--
                            })
                        )
                        .subscribe();
                },
                (response) => {

                    // Re-enable the form
                    this.resetPasswordForm.enable();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Algo salió mal. Por favor, vuelva a intentarlo.'
                    };
                }
            );
    }
}
