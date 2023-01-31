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
import { QuillModule } from 'ngx-quill';
import * as moment from 'moment';

import { TitulosEspecialidadValidadosComponent } from 'app/modules/admin/titulos_SE/especialidad/validados/validados.component';
import { TitulosEspecialidadValidadosListComponent } from 'app/modules/admin/titulos_SE/especialidad/validados/list/list.component';
import { TituloEspecialidadValidadoDetalleComponent } from 'app/modules/admin/titulos_SE/especialidad/validados/detalle/details.component';

import { TitulosEspecialidadAprobadosComponent } from 'app/modules/admin/titulos_SE/especialidad/aprobados/aprobados.component';
import { TitulosEspecialidadAprobadosListComponent } from 'app/modules/admin/titulos_SE/especialidad/aprobados/list/list.component';
import { TituloEspecialidadAprobadoDetalleComponent } from 'app/modules/admin/titulos_SE/especialidad/aprobados/detalle/details.component';
import { VisorPdfTituloComponent } from 'app/modules/admin/titulos_SE/visorPdf/visorPdfTitulo.component';
import { RequisitosDialogComponent } from 'app/modules/admin/titulos_SE/dialogReq/dialogReq.component';

import { TitulosEspecialidadRevalidadosComponent } from 'app/modules/admin/titulos_SE/especialidad/revalidados/revalidados.component';
import { TitulosEspecialidadRevalidadosListComponent } from 'app/modules/admin/titulos_SE/especialidad/revalidados/list/list.component';
import { TituloEspecialidadRevalidadoDetalleComponent } from 'app/modules/admin/titulos_SE/especialidad/revalidados/detalle/details.component';

import { TitulosEspecialidadDiplomasComponent } from 'app/modules/admin/titulos_SE/especialidad/diplomas/diplomas.component';
import { TitulosEspecialidadDiplomasListComponent } from 'app/modules/admin/titulos_SE/especialidad/diplomas/list/list.component';
import { TituloEspecialidadDiplomaDetalleComponent } from 'app/modules/admin/titulos_SE/especialidad/diplomas/detalle/details.component';

import { TitulosFacultadValidadosComponent } from 'app/modules/admin/titulos_SE/facultad/validados/validados.component';
import { TitulosFacultadValidadosListComponent } from 'app/modules/admin/titulos_SE/facultad/validados/list/list.component';
import { TituloFacultadValidadoDetalleComponent } from 'app/modules/admin/titulos_SE/facultad/validados/detalle/details.component';

import { TitulosFacultadAprobadosComponent } from 'app/modules/admin/titulos_SE/facultad/aprobados/aprobados.component';
import { TitulosFacultadAprobadosListComponent } from 'app/modules/admin/titulos_SE/facultad/aprobados/list/list.component';
import { TituloFacultadAprobadoDetalleComponent } from './facultad/aprobados/detalle/details.component';

import { TitulosFacultadRevalidadosComponent } from 'app/modules/admin/titulos_SE/facultad/revalidados/revalidados.component';
import { TitulosFacultadRevalidadosListComponent } from 'app/modules/admin/titulos_SE/facultad/revalidados/list/list.component';
import { TituloFacultadRevalidadoDetalleComponent } from 'app/modules/admin/titulos_SE/facultad/revalidados/detalle/details.component';

import { TitulosFacultadDiplomasComponent } from 'app/modules/admin/titulos_SE/facultad/diplomas/diplomas.component';
import { TitulosFacultadDiplomasListComponent } from 'app/modules/admin/titulos_SE/facultad/diplomas/list/list.component';
import { TituloFacultadDiplomaDetalleComponent } from 'app/modules/admin/titulos_SE/facultad/diplomas/detalle/details.component';

import { TitulosURAValidacionesComponent } from 'app/modules/admin/titulos_SE/ura/validaciones/validaciones.component';
import { TitulosURAValidacionesListComponent } from 'app/modules/admin/titulos_SE/ura/validaciones/list/list.component';
import { TituloURAValidacionDetalleComponent } from 'app/modules/admin/titulos_SE/ura/validaciones/details/details.component';

import { TitulosURADiplomasComponent } from 'app/modules/admin/titulos_SE/ura/diplomas/diplomas.component';
import { TitulosURADiplomasListComponent } from 'app/modules/admin/titulos_SE/ura/diplomas/list/list.component';
import { TituloURADiplomaDetalleComponent } from 'app/modules/admin/titulos_SE/ura/diplomas/detalle/details.component';

import { TitulosURAPendientesComponent } from 'app/modules/admin/titulos_SE/ura/pendientes/pendientes.component';
import { TitulosURAPendientesListComponent } from 'app/modules/admin/titulos_SE/ura/pendientes/list/list.component';
import { TituloURAPendienteDialogComponent } from 'app/modules/admin/titulos_SE/ura/pendientes/dialog/dialog.component';

import { titulos_SERoutes } from 'app/modules/admin/titulos_SE/titulos_SE.routing';

@NgModule({
    declarations: [
        VisorPdfTituloComponent,
        RequisitosDialogComponent,
        
        // ESCUELA
        TitulosEspecialidadValidadosComponent,
        TitulosEspecialidadValidadosListComponent,
        TituloEspecialidadValidadoDetalleComponent,
        
        TitulosEspecialidadAprobadosComponent,
        TitulosEspecialidadAprobadosListComponent,
        TituloEspecialidadAprobadoDetalleComponent,

        TitulosEspecialidadRevalidadosComponent,
        TitulosEspecialidadRevalidadosListComponent,
        TituloEspecialidadRevalidadoDetalleComponent,

        TitulosEspecialidadDiplomasComponent,
        TitulosEspecialidadDiplomasListComponent,
        TituloEspecialidadDiplomaDetalleComponent,
        
        // FACULTAD
        TitulosFacultadValidadosComponent,
        TitulosFacultadValidadosListComponent,
        TituloFacultadValidadoDetalleComponent,

        TitulosFacultadAprobadosComponent,
        TitulosFacultadAprobadosListComponent,
        TituloFacultadAprobadoDetalleComponent,

        TitulosFacultadRevalidadosComponent,
        TitulosFacultadRevalidadosListComponent,
        TituloFacultadRevalidadoDetalleComponent,

        TitulosFacultadDiplomasComponent,
        TitulosFacultadDiplomasListComponent,
        TituloFacultadDiplomaDetalleComponent,

        //URA
        TitulosURAValidacionesComponent,
        TitulosURAValidacionesListComponent,
        TituloURAValidacionDetalleComponent,

        TitulosURADiplomasComponent,
        TitulosURADiplomasListComponent,
        TituloURADiplomaDetalleComponent,

        TitulosURAPendientesComponent,
        TitulosURAPendientesListComponent,        
        TituloURAPendienteDialogComponent,
    ],
    imports     : [
        RouterModule.forChild(titulos_SERoutes),
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
        MatMomentDateModule,
        QuillModule
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
export class TitulosModule
{
}
