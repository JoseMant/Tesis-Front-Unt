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
// import { ConstanciasAsignadosComponent } from 'app/modules/admin/constancias/asignados/asignados.component';
// import { ConstanciasAsignadosListComponent } from 'app/modules/admin/constancias/asignados/list/list.component';
import { ConstanciasAprobadosComponent } from 'app/modules/admin/constancias/aprobados/aprobados.component';
import { ConstanciasAprobadosListComponent } from 'app/modules/admin/constancias/aprobados/list/list.component';
import { ConstanciasValidadosComponent } from 'app/modules/admin/constancias/validados/validados.component';
import { ConstanciasValidadosListComponent } from 'app/modules/admin/constancias/validados/list/list.component';
import { ConstanciasFirmaURAAListComponent } from 'app/modules/admin/constancias/firma_uraa/list/list.component';
import { ConstanciasFirmaURAAComponent } from 'app/modules/admin/constancias/firma_uraa/firma_uraa.component';
import { ConstanciaFirmaURAADetalleComponent } from 'app/modules/admin/constancias/firma_uraa/detalle/details.component';

// import { ConstanciasRechazadosComponent } from 'app/modules/admin/vouchers/rechazados/rechazados.component';
// import { ConstanciasRechazadosListComponent } from 'app/modules/admin/vouchers/rechazados/list/list.component';
import { constanciasRoutes } from 'app/modules/admin/constancias/constancias.routing';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatExpansionModule} from '@angular/material/expansion';
// import { VisorPdfConstanciaComponent } from './asignados/visorPdf/visorPdfConstancia.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
// import { ConstanciaAsignadoDetalleComponent } from './asignados/detalle/details.component';
import { ConstanciaAprobadoDetalleComponent } from './aprobados/detalle/details.component';
import { ConstanciaValidadoDetalleComponent } from './validados/detalle/details.component';
// import { RequisitosDialogComponent } from './asignados/dialogReq/dialogReq.component';
import { VisorPdfConstanciaComponent } from './aprobados/visorPdf/visorPdfConstancia.component';
import { ConstanciaFirmaURAAVisorPdfComponent } from './firma_uraa/visorPdf/visorPdfConstanciaFirmaUraa.component';

@NgModule({
    declarations: [
        // ConstanciasAsignadosComponent,
        // ConstanciasAsignadosListComponent,
        // ConstanciaAsignadoDetalleComponent,
        ConstanciasAprobadosComponent,
        ConstanciasAprobadosListComponent,
        ConstanciaAprobadoDetalleComponent,
        ConstanciasValidadosComponent,
        ConstanciasValidadosListComponent,
        ConstanciaValidadoDetalleComponent,
        ConstanciasFirmaURAAComponent,
        ConstanciasFirmaURAAListComponent,
        ConstanciaFirmaURAADetalleComponent,
        VisorPdfConstanciaComponent,
        ConstanciaFirmaURAAVisorPdfComponent
        // RequisitosDialogComponent
    ],
    imports     : [
        RouterModule.forChild(constanciasRoutes),
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
export class ConstanciasModule
{
}
