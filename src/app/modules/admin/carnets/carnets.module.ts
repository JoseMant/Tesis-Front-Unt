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
import { CarnetsAprobadosComponent } from 'app/modules/admin/carnets/aprobados/aprobados.component';
import { CarnetsAprobadosListComponent } from 'app/modules/admin/carnets/aprobados/list/list.component';
import { CarnetsValidadosComponent } from 'app/modules/admin/carnets/validados/validados.component';
import { CarnetsValidadosListComponent } from 'app/modules/admin/carnets/validados/list/list.component';
import { CarnetAprobadoDetalleComponent } from './aprobados/detalle/details.component';
import { CarnetValidadoDetalleComponent } from './validados/detalle/details.component';
import { CarnetsDuplicadosComponent } from 'app/modules/admin/carnets/duplicados/duplicados.component';
import { CarnetsDuplicadosListComponent } from 'app/modules/admin/carnets/duplicados/list/list.component';
import { CarnetDuplicadoDetalleComponent } from './duplicados/detalle/details.component';
import { RequisitosDialogComponent } from './duplicados/dialogReq/dialogReq.component';
import { CarnetsSolicitadosComponent } from 'app/modules/admin/carnets/solicitados/solicitados.component';
import { CarnetsSolicitadosListComponent } from 'app/modules/admin/carnets/solicitados/list/list.component';
import { CarnetSolicitadoDetalleComponent } from './solicitados/detalle/details.component';
import { CarnetsRecibidosComponent } from 'app/modules/admin/carnets/recibidos/recibidos.component';
import { CarnetsRecibidosListComponent } from 'app/modules/admin/carnets/recibidos/list/list.component';
import { CarnetsFinalizadosComponent } from 'app/modules/admin/carnets/finalizados/finalizados.component';
import { CarnetRecibidoDetalleComponent } from './recibidos/detalle/details.component';
import { CarnetsFinalizadosListComponent } from './finalizados/list/list.component';
import { CarnetFinalizadoDetalleComponent } from './finalizados/detalle/details.component';

@NgModule({
    declarations: [
        CarnetsAprobadosComponent,
        CarnetsAprobadosListComponent,
        CarnetAprobadoDetalleComponent,
        CarnetsValidadosComponent,
        CarnetsValidadosListComponent,
        CarnetValidadoDetalleComponent,
        RequisitosDialogComponent,
        //---
        CarnetsDuplicadosComponent,
        CarnetsDuplicadosListComponent,
        CarnetDuplicadoDetalleComponent,
        //---
        CarnetsSolicitadosComponent,
        CarnetsSolicitadosListComponent,
        CarnetSolicitadoDetalleComponent,
        //---
        CarnetsRecibidosComponent,
        CarnetsRecibidosListComponent,
        CarnetRecibidoDetalleComponent,
        //---
        CarnetsFinalizadosComponent,
        CarnetsFinalizadosListComponent,
        CarnetFinalizadoDetalleComponent
    
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
