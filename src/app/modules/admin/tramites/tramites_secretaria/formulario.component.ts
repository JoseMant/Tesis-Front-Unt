/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatCheckboxChange } from '@angular/material/checkbox';
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
    selector       : 'tramites-oficio',
    templateUrl    : './formulario.component.html',
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
        `
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations
})
export class TramiteOficioListComponent implements OnInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatAccordion) private _accordion: MatAccordion;
    @ViewChild(MatSort) private _sort: MatSort;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    tramite: any | null = null;
    tramiteForm: FormGroup;
    user: any;
    unidades: any;
    tipoTramites: any;
    tipoTramiteUnidades: any;
    requisitos: any;
    requisitosCount: number = 0;
    abrir: boolean = false;
    exoneracion: boolean = false;
    bancos: any;
    data: TramiteInterface;
    dependencias: any;
    subdependencias: any;
    maxDate: any;
    costo: number;
    costo_exonerado: number;
    motivos: any;
    cronogramas: any;
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
        
        // Create the selected maduritylevel form
        this.tramiteForm = this._formBuilder.group({
            apellidos: [''],
            nombres: [''],
            tipo_documento: [''],
            nro_documento: [''],
            celular: [''],
            correo: [''],
            sexoNombre: [''],
            idDependencia: [0],
            idSubdependencia: [0],
            comentario: [''],
            idTipo_tramite: [0,[Validators.required]],
            idUnidad: [-1,[Validators.required]],
            idTipo_tramite_unidad: [-1,[Validators.required]],
            documento: [''],
            requisitos: [[]],
            archivoPdf: [''],
            nro_resolucion: [''],
            fecha_resolucion: [''],

        });

        this._tramiteService.bancos$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((bancos: any) => {
                this.bancos = bancos;

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
            
        // Subscribe to user changes
        this._userService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: any) => {
            this.user = user;
            
            if (this.user.sexo === 'M') {
                this.user['sexoNombre'] = 'MASCULINO';
            }
            if (this.user.sexo === 'F') {
                this.user['sexoNombre'] = 'FEMENINO';
            }

            this.createFormulario(this.user);

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.complete();
    }

    fileSizeValidator(file: any) {
        if (file) {
            // var path = file.replace(/^.*[\\\/]/, "");
            const fileSize = file.size;
            const fileSizeInKB = Math.round(fileSize / 1024);
            console.log(fileSizeInKB);
            if (fileSizeInKB >= 4 && fileSizeInKB <= 300) return true;
            else return false;
        } else return false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create formulario
     */
    createFormulario(data): void
    {
        //Create the formulario
        const newTramite = {
            nro_documento: data.nro_documento,
            apellidos: data.apellidos.toUpperCase(),
            nombres: data.nombres.toUpperCase(),
            documento: data.documento,
            celular: data.celular,
            correo: data.correo,
            nro_matricula: data.nro_matricula,
            sede: data.sede,
            tipo_documento: data.tipo_documento,
            sexoNombre: data.sexoNombre,
            
            idModalidad_grado: 0,
            idDependencia: 0,
            idSubdependencia: 0,
            idTipo_tramite: 0,
            idColacion: 1,
            idEstado_tramite: 0,
            descripcion_estado: '',
            comentario: '',
            nro_tramite: '',
            entidad: '',
            nro_operacion: '',
            fecha_operacion: '',
            idMotivo_certificado: 0,
            archivoPdf: '',
            archivoExonerad: '',
            idUnidad: -1,
            idTipo_tramite_unidad: -1,
            archivo_firma: '',
            archivoImagen: '',
            requisitos: '',
            comentario_tramite: '',
            exonerado: false
        };
        this.tramiteForm.patchValue(newTramite);
        this.data = newTramite;
    }

    selectedTipoTramite(id: number): void {
        this.tramiteForm.patchValue({idTipo_tramite: id,idTipo_tramite_unidad: 0});
        this.data.idTipo_tramite = id;
        this.data.idTipo_tramite_unidad = 0;
        console.log(id)
        if(this.data.idUnidad) {
            this._tramiteService.getTipoTramiteUnidades(this.data.idTipo_tramite, this.data.idUnidad).subscribe((resp)=>{
                this.tipoTramiteUnidades = resp.tipo_tramite_unidad;
                this._changeDetectorRef.markForCheck();
            });
        }
    }

    selectedUnidad(id): void{
        this.tramiteForm.patchValue({
            idUnidad: id,
            idDependencia: 0,
            idSubdependencia: 0,
            idTipo_tramite_unidad: 0, 
            archivo: '', 
            sede: '', 
            nro_matricula: ''
        });
        this.data.idUnidad = id;
        this.data.idDependencia = 0;
        this.data.idSubdependencia = 0;
        this.data.idTipo_tramite_unidad = 0;
        this.data.archivoPdf = null;
        
        this._tramiteService.getTipoTramiteUnidades(this.data.idTipo_tramite, this.data.idUnidad).subscribe((resp)=>{
            this.tipoTramiteUnidades = resp.tipo_tramite_unidad;
            this._changeDetectorRef.markForCheck();
        });
        
        this._changeDetectorRef.markForCheck();
    }

    selectedFacultad(id): void{
        //falta probar si funciona ya q solo hay una sola facultad
        this.data.idDependencia = id;
        let first = this.dependencias.find(item => item.idDependencia === this.data.idDependencia);
        // console.log(first);
        if (first) {
            const subdependencia = first.subdependencias[0];
            if (subdependencia) {
                this.data.idSubdependencia = subdependencia.idPrograma;
                this.data.nro_matricula = subdependencia.nro_matricula;
                this.data.sede = subdependencia.sede;
                this.tramiteForm.patchValue({
                    idSubdependencia: subdependencia.idPrograma, 
                    nro_matricula: subdependencia.nro_matricula, 
                    sede: subdependencia.sede
                });
            }
            this.subdependencias = first.subdependencias;
        }
    }

    selectedEscuela(id): void {
        console.log(this.subdependencias);
        const programa = this.subdependencias.find(programa => programa.idPrograma == id);
        this.data.idSubdependencia = id;
        this.data.nro_matricula = programa.nro_matricula;
        this.data.sede = programa.sede;
        this.tramiteForm.patchValue({
            idSubdependencia: id, 
            nro_matricula: programa.nro_matricula, 
            sede: programa.sede
        });
            
        this._changeDetectorRef.markForCheck();
    }

    selectedTipoTramiteUnidades(id): void{
        if (id==15) {
            this.exoneracion=true;
        } else {
            this.exoneracion=false;
        }
        const tipo = this.tipoTramiteUnidades.find(element => element.idTipo_tramite_unidad === id);
        this.costo = tipo.costo;
        this.costo_exonerado = tipo.costo_exonerado;
        this.tramiteForm.patchValue({ idTipo_tramite_unidad: id});
        this.data.idTipo_tramite_unidad = id;
        
        this._tramiteService.getCronogramasByTipoTramiteUnidad(id, this.data.idDependencia).subscribe((response)=>{
            this.cronogramas = response;
            
            this._changeDetectorRef.markForCheck();
        });

        this._tramiteService.getRequisitos(id).subscribe((resp)=>{
          this.requisitos = resp.requisitos;
          this.requisitosCount = resp.requisitos.length;
          this.data.requisitos = resp.requisitos;
          this.tramiteForm.patchValue({requisitos: resp.requisitos});
          this._changeDetectorRef.markForCheck();
        });
    }

    selectVoucher(event): void {
        this.tramiteForm.patchValue({archivoPdf: event.target.files[0]});
        this.data.archivoPdf = event.target.files[0];
        // console.log( this.tramiteForm.getRawValue())
    }

    selectResolucion(event): void {
        this.tramiteForm.patchValue({archivoExonerado: event.target.files[0]});
        this.data.archivoExonerado = event.target.files[0];

    }

    selectFirma(event): void {
        this.tramiteForm.patchValue({archivoImagen: event.target.files[0]});
        this.data.archivoImagen = event.target.files[0];
    }

    selectReqDocumento(event, req): void {
        const requisito = this.tramiteForm.getRawValue().requisitos.find((item) => item.idRequisito === req.idRequisito);
        requisito['archivoPdf'] = event.target.files[0];
    }

    selectReqImagen(event, req): void {
        const requisito = this.tramiteForm.getRawValue().requisitos.find((item) => item.idRequisito === req.idRequisito);
        requisito['archivoImagen'] = event.target.files[0];
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
        console.log(this.data);
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
        // console.log(this.data);
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
                data: this.data,
                disableClose: true,
                minWidth: '50%',
                maxWidth: '60%'
            }
        );
    }

    verDocumentoExonerado(): void {
        const respDial = this.visordialog.open(
            VisorExoneradoComponent,
            {
                data: this.data,
                disableClose: true,
                minWidth: '50%',
                maxWidth: '60%'
            }
        );
    }



    createTramite(): void{
        // If the confirm button pressed...
        if (this.tramiteForm.invalid) {
            this.tramiteForm.markAllAsTouched();
            return;
        }
        console.log(this.data.requisitos);
        const requis = this.data.requisitos.find(element => element.responsable == this.user.idTipoUsuario && ((element.archivoPdf === undefined && element.extension === 'pdf')));
        if (requis) {
            this.alert = {
                type   : 'warn',
                message: 'Cargar el archivo en el requisito: ' + requis.nombre,
                title: 'Error'
            };
            this.openSnack();
            return;
        }
        // const requis2 = this.data.requisitos.find(element => element.idRequisito == 73);
        // if (requis2 && !this.fileSizeValidator(requis2.archivoImagen)) {
        //     this.alert = {
        //         type   : 'warn',
        //         message: requis2.nombre + ': Cargar archivo entre 4KB y 50KB',
        //         title: 'Error'
        //     };
        //     this.openSnack();
        //     return;
        // }

        if (this.tramiteForm.getRawValue().idTipo_tramite_unidad==42 || this.tramiteForm.getRawValue().idTipo_tramite_unidad==43) {
            if (!this.tramiteForm.getRawValue().nro_resolucion) {
                this.alert = {
                    type   : 'warn',
                    message: 'Ingrese el número de resolucion',
                    title: 'Error'
                };
                this.openSnack();
                return; 
            }
            if (!this.tramiteForm.getRawValue().fecha_resolucion) {
                this.alert = {
                    type   : 'warn',
                    message: 'Ingrese la fecha de resolución',
                    title: 'Error'
                };
                this.openSnack();
                return; 
            }
           
        }
        const formData = new FormData();
        // formData.append('archivo', this.tramiteForm.getRawValue().archivoPdf);
        formData.append('idTipo_tramite_unidad', this.tramiteForm.getRawValue().idTipo_tramite_unidad);
        formData.append('idUnidad', this.tramiteForm.getRawValue().idUnidad);
        formData.append('idDependencia', this.tramiteForm.getRawValue().idDependencia);
        formData.append('idPrograma', this.tramiteForm.getRawValue().idSubdependencia);
        formData.append('comentario', this.tramiteForm.getRawValue().comentario);
        this.tramiteForm.getRawValue().requisitos.forEach((element) => {
            formData.append('requisitos[]', JSON.stringify(element));
            if (element.idRequisito && element.extension === 'pdf') {
                if (element.archivoPdf) {
                    formData.append('files[]', element.archivoPdf);
                } else {
                    formData.append('files[]', new File([""], "vacio.kj"));
                }
            } else if (element.idRequisito && element.extension === 'jpg') {
                if (element.archivoImagen) {
                    formData.append('files[]', element.archivoImagen);
                } else {
                    formData.append('files[]', new File([""], "vacio.kj"));
                }
            }
        });
        
        // Disable the form
        this.tramiteForm.disable();
        
        this._tramiteService.createTramiteSecretaria(formData).subscribe((newTramite) => {
            
            // Re-enable the form
            this.tramiteForm.enable();

            // Go to new product
            this.createFormulario(this.user);

            this.alert = {
                type   : 'success',
                message: 'Trámite registrado correctamente',
                title: 'Guardado'
            };
            this.openSnack();

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
}
