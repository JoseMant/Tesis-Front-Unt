/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatDrawer } from '@angular/material/sidenav';
import { merge, Observable,fromEvent, Subject } from 'rxjs';
import { debounceTime, map, filter, switchMap, takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { fuseAnimations } from '@fuse/animations';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { VoucherInterface, VoucherPagination } from '../../vouchers.types';
import { VoucherPendienteService } from '../vouchersPendientes.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector       : 'vouchers-list',
    templateUrl    : './list.component.html',
    styles         : [
        /* language=SCSS */
        `
            fuse-alert {
                margin: 16px 0;
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

export class VouchersPendientesListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    vouchersPendientes$: Observable<VoucherInterface[]>;
    columnsDef: Array<any> = [];
    vouchersPendientesCount: number = 0;
    vouchersPendientes: Array<any> = [];
    dataSource: any;
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: VoucherPagination;

    searchInputControl: FormControl = new FormControl();
    // selectedVulnerability: any | null = null;
    // selectedVulnerabilityForm: FormGroup;

    tagsEditMode: boolean = false;
    drawerMode: 'side' | 'over';
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _voucherPendienteService: VoucherPendienteService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        @Inject(DOCUMENT) private _document: any,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _matDialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

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
        this.vouchersPendientes$ = this._voucherPendienteService.vouchersPendientes$;
        this.llenarFilas();
        this.llenarColumnas();
    }

    llenarColumnas(): void {
        this.columnsDef = [
            {
                id: 0,
                name: 'nro_tramite',
                displayedName: 'NRO TRAMITE',
                type: 'string',
            },
            {
                id: 1,
                name: 'alumno',
                displayedName: 'ALUMNO',
                type: 'string',
            },
            {
                id: 2,
                name: 'nro_documento',
                displayedName: 'DNI',
                type: 'string',
            },
            {
                id: 3,
                name: 'nro_matricula',
                displayedName: 'NRO MATRICULA',
                type: 'string',
            },
            {
                id: 4,
                name: 'unidad',
                displayedName: 'UNIDAD',
                type: 'string',
            },
            {
                id: 5,
                name: 'descripcion',
                displayedName: 'TRAMITE',
                type: 'string',
            },
            {
                id: 3,
                name: 'exonerado',
                displayedName: 'EXONERADO PAGO CARP',
                type: 'string',
            },
            {
                id: 4,
                name: 'entidad',
                displayedName: 'ENTIDAD BANCARIA',
                type: 'string',
            },
            {
                id: 5,
                name: 'nro_operacion',
                displayedName: 'NRO OPERACION',
                type: 'string',
            },
            {
                id: 5,
                name: 'fecha_operacion',
                displayedName: 'FECHA OPERACION',
                type: 'datetime',
            },
            {
                id: 6,
                name: 'opcion',
                displayedName: 'OPCIONES',
                type: 'acciones',
            },
        ];
    }

    llenarFilas(): void{
        // const vouchersPendientes = [
        //     {
        //       nro_tramite: '123456',
        //       alumno: 'PEREZ SANCHEZ JOSE WILLIAM',
        //       nro_documento: '72477124',
        //       nro_matricula: '1523300417',
        //       unidad: 'PREGRADO',
        //       descripcion: 'CERTIFICADO DE ESTUDIOS 5 AÑOS',
        //       exonerado: 'SI',
        //       entidad: 'BANCO INTERBANK',
        //       nro_operacion: '5968754',
        //       fecha_operacion: '2022/07/31'
        //     },
        //     {
        //       nro_tramite: '123400',
        //       alumno: 'MANTILLA SANCHEZ JOSE WILLIAM PEPE LUCASASDA',
        //       nro_documento: '72477124',
        //       nro_matricula: '1523300417',
        //       unidad: 'PREGRADO',
        //       descripcion: 'CERTIFICADO DE ESTUDIOS 5 AÑOS',
        //       exonerado: 'NO',
        //       entidad: 'BANCO INTERBANK',
        //       nro_operacion: '5968754',
        //       fecha_operacion: '2022/08/28'
        //     },
        //     {
        //       nro_tramite: '123456',
        //       alumno: 'PEREZ SANCHEZ JOSE WILLIAM',
        //       nro_documento: '72477124',
        //       nro_matricula: '1523300417',
        //       unidad: 'PREGRADO',
        //       descripcion: 'CERTIFICADO DE ESTUDIOS 5 AÑOS',
        //       exonerado: 'SI',
        //       entidad: 'BANCO INTERBANK',
        //       nro_operacion: '5968754',
        //       fecha_operacion: '2022/07/31'
        //     },
        //     {
        //       nro_tramite: '123400',
        //       alumno: 'MANTILLA SANCHEZ JOSE WILLIAM',
        //       nro_documento: '72477124',
        //       nro_matricula: '1523300417',
        //       unidad: 'PREGRADO',
        //       descripcion: 'CERTIFICADO DE ESTUDIOS 5 AÑOS',
        //       exonerado: 'NO',
        //       entidad: 'BANCO INTERBANK',
        //       nro_operacion: '5968754',
        //       fecha_operacion: '2022/08/28'
        //     },
        //     {
        //       nro_tramite: '123456',
        //       alumno: 'PEREZ SANCHEZ JOSE WILLIAM POPO',
        //       nro_documento: '72477124',
        //       nro_matricula: '1523300417',
        //       unidad: 'PREGRADO',
        //       descripcion: 'CERTIFICADO DE ESTUDIOS 5 AÑOS',
        //       exonerado: 'SI',
        //       entidad: 'BANCO INTERBANK',
        //       nro_operacion: '5968754',
        //       fecha_operacion: '2022/07/31'
        //     },
        //     {
        //       nro_tramite: '123400',
        //       alumno: 'MANTILLA SANCHEZ JOSE WILLIAM',
        //       nro_documento: '72477124',
        //       nro_matricula: '1523300417',
        //       unidad: 'PREGRADO',
        //       descripcion: 'CERTIFICADO DE ESTUDIOS 5 AÑOS',
        //       exonerado: 'NO',
        //       entidad: 'BANCO INTERBANK',
        //       nro_operacion: '5968754',
        //       fecha_operacion: '2022/08/28'
        //     },
        //     {
        //       nro_tramite: '123456',
        //       alumno: 'PEREZ SANCHEZ JOSE WILLIAM POPO',
        //       nro_documento: '72477124',
        //       nro_matricula: '1523300417',
        //       unidad: 'PREGRADO',
        //       descripcion: 'CERTIFICADO DE ESTUDIOS 5 AÑOS',
        //       exonerado: 'SI',
        //       entidad: 'BANCO INTERBANK',
        //       nro_operacion: '5968754',
        //       fecha_operacion: '2022/07/31',
        //       idVoucher: 2,
        //       idEntidad: 1,
        //       archivo: 'aqui va el voucher en File o ruta',
        //       des_estado_voucher: 'PENDIENTE',
        //       idUsuario_aprobador: 1,
        //       validado: 1,
        //       estado: 1
        //     },
        // ];
        this._voucherPendienteService.vouchersPendientes$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((vouchersPendientes: VoucherInterface[]) => {
                console.log(vouchersPendientes);
                this.vouchersPendientes = vouchersPendientes;
                // Update the counts
                this.vouchersPendientesCount = vouchersPendientes.length;
                this.dataSource = new MatTableDataSource(
                    this.vouchersPendientes
                );

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        // this.vouchersPendientes = vouchersPendientes;
        // this.dataSource = new MatTableDataSource(
        //     this.vouchersPendientes
        // );
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
        //this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * On backdrop clicked
     */
    onBackdropClicked(): void
    {
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
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
