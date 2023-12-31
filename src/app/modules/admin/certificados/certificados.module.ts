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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from 'app/shared/shared.module';


import { CertificadosAsignadosComponent } from 'app/modules/admin/certificados/asignados/asignados.component';
import { CertificadosAsignadosListComponent } from 'app/modules/admin/certificados/asignados/list/list.component';
import { CertificadoAsignadoDetalleComponent } from './asignados/detalle/details.component';
import { RequisitosDialogComponent } from './asignados/dialogReq/dialogReq.component';

import { CertificadosAprobadosComponent } from 'app/modules/admin/certificados/aprobados/aprobados.component';
import { CertificadosAprobadosListComponent } from 'app/modules/admin/certificados/aprobados/list/list.component';
import { CertificadoAprobadoDetalleComponent } from './aprobados/detalle/details.component';
import { CertificadoAprobadoDialogComponent } from './aprobados/dialog/dialog.component';
import { VisorPdfCertificadoComponent } from './aprobados/visorPdf/visorPdfCertificado.component';

import { CertificadosValidadosComponent } from 'app/modules/admin/certificados/validados/validados.component';
import { CertificadosValidadosListComponent } from 'app/modules/admin/certificados/validados/list/list.component';
import { CertificadoValidadoDetalleComponent } from './validados/detalle/details.component';

import { CertificadosPendientesComponent } from 'app/modules/admin/certificados/pendientes/pendientes.component';
import { CertificadosPendientesListComponent } from 'app/modules/admin/certificados/pendientes/list/list.component';

import { CertificadosFirmaURAAComponent } from 'app/modules/admin/certificados/firma_uraa/firma_uraa.component';
import { CertificadosFirmaURAAListComponent } from 'app/modules/admin/certificados/firma_uraa/list/list.component';
import { CertificadoFirmaURAADetalleComponent } from './firma_uraa/detalle/details.component';
import { CertificadoFirmaURAAVisorPdfComponent } from './firma_uraa/visorPdf/visorPdfCertificado.component';

import { CertificadosFirmaDecanoComponent } from 'app/modules/admin/certificados/firma_decano/firma_decano.component';
import { CertificadosFirmaDecanoListComponent } from 'app/modules/admin/certificados/firma_decano/list/list.component';
import { CertificadoFirmaDecanoDetalleComponent } from './firma_decano/detalle/details.component';
import { CertificadoFirmaDecanoVisorPdfComponent } from './firma_decano/visorPdf/visorPdfCertificado.component';

import { certificadosRoutes } from 'app/modules/admin/certificados/certificados.routing';

import { CertificadosReasignadosComponent } from 'app/modules/admin/certificados/reasignados/reasignados.component';
import { CertificadosReasignadosListComponent } from 'app/modules/admin/certificados/reasignados/list/list.component';

import { CertificadosFinalizadosComponent } from 'app/modules/admin/certificados/finalizados/finalizados.component';
import { CertificadosFinalizadosListComponent } from 'app/modules/admin/certificados/finalizados/list/list.component';
import { CertificadoFinalizadoDetalleComponent } from './finalizados/detalle/details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';


@NgModule({
    declarations: [
        CertificadosAsignadosComponent,
        CertificadosAsignadosListComponent,
        CertificadoAsignadoDetalleComponent,
        CertificadosAprobadosComponent,
        CertificadosAprobadosListComponent,
        CertificadoAprobadoDetalleComponent,
        CertificadoAprobadoDialogComponent,
        CertificadosFirmaURAAComponent,
        CertificadosFirmaURAAListComponent,
        CertificadoFirmaURAADetalleComponent,
        CertificadoFirmaURAAVisorPdfComponent,
        CertificadosFirmaDecanoComponent,
        CertificadosFirmaDecanoListComponent,
        CertificadoFirmaDecanoDetalleComponent,
        CertificadoFirmaDecanoVisorPdfComponent,
        CertificadosValidadosComponent,
        CertificadosValidadosListComponent,
        CertificadoValidadoDetalleComponent,
        CertificadosPendientesComponent,
        CertificadosPendientesListComponent,
        VisorPdfCertificadoComponent,
        RequisitosDialogComponent,
        CertificadosReasignadosComponent,
        CertificadosReasignadosListComponent,
        CertificadosFinalizadosComponent,
        CertificadosFinalizadosListComponent,
        CertificadoFinalizadoDetalleComponent
    ],
    imports     : [
        RouterModule.forChild(certificadosRoutes),
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
        MatCardModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatProgressSpinnerModule,
        QuillModule.forRoot(),
        SharedModule
    ]
})
export class CertificadosModule
{
}
