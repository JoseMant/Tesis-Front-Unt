import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_DATE_FORMATS, MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from 'app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import * as moment from 'moment';

import { GradosEscuelaValidadosComponent } from 'app/modules/admin/grados/escuela/validados/validados.component';
import { GradosEscuelaValidadosListComponent } from 'app/modules/admin/grados/escuela/validados/list/list.component';
import { GradoEscuelaValidadoDetalleComponent } from 'app/modules/admin/grados/escuela/validados/detalle/details.component';

import { GradosEscuelaAprobadosComponent } from 'app/modules/admin/grados/escuela/aprobados/aprobados.component';
import { GradosEscuelaAprobadosListComponent } from 'app/modules/admin/grados/escuela/aprobados/list/list.component';
import { GradoEscuelaAprobadoDetalleComponent } from 'app/modules/admin/grados/escuela/aprobados/detalle/details.component';
import { VisorPdfGradoComponent } from 'app/modules/admin/grados/visorPdf/visorPdfGrado.component';
import { RequisitosDialogComponent } from 'app/modules/admin/grados/dialogReq/dialogReq.component';

import { GradosEscuelaRevalidadosComponent } from 'app/modules/admin/grados/escuela/revalidados/revalidados.component';
import { GradosEscuelaRevalidadosListComponent } from 'app/modules/admin/grados/escuela/revalidados/list/list.component';
import { GradoEscuelaRevalidadoDetalleComponent } from 'app/modules/admin/grados/escuela/revalidados/detalle/details.component';

import { GradosEscuelaDiplomasComponent } from 'app/modules/admin/grados/escuela/diplomas/diplomas.component';
import { GradosEscuelaDiplomasListComponent } from 'app/modules/admin/grados/escuela/diplomas/list/list.component';
import { GradoEscuelaDiplomaDetalleComponent } from 'app/modules/admin/grados/escuela/diplomas/detalle/details.component';

import { GradosFacultadValidadosComponent } from 'app/modules/admin/grados/facultad/validados/validados.component';
import { GradosFacultadValidadosListComponent } from 'app/modules/admin/grados/facultad/validados/list/list.component';
import { GradoFacultadValidadoDetalleComponent } from 'app/modules/admin/grados/facultad/validados/detalle/details.component';

import { GradosFacultadAprobadosComponent } from 'app/modules/admin/grados/facultad/aprobados/aprobados.component';
import { GradosFacultadAprobadosListComponent } from 'app/modules/admin/grados/facultad/aprobados/list/list.component';
import { GradoFacultadAprobadoDetalleComponent } from './facultad/aprobados/detalle/details.component';

import { GradosFacultadRevalidadosComponent } from 'app/modules/admin/grados/facultad/revalidados/revalidados.component';
import { GradosFacultadRevalidadosListComponent } from 'app/modules/admin/grados/facultad/revalidados/list/list.component';
import { GradoFacultadRevalidadoDetalleComponent } from 'app/modules/admin/grados/facultad/revalidados/detalle/details.component';

import { GradosFacultadDiplomasComponent } from 'app/modules/admin/grados/facultad/diplomas/diplomas.component';
import { GradosFacultadDiplomasListComponent } from 'app/modules/admin/grados/facultad/diplomas/list/list.component';
import { GradoFacultadDiplomaDetalleComponent } from 'app/modules/admin/grados/facultad/diplomas/detalle/details.component';

import { GradosURAValidacionesComponent } from 'app/modules/admin/grados/ura/validaciones/validaciones.component';
import { GradosURAValidacionesListComponent } from 'app/modules/admin/grados/ura/validaciones/list/list.component';
import { GradoURAValidacionDetalleComponent } from 'app/modules/admin/grados/ura/validaciones/details/details.component';

import { GradosURADiplomasComponent } from 'app/modules/admin/grados/ura/diplomas/diplomas.component';
import { GradosURADiplomasListComponent } from 'app/modules/admin/grados/ura/diplomas/list/list.component';
import { GradoURADiplomaDetalleComponent } from 'app/modules/admin/grados/ura/diplomas/detalle/details.component';

import { GradosSecretariaValidadosComponent } from 'app/modules/admin/grados/secretaria/validados/validados.component';
import { GradosSecretariaValidadosListComponent } from 'app/modules/admin/grados/secretaria/validados/list/list.component';
import { GradoSecretariaValidadoDetalleComponent } from 'app/modules/admin/grados/secretaria/validados/detalle/details.component';

import { GradosSecretariaPendientesComponent } from 'app/modules/admin/grados/ura/pendientes/pendientes.component';
import { GradosSecretariaPendientesListComponent } from 'app/modules/admin/grados/ura/pendientes/list/list.component';


import { GradosFirmaDecanoComponent } from 'app/modules/admin/grados/facultad/firma_decano/firma_decano.component';
import { GradosFirmaDecanoListComponent } from 'app/modules/admin/grados/facultad/firma_decano/list/list.component';
import { GradoFirmaDecanoDetalleComponent } from './facultad/firma_decano/detalle/details.component';

import { GradosFirmaSecretariaComponent } from 'app/modules/admin/grados/secretaria/firma_secretaria/firma_secretaria.component';
import { GradosFirmaSecretariaListComponent } from 'app/modules/admin/grados/secretaria/firma_secretaria/list/list.component';
import { GradoFirmaSecretariaDetalleComponent } from './secretaria/firma_secretaria/detalle/details.component';

import { GradosFirmaRectorComponent } from 'app/modules/admin/grados/rector/firma_rector/firma_rector.component';
import { GradosFirmaRectorListComponent } from 'app/modules/admin/grados/rector/firma_rector/list/list.component';
import { GradoFirmaRectorDetalleComponent } from './rector/firma_rector/detalle/details.component';

import { GradoURAPendienteDialogComponent } from 'app/modules/admin/grados/ura/pendientes/dialog/dialog.component';

import { gradosRoutes } from 'app/modules/admin/grados/grados.routing';

@NgModule({
    declarations: [
        VisorPdfGradoComponent,
        RequisitosDialogComponent,
        // ESCUELA
        GradosEscuelaValidadosComponent,
        GradosEscuelaValidadosListComponent,
        GradoEscuelaValidadoDetalleComponent,
        
        GradosEscuelaAprobadosComponent,
        GradosEscuelaAprobadosListComponent,
        GradoEscuelaAprobadoDetalleComponent,

        GradosEscuelaRevalidadosComponent,
        GradosEscuelaRevalidadosListComponent,
        GradoEscuelaRevalidadoDetalleComponent,

        GradosEscuelaDiplomasComponent,
        GradosEscuelaDiplomasListComponent,
        GradoEscuelaDiplomaDetalleComponent,
        
        // FACULTAD
        GradosFacultadValidadosComponent,
        GradosFacultadValidadosListComponent,
        GradoFacultadValidadoDetalleComponent,

        GradosFacultadAprobadosComponent,
        GradosFacultadAprobadosListComponent,
        GradoFacultadAprobadoDetalleComponent,

        GradosFacultadRevalidadosComponent,
        GradosFacultadRevalidadosListComponent,
        GradoFacultadRevalidadoDetalleComponent,

        GradosFacultadDiplomasComponent,
        GradosFacultadDiplomasListComponent,
        GradoFacultadDiplomaDetalleComponent,

        GradosFirmaDecanoComponent,
        GradosFirmaDecanoListComponent,
        GradoFirmaDecanoDetalleComponent,

        //URA
        GradosURAValidacionesComponent,
        GradosURAValidacionesListComponent,
        GradoURAValidacionDetalleComponent,

        GradosURADiplomasComponent,
        GradosURADiplomasListComponent,
        GradoURADiplomaDetalleComponent,

        // SECRETARIA GENERAL
        GradosSecretariaValidadosComponent,
        GradosSecretariaValidadosListComponent,
        GradoSecretariaValidadoDetalleComponent,

        GradosFirmaSecretariaComponent,
        GradosFirmaSecretariaListComponent,
        GradoFirmaSecretariaDetalleComponent,

        GradosFirmaRectorComponent,
        GradosFirmaRectorListComponent,
        GradoFirmaRectorDetalleComponent,

        GradosSecretariaPendientesComponent,
        GradosSecretariaPendientesListComponent,
        
        GradoURAPendienteDialogComponent,
    ],
    imports     : [
        RouterModule.forChild(gradosRoutes),
        MatTableModule,
        MatListModule,
        MatSnackBarModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        PdfViewerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatExpansionModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        SharedModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatDividerModule,
        MatMomentDateModule
    ],
    providers   : [
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: moment.ISO_8601
                },
                display: {
                    dateInput         : 'LL',
                    monthYearLabel    : 'MMM YYYY',
                    dateA11yLabel     : 'LL',
                    monthYearA11yLabel: 'MMMM YYYY'
                }
            }
        }
    ]
})
export class GradosModule
{
}
