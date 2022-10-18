import { NgModule } from '@angular/core';
import { MAT_DATE_FORMATS, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import * as moment from 'moment';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule} from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { PdfViewerModule } from 'ng2-pdf-viewer';


import {MatExpansionModule} from '@angular/material/expansion';

import { carnetsRoutes } from 'app/modules/admin/carnets/carnets.routing';
import { CarnetsAsignadosComponent } from 'app/modules/admin/carnets/asignados/asignados.component';
import { CarnetsAsignadosListComponent } from 'app/modules/admin/carnets/asignados/list/list.component';
import { CarnetsAprobadosComponent } from 'app/modules/admin/carnets/aprobados/aprobados.component';
import { CarnetsAprobadosListComponent } from 'app/modules/admin/carnets/aprobados/list/list.component';
import { CarnetsValidadosComponent } from 'app/modules/admin/carnets/validados/validados.component';
import { CarnetsValidadosListComponent } from 'app/modules/admin/carnets/validados/list/list.component';
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
        MatExpansionModule,


        MatProgressSpinnerModule
    ]
})
export class CarnetsModule
{
}
