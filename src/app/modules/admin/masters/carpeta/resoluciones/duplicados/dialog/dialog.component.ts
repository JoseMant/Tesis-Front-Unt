import { Component, OnInit, ViewEncapsulation, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TramiteInterface } from 'app/modules/admin/tramites/tramites.types';
import { ResolucionesService } from 'app/modules/admin/masters/carpeta/resoluciones/duplicados/duplicados.service';
import { Subject, takeUntil } from 'rxjs';
import { forEach } from 'lodash';

@Component({
    selector     : 'mailbox-compose',
    templateUrl  : './dialog.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ResolucionDuplicadoTramitesDialogComponent implements OnInit
{
    @ViewChild('selectedResolucionNgForm') selectedResolucionNgForm: NgForm;
    @ViewChild('TramiteInterfaceTable', {read: MatSort}) TramiteInterfaceTableMatSort: MatSort;
    tramitesDataSource: MatTableDataSource<any> = new MatTableDataSource();
    tramitesTableColumns: string[] = ['checkbox', 'solicitante','tipo_tramite_unidad','programa', 'dependencia'];
    composeForm: FormGroup;
    tramites: TramiteInterface[];
    selectedTramites = [];
    selectedResolucionForm: FormGroup;
    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    
    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<ResolucionDuplicadoTramitesDialogComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _resolucionesService: ResolucionesService,
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
        
        // Create the selected resolución y TramiteInterface form
        this.selectedResolucionForm = this._formBuilder.group({
            idResolucion        : [this.data.idResolucion, [Validators.required]],
            tramites         : [[]]
        });


        // Get the TramiteInterface
        this._resolucionesService.tramites$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tramites: TramiteInterface[]) => {
                this.tramitesDataSource.data = tramites;

                if (this.data.tramites.length) {
                    this.data.tramites.forEach((element) => {
                        const tramite = tramites.find(item => item.idTramite == element.idTramite)
                        this.addTramiteToForm(tramite)
                    });
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        // Make the data source sortable
        this.tramitesDataSource.sort = this.TramiteInterfaceTableMatSort;
    }

    /**
     * Add tramite to the product
     *
     * @param tramite
     */
    addTramiteToForm(tramite: TramiteInterface): void
    {
        // Add the tramite
        this.selectedTramites.unshift(tramite.idTramite);

        // Update the selected product form
        this.selectedResolucionForm.get('tramites').patchValue(this.selectedTramites);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove tramite from the product
     *
     * @param tramite
     */
    removeTramiteFromForm(tramite: TramiteInterface): void
    {
        // Remove the tramite
        this.selectedTramites.splice(this.selectedTramites.findIndex(item => item === tramite.idTramite), 1);

        // Update the selected product form
        this.selectedResolucionForm.get('tramites').patchValue(this.selectedTramites);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    toggleTramite(tramite: TramiteInterface, change: MatCheckboxChange): void
    {
        // debugger;
        if ( change.checked )
        {
            this.addTramiteToForm(tramite);
        }
        else
        {
            this.removeTramiteFromForm(tramite);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
        // this.selectedResolucionNgForm.resetForm();

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
        // Close the dialog
        this.matDialogRef.close({
            seleccionados: this.selectedResolucionForm.get('tramites').value,
            tramites: this.tramitesDataSource.data
        });
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
