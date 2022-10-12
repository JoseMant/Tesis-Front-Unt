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

// import { GradosAsignadosComponent } from 'app/modules/admin/grados/asignados/asignados.component';
// import { GradosAsignadosListComponent } from 'app/modules/admin/grados/asignados/list/list.component';
// import { GradoAsignadoDetalleComponent } from './asignados/detalle/details.component';

import { GradosAprobadosComponent } from 'app/modules/admin/grados/aprobados/aprobados.component';
import { GradosAprobadosListComponent } from 'app/modules/admin/grados/aprobados/list/list.component';
import { GradoAprobadoDetalleComponent } from './aprobados/detalle/details.component';

import { GradosValidadosComponent } from 'app/modules/admin/grados/validados/validados.component';
import { GradosValidadosListComponent } from 'app/modules/admin/grados/validados/list/list.component';
import { GradoValidadoDetalleComponent } from './validados/detalle/details.component';
import { VisorPdfGradoComponent } from './validados/visorPdf/visorPdfGrado.component';
import { RequisitosDialogComponent } from './validados/dialogReq/dialogReq.component';

// import { GradosFirmaURAAComponent } from 'app/modules/admin/grados/firma_uraa/firma_uraa.component';
// import { GradosFirmaURAAListComponent } from 'app/modules/admin/grados/firma_uraa/list/list.component';
// import { GradoFirmaURAADetalleComponent } from './firma_uraa/detalle/details.component';
// import { GradoFirmaURAAVisorPdfComponent } from './firma_uraa/visorPdf/visorPdfGrado.component';

// import { GradosFirmaDecanoComponent } from 'app/modules/admin/grados/firma_decano/firma_decano.component';
// import { GradosFirmaDecanoListComponent } from 'app/modules/admin/grados/firma_decano/list/list.component';
// import { GradoFirmaDecanoDetalleComponent } from './firma_decano/detalle/details.component';
// import { GradoFirmaDecanoVisorPdfComponent } from './firma_decano/visorPdf/visorPdfGrado.component';

import { gradosRoutes } from 'app/modules/admin/grados/grados.routing';

@NgModule({
    declarations: [
        // GradosAsignadosComponent,
        // GradosAsignadosListComponent,
        // GradoAsignadoDetalleComponent,
        GradosAprobadosComponent,
        GradosAprobadosListComponent,
        GradoAprobadoDetalleComponent,
        // GradosFirmaURAAComponent,
        // GradosFirmaURAAListComponent,
        // GradoFirmaURAADetalleComponent,
        // GradoFirmaURAAVisorPdfComponent,
        // GradosFirmaDecanoComponent,
        // GradosFirmaDecanoListComponent,
        // GradoFirmaDecanoDetalleComponent,
        // GradoFirmaDecanoVisorPdfComponent,
        GradosValidadosComponent,
        GradosValidadosListComponent,
        GradoValidadoDetalleComponent,
        VisorPdfGradoComponent,
        RequisitosDialogComponent
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
        MatCardModule
    ]
})
export class GradosModule
{
}
