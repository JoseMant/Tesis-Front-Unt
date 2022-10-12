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
// import { CronogramasDialogsComponent } from 'app/modules/admin/masters/bachiller_grado/cronogramas/dialog/dialog.component';
// import { cronogramasRoutes, permissionsRoutes, rolesRoutes } from 'app/modules/admin/masters/bachiller_grado/bachiller_grado.routing';
// import { PermissionsComponent } from 'app/modules/admin/masters/bachiller_grado/permissions/permissions.component';
// import { PermissionsListComponent } from 'app/modules/admin/masters/bachiller_grado/permissions/list/permission.component';
// import { PermissionsDetailsComponent } from 'app/modules/admin/masters/bachiller_grado/permissions/details/details.component';
// import { RolesComponent } from 'app/modules/admin/masters/bachiller_grado/roles/roles.component';
// import { RolesListComponent } from 'app/modules/admin/masters/bachiller_grado/roles/list/role.component';
// import { RolesDetailsComponent } from 'app/modules/admin/masters/bachiller_grado/roles/details/details.component';
// import { RolesDialogsComponent } from 'app/modules/admin/masters/bachiller_grado/roles/dialog/dialog.component';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { VulneCronogramaDialogComponent } from 'app/modules/admin/masters/bachiller_grado/cronogramas/dialogConsult/dialogConsult.component';

@NgModule({
    declarations: [
        CronogramasComponent,
        CronogramasListComponent,
        CronogramasDetailsComponent,
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