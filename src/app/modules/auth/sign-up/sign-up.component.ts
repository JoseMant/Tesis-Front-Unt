import { Component, OnInit, ChangeDetectorRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import moment from 'moment';

@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    styles         : [
        /* language=SCSS */
        `
            .spinner {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 40px;
                width: 56px;
            }
            .spinner > div {
                width: 12px;
                height: 12px;
                background-color: #1E96F7;
                border-radius: 100%;
                display: inline-block;
                -webkit-animation: fuse-bouncedelay 1s infinite ease-in-out both;
                animation: fuse-bouncedelay 1s infinite ease-in-out both;
            }
            .spinner .bounce1 {
                -webkit-animation-delay: -0.32s;
                animation-delay: -0.32s;
            }
            .spinner .bounce2 {
                -webkit-animation-delay: -0.16s;
                animation-delay: -0.16s;
            }
            @-webkit-keyframes fuse-bouncedelay {
                0%, 80%, 100% {
                    -webkit-transform: scale(0)
                }
                40% {
                    -webkit-transform: scale(1.0)
                }
            }

            @keyframes fuse-bouncedelay {
                0%, 80%, 100% {
                    -webkit-transform: scale(0);
                    transform: scale(0);
                }
                40% {
                    -webkit-transform: scale(1.0);
                    transform: scale(1.0);
                }
            }
        `
    ]
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
    listGeneros = [
        {id: 1, name: 'MASCULINO', value: 'M'},
        {id: 2, name: 'FEMENINO', value: 'F'}
    ];
    listTipoDocumentos = [
        {id: 1, name: 'DOCUMENTO NACIONAL DE IDENTIDAD (DNI)'},
        {id: 2, name: 'PASAPORTE'},
        {id: 3, name: 'CARNÉ DE EXTRANJERÍA'},
        {id: 4, name: 'CÉDULA DE IDENTIDAD'},
        {id: 5, name: 'DOCUMENTO EXTRANJERO - OTROS'},
        {id: 6, name: 'PERMISO TEMPORAL DE PERMANENCIA'},
        {id: 7, name: 'CARNÉ DE IDENTIDAD'}
    ]
    maxDate: any;

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


    limiteFecha(): void {
        const now = moment();
        this.maxDate = now;
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.limiteFecha();

        // Create the form
        this.documentForm = this._formBuilder.group({
                nro_documento      : ['', Validators.required]
            }
        );

        this.signUpForm = this._formBuilder.group({
                apellidos       : [{value: '', disabled: true}, Validators.required],
                nombres         : [{value: '', disabled: true}, Validators.required],
                celular         : ['', [Validators.maxLength(9),Validators.pattern(/^[0-9]+$/), Validators.required]],
                correo          : ['', Validators.required],
                direccion       : ['', Validators.required],
                nro_documento   : [{value: '', disabled: true}, Validators.required],
                sexo            : ['', Validators.required],
                tipo_documento  : ['', Validators.required],
                username        : [{value: '', disabled: true}, Validators.required],
                password        : ['', [Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ])/), Validators.required]],
                idTipo_usuario  : ['4', Validators.required],
                fecha_nacimiento: ['', Validators.required]
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
        
        this.signUpForm.patchValue({fecha_nacimiento: new Date(this.signUpForm.get('fecha_nacimiento').value).toISOString().substring(0,10)});

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
                        message: response.error.message
                    };

                    // Show the alert
                    this.showAlert = true;
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
        this.documentForm.disable();
        // Sign up
        this._authService.getDocument(this.documentForm.value.nro_documento)
            .subscribe(
                (response) => {
                    this.foundDocument = true;

                    // Fill the form
                    this.signUpForm.patchValue({
                        tipo_documento  : response.datos_alumno.tipo_documento,
                        nro_matricula   : response.datos_alumno.nro_matricula,
                        nombres         : response.datos_alumno.nombres,
                        apellidos       : response.datos_alumno.apellidos,
                        celular         : response.datos_alumno.celular,
                        correo          : response.datos_alumno.correo,
                        direccion       : response.datos_alumno.direccion,
                        sexo            : response.datos_alumno.sexo,
                        nro_documento   : response.datos_alumno.nro_documento,
                        username        : response.datos_alumno.nro_documento,
                        fecha_nacimiento: response.datos_alumno.fecha_nacimiento,
                    });

                    this.signUpForm.enable();
                    this.documentForm.enable();

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
                        message: response.error.message
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
        // this.documentNgForm.resetForm();
        // this.signUpNgForm.resetForm();

        // Re-enable the form
        // this.documentForm.enable();
        // this.signUpForm.disable();

    }
}
