// import { AngularDualListBoxModule } from 'angular-dual-listbox';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CronogramasComponent } from 'app/modules/admin/masters/bachiller_grado/cronogramas/cronogramas.component';
import { CronogramasListComponent } from 'app/modules/admin/masters/bachiller_grado/cronogramas/list/list.component';
import { CronogramasDetailsComponent } from 'app/modules/admin/masters/bachiller_grado/cronogramas/details/details.component';
import { bachiller_gradoRoutes } from 'app/modules/admin/masters/bachiller_grado/bachiller_grado.routing';
// --------------
import { AcreditadasComponent } from 'app/modules/admin/masters/bachiller_grado/acreditadas/acreditadas.component';
import { AcreditadasListComponent } from 'app/modules/admin/masters/bachiller_grado/acreditadas/list/list.component';
import { AcreditadasDetailsComponent } from 'app/modules/admin/masters/bachiller_grado/acreditadas/details/details.component';

import { ResolucionesComponent } from 'app/modules/admin/masters/bachiller_grado/resoluciones/resoluciones.component';
import { ResolucionesListComponent } from 'app/modules/admin/masters/bachiller_grado/resoluciones/list/list.component';
import { ResolucionesDetailsComponent } from 'app/modules/admin/masters/bachiller_grado/resoluciones/details/details.component';

@NgModule({
    declarations: [
        CronogramasComponent,
        CronogramasListComponent,
        CronogramasDetailsComponent,
        AcreditadasComponent,
        AcreditadasListComponent,
        AcreditadasDetailsComponent,
        ResolucionesComponent,
        ResolucionesListComponent,
        ResolucionesDetailsComponent,
        // CronogramasDialogsComponent,
        // PermissionsComponent,
        // PermissionsListComponent,
        // PermissionsDetailsComponent,
        // RolesComponent,
        // RolesListComponent,
        // RolesDetailsComponent,
        // RolesDialogsComponent,
        // VulneCronogramaDialogComponent
    ],
    imports     : [
        RouterModule.forChild(bachiller_gradoRoutes),
        // AngularDualListBoxModule,
        MatButtonModule,
        FuseAlertModule,
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
        // CKEditorModule
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
export class BachillerGradoModule
{
}