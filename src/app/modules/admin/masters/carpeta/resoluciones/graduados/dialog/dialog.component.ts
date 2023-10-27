import { Component, OnInit, ViewEncapsulation, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cronograma } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.types';
import { ResolucionesService } from 'app/modules/admin/masters/carpeta/resoluciones/graduados/graduados.service';
import { Subject, takeUntil } from 'rxjs';
import { forEach } from 'lodash';

@Component({
    selector     : 'mailbox-compose',
    templateUrl  : './dialog.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ResolucionesGraduadoCronogramasDialogComponent implements OnInit
{
    @ViewChild('selectedResolucionNgForm') selectedResolucionNgForm: NgForm;
    @ViewChild('cronogramasTable', {read: MatSort}) cronogramasTableMatSort: MatSort;
    cronogramasDataSource: MatTableDataSource<any> = new MatTableDataSource();
    cronogramasTableColumns: string[] = ['checkbox', 'unidad', 'dependencia', 'fecha_colacion'];
    composeForm: FormGroup;
    cronogramas: Cronograma[];
    selectedCronogramas = [];
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
        public matDialogRef: MatDialogRef<ResolucionesGraduadoCronogramasDialogComponent>,
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
        
        // Create the selected resolución y cronogramas form
        this.selectedResolucionForm = this._formBuilder.group({
            idResolucion        : [this.data.idResolucion, [Validators.required]],
            cronogramas         : [[]]
        });


        // Get the cronogramas
        this._resolucionesService.cronogramas$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((cronogramas: Cronograma[]) => {
                this.cronogramasDataSource.data = cronogramas;

                if (this.data.cronogramas.length) {
                    this.data.cronogramas.forEach((element) => {
                        const cronograma = cronogramas.find(item => item.idCronograma_carpeta == element.idCronograma_carpeta)
                        this.addCronogramaToForm(cronograma)
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
        this.cronogramasDataSource.sort = this.cronogramasTableMatSort;
    }

    /**
     * Add cronograma to the product
     *
     * @param cronograma
     */
    addCronogramaToForm(cronograma: Cronograma): void
    {
        // Add the cronograma
        this.selectedCronogramas.unshift(cronograma.idCronograma_carpeta);

        // Update the selected product form
        this.selectedResolucionForm.get('cronogramas').patchValue(this.selectedCronogramas);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove tramite from the product
     *
     * @param tramite
     */
    removeCronogramaFromForm(tramite: Cronograma): void
    {
        // Remove the tramite
        this.selectedCronogramas.splice(this.selectedCronogramas.findIndex(item => item === tramite.idCronograma_carpeta), 1);

        // Update the selected product form
        this.selectedResolucionForm.get('cronogramas').patchValue(this.selectedCronogramas);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    toggleCronograma(cronograma: Cronograma, change: MatCheckboxChange): void
    {
        if ( change.checked )
        {
            this.addCronogramaToForm(cronograma);
        }
        else
        {
            this.removeCronogramaFromForm(cronograma);
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
            seleccionados: this.selectedResolucionForm.get('cronogramas').value,
            cronogramas: this.cronogramasDataSource.data
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
