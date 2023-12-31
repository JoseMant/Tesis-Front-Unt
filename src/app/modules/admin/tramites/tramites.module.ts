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
import { TramiteListComponent } from 'app/modules/admin/tramites/formulario/formulario.component';
import { tramitesRoutes } from 'app/modules/admin/tramites/tramites.routing';
import { TramitesComponent } from './tramites.component';
import { TramiteDetalleComponent } from 'app/modules/admin/tramites/details/details.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { VisorPdfComponent } from './visorPdf/visorPdf.component';
import { VisorExoneradoComponent } from './visorExonerado/visorExonerado.component';
import { VisorImagenComponent } from './visorImagen/visorImagen.component';
import { TramiteFisicoListComponent } from 'app/modules/admin/tramites/tramites_fisicos/formulario.component';
import { TramiteOficioListComponent } from 'app/modules/admin/tramites/tramites_secretaria/formulario.component';


@NgModule({
    declarations: [
        TramitesComponent,
        TramiteListComponent,
        TramiteDetalleComponent,
        VisorPdfComponent,
        VisorExoneradoComponent,
        VisorImagenComponent,
        TramiteFisicoListComponent,
        TramiteOficioListComponent,
    ],
    imports     : [
        RouterModule.forChild(tramitesRoutes),
        MatListModule,
        MatButtonModule,
        FuseAlertModule,
        MatTabsModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        MatMenuModule,
        MatMomentDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        FuseConfirmationModule,
        MatRadioModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTableModule,
        MatTooltipModule,
        SharedModule,
        FuseFindByKeyPipeModule,
        MatSidenavModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        PdfViewerModule
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
export class TramitesModule
{
}
