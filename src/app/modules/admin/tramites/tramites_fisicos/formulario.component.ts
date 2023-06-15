/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { TramiteService } from 'app/modules/admin/tramites/tramites.service';
import { TramiteInterface } from 'app/modules/admin/tramites/tramites.types';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';

@Component({
    selector       : 'tramites-fisicos',
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
export class TramiteFisicoListComponent implements OnInit, OnDestroy
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


    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the selected maduritylevel form
        this.tramiteForm = this._formBuilder.group({
            idTipo_tramite: [0],
            nro_documento: ['',[Validators.required]],
            idColacion: [1],
            idEstado_tramite: [0],
            idModalidad_grado: [0],
            descripcion_estado: [''],
            codigo: [''],
            idMotivo_certificado: [0],
            idCronograma_carpeta: [''],
            comentario: [''],
            apellidos: ['',[Validators.required]],
            nombres: ['',[Validators.required]],
            documento: [''],
            celular: [''],
            correo: ['',[Validators.required]],
            idDependencia: [0,[Validators.required]],
            idSubdependencia: [0,[Validators.required]],
            sede: ['',[Validators.required]],
            nro_matricula: ['',[Validators.required]],
            tipo_documento: [''],
            sexoNombre: [''],
            idUnidad: [-1,[Validators.required]],
            idTipo_tramite_unidad: [-1,[Validators.required]],
        });


        this._tramiteService.unidades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((unidades: any) => {
                this.unidades = unidades;
                console.log(unidades);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


        this._tramiteService.tipoTramites$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tipoTramites: any) => {
                this.tipoTramites = tipoTramites;
                console.log(tipoTramites);

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
            nro_matricula: '',
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
      this.tramiteForm.patchValue({idTipo_tramite: id,idUnidad: 0});
      this.data.idTipo_tramite = id;
      this.data.idUnidad = 0;
    }

    selectedUnidad(id): void{
        this.tramiteForm.patchValue({idUnidad: id, idTipo_tramite_unidad: 0, archivo: '', sede: '', nro_matricula: ''});
        this.data.idUnidad = id;
        this.data.idTipo_tramite_unidad = 0;
        this.data.archivoPdf = null;
        this._tramiteService.getTipoTramiteUnidades(this.data.idTipo_tramite, this.data.idUnidad).subscribe((resp)=>{
            // this.requisitos = resp.requisitos;
            // this.data.requisitos = resp.requisitos;
            this.tipoTramiteUnidades = resp.tipo_tramite_unidad;
            // this.tramiteForm.patchValue({requisitos: resp.requisitos});
            this._changeDetectorRef.markForCheck();
        });

        this._tramiteService.getFacultadesEscuelas(this.data.idUnidad).subscribe((resp)=>{
            if (resp.dependencias.length) {
                // console.log(resp);
                this.dependencias = resp.dependencias;
                const dependencia = this.dependencias[0];
                // console.log(dependencia);
                this.data.idDependencia = dependencia.idDependencia;
                if (dependencia) {
                    const subdependencia = dependencia.subdependencias[0];
                    // console.log(subdependencia);
                    switch (subdependencia.idUnidad) {
                        case 1:
                            this.data.idSubdependencia = subdependencia.idEscuela;
                            break;
                        case 4:
                            this.data.idSubdependencia = subdependencia.idMencion;
                            break;
                    }
                    this.data.nro_matricula = subdependencia.nro_matricula;
                    this.data.sede = subdependencia.sede;
                    switch (subdependencia.idUnidad) {
                        case 1:
                            this.tramiteForm.patchValue({idSubdependencia: subdependencia.idEscuela, nro_matricula: subdependencia.nro_matricula, sede: subdependencia.sede});
                            break;
                        case 4:
                            this.tramiteForm.patchValue({idSubdependencia: subdependencia.idMencion, nro_matricula: subdependencia.nro_matricula, sede: subdependencia.sede});
                            break;
                    }
                }
                // console.log(this.dependencias);
                // console.log(this.data);
                this.tramiteForm.patchValue({idDependencia: dependencia.idDependencia});
                let first = this.dependencias.find(item => item.idDependencia === this.data.idDependencia);
                // console.log(first);
                if (first) {
                    this.subdependencias = first.subdependencias;
                    console.log(this.subdependencias);
                }
            }else{
                this.dependencias = null;
                this.data.idDependencia = null;
                this.data.idSubdependencia = null;
                this.alert = {
                    type   : 'warn',
                    message: 'Alumno no encontrado para la unidad seleccionada',
                    title: 'Error'
                };
                this.openSnack();
            }
            this._changeDetectorRef.markForCheck();
        },
        (response) => {
            this.alert = {
                type   : 'warn',
                message: response.error.message,
                title: 'Error'
            };
            this.openSnack();
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
                switch (subdependencia.idUnidad) {
                    case 1:
                        this.data.idSubdependencia = subdependencia.idEscuela;
                        break;
                    case 4:
                        this.data.idSubdependencia = subdependencia.idMencion;
                        break;
                }
                this.data.nro_matricula = subdependencia.nro_matricula;
                this.data.sede = subdependencia.sede;
                switch (subdependencia.idUnidad) {
                    case 1:
                        this.tramiteForm.patchValue({idSubdependencia: subdependencia.idEscuela, nro_matricula: subdependencia.nro_matricula, sede: subdependencia.sede});
                        break;
                    case 4:
                        this.tramiteForm.patchValue({idSubdependencia: subdependencia.idMencion, nro_matricula: subdependencia.nro_matricula, sede: subdependencia.sede});
                        break;
                }
            }
            this.subdependencias = first.subdependencias;
        }
    }

    selectedEscuela(id): void {
        console.log(id);
        this.data.idSubdependencia = id;
        for (const itera of this.subdependencias) {
            if (itera.idSubdependencia === id) {
                this.data.nro_matricula = itera.nro_matricula;
                this.data.sede = itera.sede;
            }
        }
        this.tramiteForm.patchValue({idSubdependencia: id, nro_matricula: this.data.nro_matricula, sede: this.data.sede});
    }

    selectedTipoTramiteUnidades(id): void{
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

   
    createTramite(): void{
        // If the confirm button pressed...
        if (this.tramiteForm.invalid) {
            this.tramiteForm.markAllAsTouched();
            return;
        }

        const formData = new FormData();
        formData.append('idTipo_tramite_unidad', this.tramiteForm.getRawValue().idTipo_tramite_unidad);
        formData.append('idUnidad', this.tramiteForm.getRawValue().idUnidad);
        formData.append('idDependencia', this.tramiteForm.getRawValue().idDependencia);
        formData.append('idPrograma', this.tramiteForm.getRawValue().idSubdependencia);
        formData.append('nro_matricula', this.tramiteForm.getRawValue().nro_matricula);
        formData.append('sede', this.tramiteForm.getRawValue().sede);
        formData.append('idMotivo_certificado', this.tramiteForm.getRawValue().idMotivo_certificado);
        formData.append('idCronograma_carpeta', this.tramiteForm.getRawValue().idCronograma_carpeta);
        formData.append('comentario', this.tramiteForm.getRawValue().comentario);
        
        // Disable the form
        this.tramiteForm.disable();
        
        this._tramiteService.createTramitesFisicos(formData).subscribe((newTramite) => {
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

            const link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.setAttribute('href', environment.baseUrl + newTramite.fut);
            document.body.appendChild(link);
            link.click();
            link.remove();
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
