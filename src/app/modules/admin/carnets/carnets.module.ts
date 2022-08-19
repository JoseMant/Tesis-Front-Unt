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
import { CarnetsAsignadosComponent } from 'app/modules/admin/carnets/asignados/asignados.component';
import { CarnetsAsignadosListComponent } from 'app/modules/admin/carnets/asignados/list/list.component';
import { CarnetsAprobadosComponent } from 'app/modules/admin/carnets/aprobados/aprobados.component';
import { CarnetsAprobadosListComponent } from 'app/modules/admin/carnets/aprobados/list/list.component';
import { CarnetsValidadosComponent } from 'app/modules/admin/carnets/validados/validados.component';
import { CarnetsValidadosListComponent } from 'app/modules/admin/carnets/validados/list/list.component';

// import { CarnetsRechazadosComponent } from 'app/modules/admin/vouchers/rechazados/rechazados.component';
// import { CarnetsRechazadosListComponent } from 'app/modules/admin/vouchers/rechazados/list/list.component';
import { carnetsRoutes } from 'app/modules/admin/carnets/carnets.routing';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatExpansionModule} from '@angular/material/expansion';
// import { VisorPdfCarnetComponent } from './asignados/visorPdf/visorPdfCarnet.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { CarnetAsignadoDetalleComponent } from './asignados/detalle/details.component';
import { CarnetAprobadoDetalleComponent } from './aprobados/detalle/details.component';
import { CarnetValidadoDetalleComponent } from './validados/detalle/details.component';
import { RequisitosDialogComponent } from './asignados/dialogReq/dialogReq.component';

@NgModule({
    declarations: [
        CarnetsAsignadosComponent,
        CarnetsAsignadosListComponent,
        CarnetAsignadoDetalleComponent,
        CarnetsAprobadosComponent,
        CarnetsAprobadosListComponent,
        CarnetAprobadoDetalleComponent,
        CarnetsValidadosComponent,
        CarnetsValidadosListComponent,
        CarnetValidadoDetalleComponent,
        // VisorPdfCarnetComponent,
        RequisitosDialogComponent
    ],
    imports     : [
        RouterModule.forChild(carnetsRoutes),
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
export class CarnetsModule
{
}
