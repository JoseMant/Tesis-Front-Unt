/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { fuseAnimations } from '@fuse/animations';
import { TramiteService } from 'app/modules/admin/tramites/tramites.service';
import { TramiteInterface } from 'app/modules/admin/tramites/tramites.types';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';

import moment from 'moment';
import { VisorPdfComponent } from '../visorPdf/visorPdf.component';
import { VisorImagenComponent } from '../visorImagen/visorImagen.component';
import { VisorExoneradoComponent } from '../visorExonerado/visorExonerado.component';
import { User } from 'app/core/user/user.types';

@Component({
    selector       : 'tramite-details',
    templateUrl    : './details.component.html',
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
            .home-grid {
                grid-template-columns: 96px auto 40px;

                @screen sm {
                    grid-template-columns: 96px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 112px auto 112px 190px 72px;
                }

                @screen lg {
                    grid-template-columns: 112px auto 112px 224px 72px;
                }
            }

            .home-details-grid {
                grid-template-columns: 96px auto 40px;

                @screen sm {
                    grid-template-columns: 96px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 112px auto 112px 190px 72px;
                }

                @screen lg {
                    grid-template-columns: 112px auto 112px 224px 72px;
                }
            }

            fuse-alert {
                margin: 16px 0;
            }
            .fondo_snackbar {
                background-color:transparent !important;
                padding: 0px !important;
                height: 0px;
                min-height: 0px !important;
            }
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

    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations
})
export class TramiteDetalleComponent implements OnInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatAccordion) private _accordion: MatAccordion;
    @ViewChild(MatSort) private _sort: MatSort;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    tramite: TramiteInterface | null = null;
    tramites: TramiteInterface[];
    tramiteForm: FormGroup;
    user: any;
    unidades: any;
    tipoTramites: any;
    tipoTramiteUnidades: any;
    requisitos: any;
    requisitosCount: number = 0;
    abrir: boolean = false;
    bancos: any;
    data: TramiteInterface;
    facultades: any;
    escuelas: any;
    selectedGap: boolean;
    maxDate: any;
    motivos: any;
    newVoucher: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _tramiteService: TramiteService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _matDialog: MatDialog,
        public visordialog: MatDialog,
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
        this.selectedGap = true;
        // Create the selected maduritylevel form
        this.tramiteForm = this._formBuilder.group({
            idTramite: [0],
            idTipo_tramite: [0],
            nro_documento: [''],
            // idColacion: [''],
            idEstado_tramite: [0],
            // idModalidad_grado: [0],
            descripcion_estado: [''],
            codigo: [''],
            entidad: ['', Validators.required],
            nro_operacion: ['', Validators.required],
            fecha_operacion: ['', Validators.required],
            archivoPdf: [null],
            voucher: [''],
            idMotivo_certificado: [0],
            comentario: [''],
            solicitante: [''],
            celular: [''],
            correo: [''],
            idPrograma: [''],
            sede: [''],
            nro_matricula: [''],
            tipo_documento: [''],
            idUnidad: [0],
            idTipo_tramite_unidad: [0],
            archivoImagen: [''],
            requisitos: [[]],
            idUsuario: [0],
            des_estado_voucher: [''],
            archivoExonerado: [null],
            nro_resolucion:[''],
            fecha_resolucion:[''],
            motivo:['']
        });

        this._userService.user$
          .pipe((takeUntil(this._unsubscribeAll)))
          .subscribe((user: User) => {

              this.user = user;
              console.log(this.user);

              if(this.user.idTipoUsuario==5){
                    this.tramiteForm.controls['entidad'].clearValidators();
                    this.tramiteForm.controls['nro_operacion'].clearValidators();
                    this.tramiteForm.controls['fecha_operacion'].clearValidators();

                    this.tramiteForm.controls['nro_resolucion'].setValidators(Validators.required);
                    this.tramiteForm.controls['fecha_resolucion'].setValidators(Validators.required);
                    this.tramiteForm.controls['motivo'].setValidators(Validators.required);

                    this.tramiteForm.controls['entidad'].updateValueAndValidity();
                    this.tramiteForm.controls['nro_operacion'].updateValueAndValidity();
                    this.tramiteForm.controls['fecha_operacion'].updateValueAndValidity();
                    this.tramiteForm.controls['nro_resolucion'].updateValueAndValidity();
                    this.tramiteForm.controls['fecha_resolucion'].updateValueAndValidity();
                    this.tramiteForm.controls['motivo'].updateValueAndValidity();
                } 
              
          });

        // Get the tramites
        this._tramiteService.tramites$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tramites: TramiteInterface[]) => {
                this.tramites = tramites;
                console.log(tramites);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the banks
        this._tramiteService.bancos$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((bancos: any) => {
                this.bancos = bancos;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the tramite
        this._tramiteService.tramite$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tramite: TramiteInterface) => {
                console.log(tramite);
                // Get the tramite
                this.tramite = tramite;
                this.requisitos = tramite.requisitos;
                this.requisitosCount=tramite.requisitos.length;
                
                // Patch values to the form
                // this.createFormulario(this.tramite);
                
                this.tramiteForm.patchValue(tramite);
                console.log(this.tramiteForm.getRawValue());

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._tramiteService.unidades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((unidades: any) => {
                this.unidades = unidades;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


        this._tramiteService.tipoTramites$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tipoTramites: any) => {
                this.tipoTramites = tipoTramites;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._tramiteService.motivos$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((motivos: any) => {
                this.motivos = motivos;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this.tramiteForm.valueChanges.subscribe(
            () => {this.newVoucher = true;}
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    selectNewVoucher(event): void {
        this.tramiteForm.patchValue({archivoPdf: event.target.files[0]});
        this.newVoucher = true;
    }

    selectNewExoneracion(event): void {
        this.tramiteForm.patchValue({archivoExonerado: event.target.files[0]});
        this.newVoucher = true;
    }

    selectFirma(event): void {
        const files = event.target.files[0];
        this.tramiteForm.patchValue({archivoImagen: files});
        this.data.archivoImagen = files;
    }

    selectReqDocumento(event, req): void {
        const requisito = this.tramiteForm.getRawValue().requisitos.find(item => item.idRequisito === req.idRequisito);
        requisito['archivoPdf'] = event.target.files[0];
    }

    selectReqImagen(event, req): void {
        const files = event.target.files[0];
        console.log(files);
        console.log(req);
        const requisitos = this.tramiteForm.getRawValue().requisitos;
        for (const requ of requisitos) {
            if (requ.idRequisito === req.idRequisito) {
                requ['archivoImagen'] = files;
            }
        }
        //this.data.requisitos = requisitos;
        this.tramiteForm.patchValue({requisitos: requisitos});
        console.log(requisitos);
    }

    verReqDocumento(req): void {
        console.log(req);
        const respDial = this.visordialog.open(
            VisorPdfComponent,
            {
                data: req,
                disableClose: true,
                minWidth: '50%',
                maxWidth: '60%'
            }
        );
    }

    verReqImagen(req): void {
        console.log(req);
        const respDial = this.visordialog.open(
            VisorImagenComponent,
            {
                data: req,
                disableClose: true,
                width: '60%'
            }
        );
    }

    verImagen(): void {
        console.log(this.data);
        const respDial = this.visordialog.open(
            VisorImagenComponent,
            {
                data: this.data,
                disableClose: true,
                width: '60%'
            }
        );
    }

    verDocumento(): void {
        const respDial = this.visordialog.open(
            VisorPdfComponent,
            {
                data: this.tramiteForm.getRawValue(),
                disableClose: true,
                minWidth: '50%',
                maxWidth: '60%'
            }
        );
    }

    verDocumentoExoneracion(): void {
        const respDial = this.visordialog.open(
            VisorExoneradoComponent,
            {
                data: this.tramiteForm.getRawValue(),
                disableClose: true,
                minWidth: '50%',
                maxWidth: '60%'
            }
        );
    }

    updateTramite(): void{
        // If the confirm button pressed...
        if (this.tramiteForm.invalid) {
            this.tramiteForm.markAllAsTouched();
            return;
        }

        const formData = new FormData();
        formData.append('idTramite', this.tramiteForm.getRawValue().idTramite);
        formData.append('entidad', this.tramiteForm.getRawValue().entidad);
        formData.append('nro_operacion', this.tramiteForm.getRawValue().nro_operacion);
        formData.append('fecha_operacion', (new Date(this.tramiteForm.getRawValue().fecha_operacion)).toISOString().substring(0,10));
        formData.append('archivo_voucher', this.tramiteForm.getRawValue().archivoPdf);
        formData.append('archivo_exonerado', this.tramiteForm.getRawValue().archivoExonerado);
        this.tramiteForm.disable();
    
        this._tramiteService.updateVoucher(this.tramiteForm.getRawValue().idTramite,formData).subscribe((updatedTramite) => {
            console.log(updatedTramite);
    
            // Re-enable the form
            this.tramiteForm.enable();
    
            this.alert = {
                type   : 'success',
                message: 'Voucher actualizado correctamente',
                title: 'Guardado'
            };
            this.openSnack();
            this.newVoucher = false;
    
            // Mark for check
            this._changeDetectorRef.markForCheck();
        },
        (response) => {
    
            // Re-enable the form
            this.tramiteForm.enable();
    
            this.alert = {
                type   : 'warn',
                message: response.error.message,
                title: 'Error'
            };
            this.openSnack();
        });
    }

    updateRequisitos(): void{
        console.log(this.tramite);
        const data={
            idTramite: this.tramiteForm.getRawValue().idTramite,
            requisitos: this.tramiteForm.getRawValue().requisitos,
        };
        //Validar que subí todos los requisitos rechazados
        const requis = this.tramiteForm.getRawValue().requisitos.find(element => element.responsable == this.user.idTipoUsuario && element.des_estado_requisito == 'RECHAZADO' && ((element.archivoPdf === undefined && element.extension === 'pdf') || (element.archivoImagen === undefined && element.extension === 'jpg')));
        if (requis) {
            this.alert = {
                type   : 'warn',
                message: 'Cargar el archivo en el requisito: ' + requis.nombre,
                title: 'Error'
            };
            this.openSnack();
            return;
        }
        const requis2 = this.tramiteForm.getRawValue().requisitos.find(element => element.idRequisito == 33 || element.idRequisito == 35 || element.idRequisito == 37 || element.idRequisito == 39);
        if (requis2 && !this.fileSizeValidator(requis2.archivoImagen)) {
            this.alert = {
                type   : 'warn',
                message: requis2.nombre + ': Cargar archivo entre 4KB y 50KB',
                title: 'Error'
            };
            this.openSnack();
            return;
        }
        const formData = new FormData();
        formData.append('idTramite', data.idTramite);
        if(this.tramiteForm.getRawValue().idTipo_tramite==7||this.tramiteForm.getRawValue().idTipo_tramite==8){
            formData.append('nro_resolucion', this.tramiteForm.getRawValue().nro_resolucion);
            formData.append('fecha_resolucion', (new Date(this.tramiteForm.getRawValue().fecha_resolucion)).toISOString().substring(0,10));
            formData.append('motivo', this.tramiteForm.getRawValue().motivo);
        }
        data.requisitos.forEach((element) => {
            // console.log(element);
            formData.append('requisitos[]', JSON.stringify(element));
            if (element.idRequisito && element.extension === 'pdf') {
                if (element.archivoPdf && element.des_estado_requisito == 'RECHAZADO') {
                    formData.append('files[]', element.archivoPdf);
                } else {
                    formData.append('files[]', new File([""], "vacio.kj"));
                }
            }
            if (element.idRequisito && element.extension === 'jpg') {
                if (!element.requisito && element.des_estado_requisito == 'RECHAZADO') {
                    formData.append('files[]', element.archivoImagen);
                } else {
                    formData.append('files[]', new File([""], "vacio.kj"));
                }
            }
        });
        // console.log(formData.getAll('files[]'));
        
        this.tramiteForm.disable();
        this._tramiteService.updateRequisitos(data.idTramite,formData).subscribe((response) => {
            
            // Re-enable the form
            this.tramiteForm.enable();

            this.alert = {
                type   : 'success',
                message: 'Requisitos actualizados correctamente',
                title: 'Guardado'
            };
            this.openSnack();
            this.newVoucher = false;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        },
        (error) => {
            console.log(error);

            // Re-enable the form
            this.tramiteForm.enable();

            this.alert = {
                type   : 'warn',
                message: 'Error al actualizar requisitos',
                title: 'Error'
            };
            this.openSnack();
        });
    }

    fileSizeValidator(file: any) {
        if (file) {
            const fileSize = file.size;
            const fileSizeInKB = Math.round(fileSize / 1024);
            if (fileSizeInKB >= 4 && fileSizeInKB <= 50) return true;
            else return false;
        } else return false;
    }
}
