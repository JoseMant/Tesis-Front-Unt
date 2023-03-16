import { Component, OnInit, ViewEncapsulation, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Resolucion } from 'app/modules/admin/masters/carpeta/resoluciones/resoluciones.types';
import { OficiosService } from 'app/modules/admin/masters/carpeta/oficios/oficios.service';
import { Subject, takeUntil } from 'rxjs';
import { forEach } from 'lodash';

@Component({
    selector     : 'mailbox-compose',
    templateUrl  : './dialog.component.html',
    encapsulation: ViewEncapsulation.None
})
export class OficioResolucionesDialogComponent implements OnInit
{
    @ViewChild('selectedOficioNgForm') selectedOficioNgForm: NgForm;
    @ViewChild('resolucionesTable', {read: MatSort}) resolucionesTableMatSort: MatSort;
    resolucionesDataSource: MatTableDataSource<any> = new MatTableDataSource();
    resolucionesTableColumns: string[] = ['checkbox', 'nro_resolucion', 'fecha'];
    composeForm: FormGroup;
    resoluciones: Resolucion[];
    selectedResoluciones = [];
    selectedOficioForm: FormGroup;
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
        public matDialogRef: MatDialogRef<OficioResolucionesDialogComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _oficiosService: OficiosService,
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
        
        // Create the selected resolución y resoluciones form
        this.selectedOficioForm = this._formBuilder.group({
            idOficio        : [this.data.idOficio, [Validators.required]],
            resoluciones         : [[]]
        });


        // Get the resoluciones
        this._oficiosService.resoluciones$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((resoluciones: Resolucion[]) => {
                this.resolucionesDataSource.data = resoluciones;
                if (this.data.resoluciones.length) {
                    this.data.resoluciones.forEach((element) => {
                        console.log(element)
                        const resolucion = resoluciones.find(item => item.idResolucion == element.idResolucion)
                        console.log(resolucion)
                        this.addResolucionToForm(resolucion)
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
        this.resolucionesDataSource.sort = this.resolucionesTableMatSort;
    }

    /**
     * Add cronograma to the product
     *
     * @param cronograma
     */
    addResolucionToForm(resolucion: Resolucion): void
    {
        // Add the resolucion
        this.selectedResoluciones.unshift(resolucion.idResolucion);

        // Update the selected product form
        this.selectedOficioForm.get('resoluciones').patchValue(this.selectedResoluciones);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove tramite from the product
     *
     * @param tramite
     */
    removeResolucionFromForm(tramite: Resolucion): void
    {
        // Remove the tramite
        this.selectedResoluciones.splice(this.selectedResoluciones.findIndex(item => item === tramite.idResolucion), 1);
        // Update the selected product form
        this.selectedOficioForm.get('resoluciones').patchValue(this.selectedResoluciones);
        console.log( this.selectedOficioForm.getRawValue())

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    toggleResolucion(resolucion: Resolucion, change: MatCheckboxChange): void
    {
        if ( change.checked )
        {
            this.addResolucionToForm(resolucion);
        }
        else
        {
            this.removeResolucionFromForm(resolucion);
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
        // this.selectedOficioNgForm.resetForm();

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
            seleccionados: this.selectedOficioForm.get('resoluciones').value,
            resoluciones: this.resolucionesDataSource.data
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
