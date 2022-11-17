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


import { GradosEscuelaValidadosComponent } from 'app/modules/admin/grados/escuela/validados/validados.component';
import { GradosEscuelaValidadosListComponent } from 'app/modules/admin/grados/escuela/validados/list/list.component';
import { GradoEscuelaValidadoDetalleComponent } from 'app/modules/admin/grados/escuela/validados/detalle/details.component';

import { GradosEscuelaAprobadosComponent } from 'app/modules/admin/grados/escuela/aprobados/aprobados.component';
import { GradosEscuelaAprobadosListComponent } from 'app/modules/admin/grados/escuela/aprobados/list/list.component';
import { GradoEscuelaAprobadoDetalleComponent } from 'app/modules/admin/grados/escuela/aprobados/detalle/details.component';
import { VisorPdfGradoComponent } from 'app/modules/admin/grados/escuela/aprobados/visorPdf/visorPdfGrado.component';
import { RequisitosDialogComponent } from 'app/modules/admin/grados/escuela/validados/dialogReq/dialogReq.component';

import { GradosEscuelaRevalidadosComponent } from 'app/modules/admin/grados/escuela/revalidados/revalidados.component';
import { GradosEscuelaRevalidadosListComponent } from 'app/modules/admin/grados/escuela/revalidados/list/list.component';
import { GradoEscuelaRevalidadoDetalleComponent } from 'app/modules/admin/grados/escuela/revalidados/detalle/details.component';

// import { GradosValidadosFacultadComponent } from 'app/modules/admin/grados/validados_facultad/validados_facultad.component';
// import { GradosValidadosFacultadListComponent } from 'app/modules/admin/grados/validados_facultad/list/list.component';
// import { GradoValidadoFacultadDetalleComponent } from './validados_facultad/detalle/details.component';

// import { GradosAprobadosFacultadComponent } from 'app/modules/admin/grados/facultad/aprobados/aprobados_facultad.component';
// import { GradosAprobadosFacultadListComponent } from 'app/modules/admin/grados/facultad/aprobados/list/list.component';
// import { GradoAprobadoFacultadDetalleComponent } from './facultad/aprobados/detalle/details.component';

// import { GradosRevalidadosFacultadComponent } from 'app/modules/admin/grados/revalidados_facultad/revalidados_facultad.component';
// import { GradosRevalidadosFacultadListComponent } from 'app/modules/admin/grados/revalidados_facultad/list/list.component';
// import { GradoRevalidadoFacultadDetalleComponent } from './revalidados_facultad/detalle/details.component';

import { gradosRoutes } from 'app/modules/admin/grados/grados.routing';

@NgModule({
    declarations: [
        // ESCUELA
        GradosEscuelaValidadosComponent,
        GradosEscuelaValidadosListComponent,
        GradoEscuelaValidadoDetalleComponent,
        VisorPdfGradoComponent,
        RequisitosDialogComponent,
        
        GradosEscuelaAprobadosComponent,
        GradosEscuelaAprobadosListComponent,
        GradoEscuelaAprobadoDetalleComponent,

        GradosEscuelaRevalidadosComponent,
        GradosEscuelaRevalidadosListComponent,
        GradoEscuelaRevalidadoDetalleComponent,
        // FACULTAD
        // GradosValidadosFacultadComponent,
        // GradosValidadosFacultadListComponent,
        // GradoValidadoFacultadDetalleComponent,

        // GradosAprobadosFacultadComponent,
        // GradosAprobadosFacultadListComponent,
        // GradoAprobadoFacultadDetalleComponent,

        // GradosRevalidadosFacultadComponent,
        // GradosRevalidadosFacultadListComponent,
        // GradoRevalidadoFacultadDetalleComponent
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
