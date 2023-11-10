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
import { MAT_DATE_FORMATS, MatRippleModule } from '@angular/material/core';
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
import { SharedModule } from 'app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { QuillModule } from 'ngx-quill';
import * as moment from 'moment';

import { ReporteCarpetasComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/elaboracion_carpetas.component';
import { ReporteCarpetasStatusTramitesListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/status_tramites/list/list.component';
import { ReporteCarpetasExpedientesListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/expedientes/list/list.component';
import { ReporteCarpetasDiplomasListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/diplomas/list.component';
import { ReporteCarpetasLibrosListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/libros/list/list.component';
import { ReporteCarpetasAptasTramitesListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/carpetas_aptas/list.component';


import { ReportesTesoreriaAprobadosComponent } from 'app/modules/admin/reportes/tesoreria/aprobados/aprobados.component';
import { ReportesTesoreriaAprobadosListComponent } from 'app/modules/admin/reportes/tesoreria/aprobados/list/list.component';

import { ReporteTramiteEsperaComponent } from 'app/modules/admin/reportes/tramites/espera/espera.component';
import { ReportesTramitesEsperaListComponent } from 'app/modules/admin/reportes/tramites/espera/list/list.component';

import { ReporteRoutes } from './reportes.routing';

@NgModule({
    declarations: [
        // ELABORACIÓN DE CARPETA
        ReporteCarpetasComponent,
        ReporteCarpetasStatusTramitesListComponent,
        ReporteCarpetasAptasTramitesListComponent,
        ReporteCarpetasExpedientesListComponent,
        ReporteCarpetasDiplomasListComponent,
        ReporteCarpetasLibrosListComponent,
        
        // TESORERÍA
        ReportesTesoreriaAprobadosComponent,
        ReportesTesoreriaAprobadosListComponent,

        //TRAMITES
        ReporteTramiteEsperaComponent,
        ReportesTramitesEsperaListComponent,

    ],
    imports     : [
        RouterModule.forChild(ReporteRoutes),
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
        MatCardModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatDividerModule,
        MatMomentDateModule,
        QuillModule
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
export class ReporteModule
{
}
