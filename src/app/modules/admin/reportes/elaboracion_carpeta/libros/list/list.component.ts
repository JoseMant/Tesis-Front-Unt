import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { ReportesService } from 'app/modules/admin/reportes/reportes.service';
import { MatDialog } from '@angular/material/dialog';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Unidad } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.types';
import { environment } from 'environments/environment';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector       : 'reporte-libros-list',
    templateUrl    : './list.component.html',
    styles         : [],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations
})
export class ReporteCarpetasLibrosListComponent implements OnInit, AfterViewInit, OnDestroy
{
    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };

    isLoading: boolean = false;
    unidades: Unidad;
    tipoTramiteUnidades: any;
    nro_libros: number[];
    selectedReporteForm: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _reportesService: ReportesService,
        private _authService: AuthService,
        public visordialog: MatDialog,
        private snackBar: MatSnackBar
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

        // Create the selected reporte form
        this.selectedReporteForm = this._formBuilder.group({
            idUnidad                : ['', Validators.required],
            idTipo_tramite_unidad   : ['', Validators.required],
            nro_libro               : [0]
        });

        // Get the unidades
        this._reportesService.unidades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((unidades: any) => {
                this.unidades = unidades;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    openSnack(): void {
        this.snackBar.openFromComponent(AlertaComponent, {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: ['fondo_snackbar'],
            data: this.alert,
        });
    }

    

    changedUnidad(idUnidad: number) : void {
        this.selectedReporteForm.patchValue({
            idTipo_tramite_unidad   : '',
            nro_libro               : 0
        });
        
        this._reportesService.getTipoTramiteUnidades(idUnidad).subscribe((resp)=>{
            this.tipoTramiteUnidades = resp.tipo_tramite_unidad;
            
            this._changeDetectorRef.markForCheck();
        });

    }

    changedTipoTramiteUnidad(idTipo_tramite_unidad: number) : void {
        this.selectedReporteForm.patchValue({
            nro_libro: 0,
        });

        this._reportesService.getLibrosByTipoTramite(idTipo_tramite_unidad).subscribe((response)=>{
            this.nro_libros = response;
            
            this._changeDetectorRef.markForCheck();
        });

    }

    verLibroPdf() : void
    {
        if (this.selectedReporteForm.get('idTipo_tramite_unidad').value){
            const link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.setAttribute('href', environment.baseUrl + 'libro?' +
            '&idTipo_tramite_unidad=' + this.selectedReporteForm.get('idTipo_tramite_unidad').value +
            '&nro_libro=' + this.selectedReporteForm.get('nro_libro').value + 
            '&accessToken='+ this._authService.accessToken);
            document.body.appendChild(link);
            link.click();
            link.remove();
        }else{
            this.alert = {
                type   : 'warning',
                message: 'Seleccione tipo de tramite',
                title: 'Advertencia'
                };
                this.openSnack();
        }
        
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
