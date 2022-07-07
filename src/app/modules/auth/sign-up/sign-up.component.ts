import { Component, OnInit, ChangeDetectorRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('documentNgForm') documentNgForm: NgForm;
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    documentForm: FormGroup;
    signUpForm: FormGroup;
    showAlert: boolean = false;
    foundDocument: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
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
        this.documentForm = this._formBuilder.group({
                nro_documento      : ['', Validators.required]
            }
        );

        this.signUpForm = this._formBuilder.group({
                apellidos       : ['', Validators.required],
                nombres         : ['', Validators.required],
                celular         : ['', Validators.required],
                correo          : ['', Validators.required],
                nro_doc         : ['', Validators.required],
                nro_matricula   : ['', Validators.required],
                sexo            : ['', Validators.required],
                tipo_doc        : ['', Validators.required],
                username        : ['', Validators.required],
                password        : ['', Validators.required],
                idTipoUsuario   : ['1', Validators.required]
            }
        );

        this.signUpForm.disable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void
    {
        // Do nothing if the form is invalid
        if ( this.signUpForm.invalid )
        {
            return;
        }
        
        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value)
            .subscribe(
                (response) => {
                    console.log(response);
                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/confirmation-required');
                },
                (response) => {
                    // Re-enable the form
                    this.signUpForm.enable();
                    
                    // Reset the form
                    // this.signUpNgForm.resetForm();
                    
                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Algo salió mal. Por favor, vuelva a intentarlo.'
                    };
                    
                    // Show the alert
                    this.showAlert = true;
                    console.log(this.showAlert);
                }
            );
    }

    /**
     * Sign up
     */
    info(): void
    {
        // Do nothing if the form is invalid
        if ( this.documentForm.invalid )
        {
            return;
        }
    
        // Disable the form
        // this.documentForm.disable();
    
        // Hide the alert
        this.showAlert = false;
    
        // Sign up
        this._authService.getDocument(this.documentForm.value.nro_documento)
            .subscribe(
                (response) => {
                    this.foundDocument = true;
                    
                    // Fill the form
                    this.signUpForm.patchValue({
                        tipo_doc        : response.datos_alumno.tipo_doc,
                        nro_matricula   : response.datos_alumno.nro_matricula,
                        nombres         : response.datos_alumno.nombres,
                        apellidos       : response.datos_alumno.apellidos,
                        celular         : response.datos_alumno.celular,
                        correo          : response.datos_alumno.correo,
                        sexo            : response.datos_alumno.sexo,
                        nro_doc         : response.datos_alumno.nro_doc,
                        username        : response.datos_alumno.nro_doc,
                    });

                    this.signUpForm.enable();
    
                    // Mark for check
                    this._changeDetectorRef.markForCheck();

                },
                (response) => {
                    this.foundDocument = false;
    
                    // Re-enable the form
                    this.documentForm.enable();
    
                    // Reset the form
                    // this.documentNgForm.resetForm();
    
                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Something went wrong, please try again.'
                    };
    
                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

    changeDocument(): void
    {
        this.foundDocument = false;

        // Reset the form
        this.documentNgForm.resetForm();
        this.signUpNgForm.resetForm();

        // Re-enable the form
        // this.documentForm.enable();
        // this.signUpForm.disable();

    }
}
