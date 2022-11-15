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
import { MatRippleModule } from '@angular/material/core';
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


import { GradosValidadosComponent } from 'app/modules/admin/grados/validados/validados.component';
import { GradosValidadosListComponent } from 'app/modules/admin/grados/validados/list/list.component';
import { GradoValidadoDetalleComponent } from './validados/detalle/details.component';
import { VisorPdfGradoComponent } from './validados/visorPdf/visorPdfGrado.component';
import { RequisitosDialogComponent } from './validados/dialogReq/dialogReq.component';

import { GradosAprobadosComponent } from 'app/modules/admin/grados/aprobados/aprobados.component';
import { GradosAprobadosListComponent } from 'app/modules/admin/grados/aprobados/list/list.component';
import { GradoAprobadoDetalleComponent } from './aprobados/detalle/details.component';

import { GradosRevalidadosComponent } from 'app/modules/admin/grados/revalidados/revalidados.component';
import { GradosRevalidadosListComponent } from 'app/modules/admin/grados/revalidados/list/list.component';
import { GradoRevalidadoDetalleComponent } from './revalidados/detalle/details.component';

import { GradosValidadosFacultadComponent } from 'app/modules/admin/grados/validados_facultad/validados_facultad.component';
import { GradosValidadosFacultadListComponent } from 'app/modules/admin/grados/validados_facultad/list/list.component';
import { GradoValidadoFacultadDetalleComponent } from './validados_facultad/detalle/details.component';

import { GradosAprobadosFacultadComponent } from 'app/modules/admin/grados/aprobados_facultad/aprobados_facultad.component';
import { GradosAprobadosFacultadListComponent } from 'app/modules/admin/grados/aprobados_facultad/list/list.component';
import { GradoAprobadoFacultadDetalleComponent } from './aprobados_facultad/detalle/details.component';

import { GradosRevalidadosFacultadComponent } from 'app/modules/admin/grados/revalidados_facultad/revalidados_facultad.component';
import { GradosRevalidadosFacultadListComponent } from 'app/modules/admin/grados/revalidados_facultad/list/list.component';
import { GradoRevalidadoFacultadDetalleComponent } from './revalidados_facultad/detalle/details.component';

import { gradosRoutes } from 'app/modules/admin/grados/grados.routing';

@NgModule({
    declarations: [
        // ESCUELA
        GradosValidadosComponent,
        GradosValidadosListComponent,
        GradoValidadoDetalleComponent,
        VisorPdfGradoComponent,
        RequisitosDialogComponent,
        
        GradosAprobadosComponent,
        GradosAprobadosListComponent,
        GradoAprobadoDetalleComponent,

        GradosRevalidadosComponent,
        GradosRevalidadosListComponent,
        GradoRevalidadoDetalleComponent,
        // FACULTAD
        GradosValidadosFacultadComponent,
        GradosValidadosFacultadListComponent,
        GradoValidadoFacultadDetalleComponent,

        GradosAprobadosFacultadComponent,
        GradosAprobadosFacultadListComponent,
        GradoAprobadoFacultadDetalleComponent,

        GradosRevalidadosFacultadComponent,
        GradosRevalidadosFacultadListComponent,
        GradoRevalidadoFacultadDetalleComponent
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
        MatProgressSpinnerModule
    ]
})
export class GradosModule
{
}
