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
import { CertificadoService } from 'app/modules/admin/tramites/tramites.service';
import { CertificadoInterface } from 'app/modules/admin/tramites/tramites.types';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import moment from 'moment';
import { VisorPdfComponent } from '../visorPdf/visorPdf.component';
import { VisorImagenComponent } from '../visorImagen/visorImagen.component';

@Component({
    selector       : 'certificado-formulario',
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
export class CertificadoListComponent implements OnInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatAccordion) private _accordion: MatAccordion;
    @ViewChild(MatSort) private _sort: MatSort;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };
    certificado: any | null = null;
    certificadoForm: FormGroup;
    user: any;
    unidades: any;
    tipoTramites: any;
    tipoTramiteUnidades: any;
    requisitos: any;
    abrir: boolean = false;
    bancos: any;
    data: CertificadoInterface;
    facultades: any;
    escuelas: any;
    selectedGap: boolean;
    maxDate: any;
    costo: any;
    motivos: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _certificadoService: CertificadoService,
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
        this.certificadoForm = this._formBuilder.group({
            idTipo_tramite: [''],
            nro_documento: [''],
            idColacion: [''],
            idEstado_tramite: [''],
            idModalidad_grado: [''],
            descripcion_estado: [''],
            codigo: [''],
            entidad: ['', Validators.required],
            nro_operacion: ['', [Validators.maxLength(6), Validators.pattern(/^[0-9]+$/),Validators.required]],
            fecha_operacion: ['', Validators.required],
            archivo: [''],
            idMotivo_certificado: [''],
            solicitud_certificado: [''],
            apellidos: [''],
            nombres: [''],
            documento: [''],
            celular: [''],
            correo: [''],
            idFacultad: [''],
            idEscuela: [''],
            sede: [''],
            nro_matricula: [''],
            tipo_documento: [''],
            sexoNombre: [''],
            idUnidad: [''],
            idTipo_tramite_unidad: [''],
            archivo_firma: ['']
        });

        this._certificadoService.bancos$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((bancos: any) => {
                this.bancos = bancos;
                console.log(bancos);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


        this._certificadoService.unidades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((unidades: any) => {
                this.unidades = unidades;
                console.log(unidades);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


        this._certificadoService.tipoTramites$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tipoTramites: any) => {
                this.tipoTramites = tipoTramites;
                console.log(tipoTramites);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._certificadoService.motivos$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((motivos: any) => {
                this.motivos = motivos;
                console.log(motivos);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to user changes
        this._userService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: any) => {
            //debugger;
            this.user = user;
            console.log(user);
            if (this.user.tipo_documento === '1') {
                this.user['documento'] = 'DNI';
            }
            if (this.user.tipo_documento === '2') {
                this.user['documento'] = 'PASAPORTE';
            }
            if (this.user.tipo_documento === '3') {
                this.user['documento'] = 'CARNET DE EXTRANJERIA';
            }
            if (this.user.sexo === 'M') {
                this.user['sexoNombre'] = 'MASCULINO';
            }
            if (this.user.sexo === 'F') {
                this.user['sexoNombre'] = 'FEMENINO';
            }
            this.certificadoForm.patchValue(user);
            this.createFormulario(this.user);
            this.selectedGap = false;
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create formulario
     */
    createFormulario(data): void
    {
        //Create the formulario
        const newCertificado = {
            idModalidad_grado: 0,
            idFacultad: 0,
            idEscuela: 0,
            idTipo_tramite: 0,
            nro_documento: this.user.nro_documento,
            idColacion: 1,
            idEstado_tramite: 0,
            descripcion_estado: '',
            solicitud_certificado: '',
            codigo: '',
            entidad: 'BANCOS',
            nro_operacion: '',
            fecha_operacion: '',
            idMotivo_certificado: 0,
            archivo: '',
            apellidos: data.apellidos.toUpperCase(),
            nombres: data.nombres.toUpperCase(),
            documento: data.documento,
            celular: data.celular,
            correo: data.correo,
            nro_matricula: data.nro_matricula,
            sede: data.sede,
            tipo_documento: data.tipo_documento,
            sexoNombre: data.sexoNombre,
            idUnidad: -1,
            idTipo_tramite_unidad: -1,
            archivo_firma: ''
        };
        this.certificadoForm.patchValue(newCertificado);
        this.data = newCertificado;
    }

    selectedTipoTramite(id: number): void {
        console.log(id);
        if (id === 1) {
            this.certificadoForm.patchValue({idTipo_tramite: id,idUnidad: 0});
            this.data.idTipo_tramite = id;
            this.data.idUnidad = 0;
        }
        if (id === 2) {
            this.certificadoForm.patchValue({idTipo_tramite: id});
            this.data.idTipo_tramite = id;
        }
    }

    selectedUnidad(id): void{
        console.log(id);
        this.certificadoForm.patchValue({idUnidad: id, idTipo_tramite_unidad: 0, archivo: ''});
        this.data.idUnidad = id;
        this.data.idTipo_tramite_unidad = 0;
        this.data.archivo = '';
        this._certificadoService.getTipoTramiteUnidades(this.data.idTipo_tramite, this.data.idUnidad).subscribe((resp)=>{
            this.requisitos = resp.requisitos;
            this.tipoTramiteUnidades = resp.tipos_unida_tratmites;
            console.log(resp);
            this._changeDetectorRef.markForCheck();
        });

        this._certificadoService.getFacultadesEscuelas(this.data.idUnidad).subscribe((resp)=>{
            if (resp) {
                console.log(resp);
                this.facultades = resp.facultad;
                const idU = this.facultades[0].idDependencia;
                console.log(idU);
                this.data.idFacultad = idU;
                const idE = idU.escuela[0].idEscuela;
                console.log(idE);
                this.data.idEscuela = idE;
                console.log(this.facultades);
                this.certificadoForm.patchValue({idFacultad: idU, idEscuela: idE});
                let first = this.facultades.find(first => first.idDependencia === this.data.idFacultad);
                if (first) {
                    this.escuelas = first.escuela;
                    console.log(this.escuelas);
                }
                // this.escuelas = resp.facultad.escuela;

            }else{
                // this.data.facultad = '';
                // this.data.escuela = '';
                this.data.codigo = '';
                this.data.sede = '';
                this.certificadoForm.patchValue({facultad: '', escuela: '',codigo: '', sede: ''});
                this._changeDetectorRef.markForCheck();
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    selectedFacultad(id): void{
        console.log(id);
    }

    selectedTipoTramiteUnidades(id): void{
        console.log(id);
        const tipo = this.tipoTramiteUnidades.find(element => element.idTipo_tramite_unidad === id);
        console.log(tipo);
        this.costo = tipo.costo;
        this.certificadoForm.patchValue({ idTipo_tramite_unidad: id});
        this.data.idTipo_tramite_unidad = id;
    }

    selectFiles(event): void {
        const files = event.target.files[0];
        console.log(files);
        this.certificadoForm.patchValue({archivo: files});
        this.data.archivo = files;
    }

    selectFirma(event): void {
        const files = event.target.files[0];
        console.log(files);
        this.certificadoForm.patchValue({archivo_firma: files});
        this.data.archivo_firma = files;
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
        console.log(this.data);
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

    createCertificado(): void{
        // If the confirm button pressed...
        if (this.certificadoForm.invalid) {
            this.certificadoForm.markAllAsTouched();
            console.log('hola');
            return;
        }
        this.certificadoForm.patchValue({idEstado_tramite: 1});
        console.log(this.certificadoForm.getRawValue());
        const certificado = {
            idTipo_tramite: this.certificadoForm.getRawValue().idTipo_tramite,
            nro_documento: this.certificadoForm.getRawValue().nro_documento,
            idColacion: this.certificadoForm.getRawValue().idColacion,
            idEstado_tramite: this.certificadoForm.getRawValue().idEstado_tramite,
            idModalidad_grado: this.certificadoForm.getRawValue().idModalidad_grado,
            descripcion_estado: this.certificadoForm.getRawValue().descripcion_estado,
            codigo: this.certificadoForm.getRawValue().codigo,
            entidad: this.certificadoForm.getRawValue().entidad,
            nro_operacion: this.certificadoForm.getRawValue().nro_operacion,
            fecha_operacion: this.certificadoForm.getRawValue().fecha_operacion,
            archivo: this.certificadoForm.getRawValue().archivo,
            solicitud_certificado: this.certificadoForm.getRawValue().solicitud_certificado
        };
        const cadena = (new Date(certificado.fecha_operacion)).toISOString();
        console.log(cadena);
        const cadena1 = cadena.substring(0,10);
        const cadena2 = cadena.substring(11,19);
        const fecha = cadena1 + ' ' + cadena2;
        certificado.fecha_operacion = fecha;
        console.log(certificado);
            const formData = new FormData();
            formData.append('idTipo_tramite', certificado.idTipo_tramite);
            formData.append('nro_documento', certificado.nro_documento);
            formData.append('idColacion', certificado.idColacion);
            formData.append('idEstado_tramite', certificado.idEstado_tramite);
            formData.append('idModalidad_grado', certificado.idModalidad_grado);
            formData.append('descripcion_estado', certificado.descripcion_estado);
            formData.append('codigo', certificado.codigo);
            formData.append('entidad', certificado.entidad);
            formData.append('nro_operacion', certificado.nro_operacion);
            formData.append('fecha_operacion', certificado.fecha_operacion);
            formData.append('archivo', certificado.archivo);
            formData.append('solicitud_certificado', certificado.solicitud_certificado);
            console.log(formData.getAll('archivo'));
            this._certificadoService.createCertificado(formData).subscribe((newMadurity) => {
                console.log(newMadurity);
                // Toggle the edit mode off
                //this.toggleEditMode(false);

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
            (error) => {
                // console.log(error);
                this.alert = {
                    type   : 'warn',
                    message: 'Error al registrar',
                    title: 'Error'
                };
                this.openSnack();
            });
    }
}


