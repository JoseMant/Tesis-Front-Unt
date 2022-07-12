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
import { CertificadoService } from 'app/modules/admin/tramites/certificados/certificados.service';
import { CertificadoInterface } from 'app/modules/admin/tramites/certificados/certificados.types';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';

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
    alumno: any;
    tramites: any;
    abrir: boolean = false;
    bancos: any;
    data: CertificadoInterface;
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
        this.certificadoForm = this._formBuilder.group({
            idTipo_tramite: [''],
            nro_documento: [''],
            idColacion: [''],
            idEstado_tramite: [''],
            idModalidad_grado: [''],
            descripcion_estado: [''],
            codigo: [''],
            entidad: [''],
            nro_operacion: [''],
            fecha_operacion: [''],
            archivo: [''],
            idFacultad: [''],
            idEscuela: [''],
            idMotivo: [''],
            descipcion_estado: [''],
        });

        this._certificadoService.bancos$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((bancos: any) => {
                this.bancos = bancos;
                //console.log(bancos);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


        this._certificadoService.tramites$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tramites: any) => {
                this.tramites = tramites;
                console.log(tramites);

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
            if (this.user.tipo_doc === 1) {
                this.user['documento'] = 'DNI';
            }else if (this.user.tipo_doc === 2) {
                this.user['documento'] = 'PASAPORTE';
            } else {
                this.user['documento'] = 'CARNET DE EXTRANJERIA';
            }
            // if (this.user.idUsuario) {
            //     const dni = {dni: this.user.nro_doc};
            //     console.log(dni);
            //     this._certificadoService.getDataAlumno(dni).subscribe((response) => {
            //         this.alumno = response;
            //         console.log(response);
            //         // Mark for check
            //         this._changeDetectorRef.markForCheck();
            //     });
            // }
        });

        this.createFormulario();
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
    createFormulario(): void
    {
        //Create the formulario
        const newCertificado = {
            idModalidad_grado: 0,
            idFacultad: 0,
            idEscuela: 0,
            idTipo_tramite: 0,
            nro_documento: this.user.nro_doc,
            idColacion: 1,
            idEstado_tramite: 0,
            descripcion_estado: '',
            descipcion_estado: '',
            codigo: this.user.nro_matricula,
            entidad: 'BANCOS',
            nro_operacion: '',
            fecha_operacion: '',
            idMotivo: 0,
            archivo: ''
        };
        this.certificadoForm.patchValue(newCertificado);
        this.data = newCertificado;
    }
    selectedUnidad(id): void{
        console.log(id);
        if (id === 1) {
            this.certificadoForm.patchValue({idTipo_tramite: 1});
            this.data.idModalidad_grado = 1;
            this.data.idTipo_tramite = 1;
            this.data.idFacultad = 0;
        }
        if (id === 2) {
            this.certificadoForm.patchValue({idTipo_tramite: 2});
            this.data.idModalidad_grado = 2;
            this.data.idTipo_tramite = 2;
            this.data.idFacultad = 0;
        }
    }

    selectedFacultad(id): void{
        console.log(id);
        if (id === 1) {
            //this.certificadoForm.patchValue({idTipo_tramite: 1});
            this.data.idFacultad = 1;
        }
        if (id === 2) {
            //this.certificadoForm.patchValue({idTipo_tramite: 2});
            this.data.idFacultad = 2;
        }
        if (id === 3) {
            //this.certificadoForm.patchValue({idTipo_tramite: 2});
            this.data.idFacultad = 3;
        }
    }

    selectFiles(event): void {
        const files = event.target.files[0];
        console.log(files);
        this.certificadoForm.patchValue({archivo: files});
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
            descipcion_estado: this.certificadoForm.getRawValue().descipcion_estado
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
            formData.append('descipcion_estado', certificado.descipcion_estado);
            console.log(formData.getAll('archivo'));
            this._certificadoService.createCertificado(formData).subscribe((newMadurity) => {
                console.log(newMadurity);
                // Toggle the edit mode off
                //this.toggleEditMode(false);

                // Go to new product
                this.createFormulario();

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


