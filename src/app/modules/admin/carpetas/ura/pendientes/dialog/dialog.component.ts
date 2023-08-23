import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil , finalize} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarpetasService } from 'app/modules/admin/carpetas/carpetas.service';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { FuseAlertType } from '@fuse/components/alert';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
//import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@Component({
    selector: 'grados-pendientes-dialog',
    templateUrl: './dialog.component.html',
    styles: [
        `
            .mat-form-field
            .mat-form-field-appearance-fill
            .mat-form-field-wrapper {
                margin-bottom: 0px !important;
            }
        `
    ]
})
export class CarpetaURAPendienteDialogComponent implements OnInit, OnDestroy {
    //@Input() isEdite: boolean = false;
    //@Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
    historialesDataSource: MatTableDataSource<any> = new MatTableDataSource();
    historialesTableColumns: string[] = ['codigo_diploma_before', 'codigo_diploma_after', 'descripcion','fecha_historial'];
    
    fecha_hoy: Date;
    historial: any;
   
    //data
    
    page: number = 1;
    pdfSource: any;
    historialForm: FormGroup;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<CarpetaURAPendienteDialogComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _carpetasService: CarpetasService,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        private _router: Router
    ) {}

    openSnack(): void {
        this.snackBar.openFromComponent(AlertaComponent, {
            horizontalPosition: 'right',
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['fondo_snackbar'],
            data: this.alert,
        });
    }

    ngOnInit(): void {
        this.historial = this.data.historial;
        this.historialesDataSource.data = this.data.historial;
        
        this.fecha_hoy = new Date(Date.now());
        
        // Create the selected maduritylevel form

        this.historialForm = this._formBuilder.group({

            idTramite: [this.data.idTramite, [Validators.required]],
            codigo_diploma_before: [{value: '',disabled: true}, [Validators.required]],
            codigo_diploma_after: ['', [Validators.required]],
            descripcion: [{value: '',disabled: !this.historial.length}, [Validators.required]],
            fecha_historial: [this.fecha_hoy, [Validators.required]]
            });

        if(this.historial.length>0)
        {
           
            //console.log(this.historial);
            this.historialForm.patchValue({
                codigo_diploma_before: this.historial[this.historial.length-1].codigo_diploma_after
            });
             
        }
        else{
            this.historialForm.patchValue({
                codigo_diploma_before: 'NINGUNO',
                descripcion: 'NUEVO CÓDIGO'
            });
            
        }
    
        
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.complete();
    }

    // toggleChecking(event: any): void {
    //     const value = this.gradoForm.get('apply').value;
    //     this.gradoForm.patchValue({
    //         apply: !value
    //     });
    // }

    //METODO PARA GUARDAR ANULACION AGREGADA
    save(): void {
        const data = this.historialForm.getRawValue();

        // Disable the form
        
        if(data.codigo_diploma_before && data.codigo_diploma_after && data.descripcion)
        {
            if(data.codigo_diploma_before.length<=10 && data.codigo_diploma_after.length<=10)
            {
                this._carpetasService.agregarCodigo(data).subscribe((response) => 
                {
                    
                    this.historial.push(response);
                    this.historialesDataSource.data = this.historial;

                    // Re-enable the form
                    this.historialForm.enable();
                    
                    // Reset the form
                    // this.gradoNgForm.resetForm();
        
                    // Close the dialog
                    this.matDialogRef.close(response.codigo_diploma_after);
                    
                    this.alert = {
                        type   : 'success',
                        message: 'Código de diploma agregado correctamente',
                        title: 'Enviado'
                    };
                    this.openSnack();
                    
                    this._changeDetectorRef.markForCheck();
                    
                },
                (response) => {
               
                    this.alert = {
                        //
                        type   : 'warn',
                        message: response.error.message,
                        title: 'ERROR'
                    };
                    this.openSnack();
                    this._changeDetectorRef.markForCheck();
                });



            }
            else{
                this.alert = {
                    //
                    type   : 'warn',
                    message: 'Código de diploma inválido: Debe ser de 10 caracteres o menor',
                    title: 'Error'
                 };
                this.openSnack();
                this._changeDetectorRef.markForCheck();
            }
           
        }
        else{
            //
            this.alert = {
                type   : 'warn',
                message: 'Ingrese Datos en los campos requeridos',
                title: 'Advertencia'
            };
            this.openSnack();
            this._changeDetectorRef.markForCheck();
   
        }
        

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
