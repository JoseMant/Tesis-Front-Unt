import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil,finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ReportePagination, ReporteInterface } from 'app/modules/admin/reportes/reportes.types';
import { ReportesService } from 'app/modules/admin/reportes/reportes.service';
import { CronogramasService } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.service';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { FuseAlertType } from '@fuse/components/alert';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { Unidad } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.types';
import { User } from 'app/core/user/user.types';
import { ActivatedRoute, RouterStateSnapshot, Router, Data } from '@angular/router';
import { Carpeta } from 'app/modules/carpeta/carpeta.types';



@Component({
    selector       : 'reportes-validados-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .reportes-elaboracion_carpeta-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px 112px auto 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 190px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 190px 96px 190px 112px 72px;
                }
            }
            .fondo_snackbar {
                background-color:transparent !important;
                padding: 0px !important;
                height: 0px;
                min-height: 0px !important;
            }
        `
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations
})
export class ReporteCarpetasDiplomasListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    @ViewChild('selectedDiplomaNgForm') selectedDiplomaNgForm: NgForm;
    diplomas$: Observable<ReporteInterface[]>;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };

    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl('');
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    selectedDiplomaForm: FormGroup;
    carpeta: ReporteInterface;
    columns = ['title', 'detail'];
    rows: any;
    

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _reportesService: ReportesService,
        public visordialog: MatDialog,
        private snackBar: MatSnackBar,
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
        
        
    }

    buscarDiploma(){
    
        this._reportesService.getCarpetaByCodigoDiploma(this.searchInputControl.value).subscribe(
                               (response) => {
                                   this.carpeta = response;
                                   this.rows = [
                                       {
                                           id: 1,
                                           title: 'Denominación Diploma',
                                           detail: response.denominacion
                                       },
                                       {
                                           id: 2,
                                           title: 'Código Diploma',
                                           detail: response.codigo_diploma
                                       },
                                        {
                                            id: 3,
                                            title: 'Fecha Emitido',
                                            detail: response.fecha_colacion
                                        },
                                       {
                                           id: 4,
                                           title: 'Abreviatura grado/tÍtulo',
                                           detail: response.diploma_obtenido,
                                       },
                                       {
                                           id: 5,
                                           title: 'Modalidad de Obtención',
                                           detail: response.modalidadSustentancion
                                       },
                                       {
                                           id: 6,
                                           title: 'Registrado en el libro de títulos Nro.',
                                           detail: response.nro_libro
                                       },
                                       {
                                           id: 7,
                                           title: 'Folio',
                                           detail: response.folio
                                       },
                                       {
                                           id: 8,
                                           title: 'Registro de secretaria general Nro.',
                                           detail: response.nro_registro
                                       },
                                       {
                                           id: 9,
                                           title: 'Resolución de otorgamiento',
                                           detail: 'RCU N° '+response.nro_resolucion
                                       },
                                       {
                                           id: 10,
                                           title: 'Resolución de otorgamiento',
                                           detail: 'O-ORIGINAL'
                                       }
                                       
                                   ]
                                   
                                   this.searchInputControl.disable()
           
                                   // Mark for check
                                   this._changeDetectorRef.markForCheck();
                                   
       
                                   // Config the alert
                                   this.alert = {
                                       type   : 'success',
                                       message: "Carpeta encontrada",
                                       title: 'Encontrado'
                                   };
                                   this.openSnack();
                               },
                               (response) => {
                                   this.carpeta = null;
                                   this.rows = [];
                                   
                                   // Config the alert
                                   this.alert = {
                                       type   : 'warn',
                                       message: response.error.message,
                                       title: 'Error'
                                   };
                                   this.openSnack();
                                   
                                   // Mark for check
                                   this._changeDetectorRef.markForCheck();
                               }
                           );
    }
    limpiarDiploma(){
        this.searchInputControl.setValue("")
        this.searchInputControl.enable()
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
