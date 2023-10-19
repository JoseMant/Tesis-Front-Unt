import { Component, OnInit, ViewEncapsulation, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { TramiteService } from 'app/modules/admin/tramites/tramites.service';

@Component({
    selector     : 'mailbox-compose',
    templateUrl  : './dialog.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TramiteAnuladoDialogComponent implements OnInit
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
        public matDialogRef: MatDialogRef<TramiteAnuladoDialogComponent>,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private _tramiteService: TramiteService,
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
            subject: ['NOTIFICACIÓN DE ANULACIÓN DEL TRÁMITE N° ' + this.data.nro_tramite, [Validators.required]],
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
     * Send the message and Delete the selected tramite
     */
    send(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Anular trámite',
            message: '¿Estás seguro de que quieres anular este trámite? ¡Esta acción no se puede deshacer!',
            actions: {
                confirm: {
                    label: 'Anular'
                },
                cancel: {
                    label: 'Cancelar'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            
            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {
                const data = this.composeForm.getRawValue();
        
                // Disable the form
                this.composeForm.disable();
        
                this._tramiteService.sendNotification(data.idTramite, data).subscribe((updateTramite) => {
                    
                    // Re-enable the form
                    this.composeForm.enable();
                    
                    // Reset the form
                    this.composeNgForm.resetForm();
        
                    // Close the dialog
                    this.matDialogRef.close();
                    
                    this.alert = {
                        type   : 'success',
                        message: 'Trámite anulado y notificación enviada correctamente',
                        title: 'Anulado'
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
        });
    }
}
