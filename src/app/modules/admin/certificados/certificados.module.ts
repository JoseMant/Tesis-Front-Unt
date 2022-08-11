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
import { SharedModule } from 'app/shared/shared.module';
import { CertificadosAsignadosComponent } from 'app/modules/admin/certificados/asignados/asignados.component';
import { CertificadosAsignadosListComponent } from 'app/modules/admin/certificados/asignados/list/list.component';
// import { CertificadosAprobadosComponent } from 'app/modules/admin/vouchers/aprobados/aprobados.component';
// import { CertificadosAprobadosListComponent } from 'app/modules/admin/vouchers/aprobados/list/list.component';
// import { CertificadosRechazadosComponent } from 'app/modules/admin/vouchers/rechazados/rechazados.component';
// import { CertificadosRechazadosListComponent } from 'app/modules/admin/vouchers/rechazados/list/list.component';
import { vouchersRoutes } from 'app/modules/admin/vouchers/vouchers.routing';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatExpansionModule} from '@angular/material/expansion';
import { VisorPdfCertificadoComponent } from './asignados/visorPdf/visorPdfCertificado.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        CertificadosAsignadosComponent,
        CertificadosAsignadosListComponent,
        // CertificadosAprobadosComponent,
        // CertificadosAprobadosListComponent,
        // CertificadosRechazadosComponent,
        // CertificadosRechazadosListComponent,
        VisorPdfCertificadoComponent
    ],
    imports     : [
        RouterModule.forChild(vouchersRoutes),
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
        SharedModule
    ]
})
export class CertificadosModule
{
}
