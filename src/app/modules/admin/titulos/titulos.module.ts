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

import { TitulosEscuelaValidadosComponent } from 'app/modules/admin/titulos/escuela/validados/validados.component';
import { TitulosEscuelaValidadosListComponent } from 'app/modules/admin/titulos/escuela/validados/list/list.component';
import { TituloEscuelaValidadoDetalleComponent } from 'app/modules/admin/titulos/escuela/validados/detalle/details.component';

import { TitulosEscuelaAprobadosComponent } from 'app/modules/admin/titulos/escuela/aprobados/aprobados.component';
import { TitulosEscuelaAprobadosListComponent } from 'app/modules/admin/titulos/escuela/aprobados/list/list.component';
import { TituloEscuelaAprobadoDetalleComponent } from 'app/modules/admin/titulos/escuela/aprobados/detalle/details.component';
import { VisorPdfTituloComponent } from 'app/modules/admin/titulos/visorPdf/visorPdfTitulo.component';
import { RequisitosDialogComponent } from 'app/modules/admin/titulos/dialogReq/dialogReq.component';

import { TitulosEscuelaRevalidadosComponent } from 'app/modules/admin/titulos/escuela/revalidados/revalidados.component';
import { TitulosEscuelaRevalidadosListComponent } from 'app/modules/admin/titulos/escuela/revalidados/list/list.component';
import { TituloEscuelaRevalidadoDetalleComponent } from 'app/modules/admin/titulos/escuela/revalidados/detalle/details.component';

import { TitulosEscuelaDiplomasComponent } from 'app/modules/admin/titulos/escuela/diplomas/diplomas.component';
import { TitulosEscuelaDiplomasListComponent } from 'app/modules/admin/titulos/escuela/diplomas/list/list.component';
import { TituloEscuelaDiplomaDetalleComponent } from 'app/modules/admin/titulos/escuela/diplomas/detalle/details.component';

import { TitulosFacultadValidadosComponent } from 'app/modules/admin/titulos/facultad/validados/validados.component';
import { TitulosFacultadValidadosListComponent } from 'app/modules/admin/titulos/facultad/validados/list/list.component';
import { TituloFacultadValidadoDetalleComponent } from 'app/modules/admin/titulos/facultad/validados/detalle/details.component';

import { TitulosFacultadAprobadosComponent } from 'app/modules/admin/titulos/facultad/aprobados/aprobados.component';
import { TitulosFacultadAprobadosListComponent } from 'app/modules/admin/titulos/facultad/aprobados/list/list.component';
import { TituloFacultadAprobadoDetalleComponent } from './facultad/aprobados/detalle/details.component';

import { TitulosFacultadRevalidadosComponent } from 'app/modules/admin/titulos/facultad/revalidados/revalidados.component';
import { TitulosFacultadRevalidadosListComponent } from 'app/modules/admin/titulos/facultad/revalidados/list/list.component';
import { TituloFacultadRevalidadoDetalleComponent } from 'app/modules/admin/titulos/facultad/revalidados/detalle/details.component';

import { TitulosFacultadDiplomasComponent } from 'app/modules/admin/titulos/facultad/diplomas/diplomas.component';
import { TitulosFacultadDiplomasListComponent } from 'app/modules/admin/titulos/facultad/diplomas/list/list.component';
import { TituloFacultadDiplomaDetalleComponent } from 'app/modules/admin/titulos/facultad/diplomas/detalle/details.component';

import { TitulosURAValidacionesComponent } from 'app/modules/admin/titulos/ura/validaciones/validaciones.component';
import { TitulosURAValidacionesListComponent } from 'app/modules/admin/titulos/ura/validaciones/list/list.component';
import { TituloURAValidacionDetalleComponent } from 'app/modules/admin/titulos/ura/validaciones/details/details.component';

import { TitulosURADiplomasComponent } from 'app/modules/admin/titulos/ura/diplomas/diplomas.component';
import { TitulosURADiplomasListComponent } from 'app/modules/admin/titulos/ura/diplomas/list/list.component';
import { TituloURADiplomaDetalleComponent } from 'app/modules/admin/titulos/ura/diplomas/detalle/details.component';

import { titulosRoutes } from 'app/modules/admin/titulos/titulos.routing';

@NgModule({
    declarations: [
        VisorPdfTituloComponent,
        RequisitosDialogComponent,
        
        // ESCUELA
        TitulosEscuelaValidadosComponent,
        TitulosEscuelaValidadosListComponent,
        TituloEscuelaValidadoDetalleComponent,
        
        TitulosEscuelaAprobadosComponent,
        TitulosEscuelaAprobadosListComponent,
        TituloEscuelaAprobadoDetalleComponent,

        TitulosEscuelaRevalidadosComponent,
        TitulosEscuelaRevalidadosListComponent,
        TituloEscuelaRevalidadoDetalleComponent,

        TitulosEscuelaDiplomasComponent,
        TitulosEscuelaDiplomasListComponent,
        TituloEscuelaDiplomaDetalleComponent,
        
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
    ],
    imports     : [
        RouterModule.forChild(titulosRoutes),
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
