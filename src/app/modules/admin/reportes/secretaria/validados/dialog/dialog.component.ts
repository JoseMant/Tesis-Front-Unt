import { Component, OnInit, ViewEncapsulation, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { GradosService } from 'app/modules/admin/grados/grados.service';

@Component({
    selector     : 'mailbox-compose',
    templateUrl  : './dialog.component.html',
    encapsulation: ViewEncapsulation.None
})
export class GradoSecretariaValidadoDialogComponent implements OnInit
{
    @ViewChild('composeNgForm') composeNgForm: NgForm;
    composeForm: FormGroup;
    copyFields: { cc: boolean; bcc: boolean } = {
        cc : false,
        bcc: false
    };
    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{align: []}, {list: 'ordered'}, {list: 'bullet'}]
        ]
    };
    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    
    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<GradoSecretariaValidadoDialogComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _gradoService: GradosService,
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
        this.composeForm = this._formBuilder.group({
            idTramite: [this.data.idTramite, [Validators.required]],
            to     : [this.data.correo, [Validators.required, Validators.email]],
            cc     : ['', [Validators.email]],
            bcc    : ['', [Validators.email]],
            subject: ['NOTIFICACIÓN DE OBSERVACIÓN DEL TRÁMITE N° ' + this.data.codigo, [Validators.required]],
            body   : ['', [Validators.required]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show the copy field with the given field name
     *
     * @param name
     */
    showCopyField(name: string): void
    {
        // Return if the name is not one of the available names
        if ( name !== 'cc' && name !== 'bcc' )
        {
            return;
        }

        // Show the field
        this.copyFields[name] = true;
    }

    /**
     * Save and close
     */
    saveAndClose(): void
    {
        // Save the message as a draft
        this.saveAsDraft();

        // Close the dialog
        this.matDialogRef.close();
    }

    /**
     * Discard the message
     */
    discard(): void
    {
        // Reset the form
        this.composeNgForm.resetForm();

        // Close the dialog
        this.matDialogRef.close();

    }

    /**
     * Save the message as a draft
     */
    saveAsDraft(): void
    {

    }

    /**
     * Send the message
     */
    send(): void
    {
        const data = this.composeForm.getRawValue();

        // Disable the form
        this.composeForm.disable();

        this._gradoService.sendNotification(data.idTramite, data).subscribe((updatedGrado) => {
            console.log(updatedGrado)
            // Re-enable the form
            this.composeForm.enable();
            
            // Reset the form
            this.composeNgForm.resetForm();

            // Close the dialog
            this.matDialogRef.close();
            
            this.alert = {
                type   : 'success',
                message: 'Notificación enviada correctamente',
                title: 'Enviado'
            };
            this.openSnack();
            
            // Mark for check
            this._changeDetectorRef.markForCheck();
        },
        (response) => {
            // Re-enable the form
            this.composeForm.enable();

            this.alert = {
                type   : 'warn',
                message: response.error.message,
                title: 'Error'
            };
            this.openSnack();
        });
    }
}
