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
import { QuillModule } from 'ngx-quill';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CronogramasComponent } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.component';
import { CronogramasListComponent } from 'app/modules/admin/masters/carpeta/cronogramas/list/list.component';
import { CronogramasDetailsComponent } from 'app/modules/admin/masters/carpeta/cronogramas/details/details.component';

import { ResolucionesComponent } from 'app/modules/admin/masters/carpeta/resoluciones/resoluciones.component';
import { ResolucionesListComponent } from 'app/modules/admin/masters/carpeta/resoluciones/list/list.component';
import { ResolucionesDetailsComponent } from 'app/modules/admin/masters/carpeta/resoluciones/details/details.component';
import { ResolucionCronogramasDialogComponent } from 'app/modules/admin/masters/carpeta/resoluciones/dialog/dialog.component';

import { OficiosComponent } from 'app/modules/admin/masters/carpeta/oficios/oficios.component';
import { OficiosListComponent } from 'app/modules/admin/masters/carpeta/oficios/list/list.component';
import { OficiosDetailsComponent } from 'app/modules/admin/masters/carpeta/oficios/details/details.component';

import { carpetaRoutes } from 'app/modules/admin/masters/carpeta/carpeta.routing';

@NgModule({
    declarations: [
        CronogramasComponent,
        CronogramasListComponent,
        CronogramasDetailsComponent,
        
        ResolucionesComponent,
        ResolucionesListComponent,
        ResolucionesDetailsComponent,
        ResolucionCronogramasDialogComponent,

        OficiosComponent,
        OficiosListComponent,
        OficiosDetailsComponent,
    ],
    imports     : [
        RouterModule.forChild(carpetaRoutes),
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
        QuillModule,
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
export class CarpetaModule
{
}