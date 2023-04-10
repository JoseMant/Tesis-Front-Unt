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

import { ReporteCarpetasStatusTramitesComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/status_tramites/status_tramites.component';
import { ReporteCarpetasStatusTramitesListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/status_tramites/list/list.component';

// import { ReportesFacultadValidadosComponent } from 'app/modules/admin/reportes/facultad/validados/validados.component';
// import { ReportesFacultadValidadosListComponent } from 'app/modules/admin/reportes/facultad/validados/list/list.component';
// import { ReporteFacultadValidadoDetalleComponent } from 'app/modules/admin/reportes/facultad/validados/detalle/details.component';

// import { ReportesURAValidacionesComponent } from 'app/modules/admin/reportes/ura/validaciones/validaciones.component';
// import { ReportesURAValidacionesListComponent } from 'app/modules/admin/reportes/ura/validaciones/list/list.component';
// import { ReporteURAValidacionDetalleComponent } from './ura/validaciones/details/details.component';

import { ReportesTesoreriaAprobadosComponent } from 'app/modules/admin/reportes/tesoreria/aprobados/aprobados.component';
import { ReportesTesoreriaAprobadosListComponent } from 'app/modules/admin/reportes/tesoreria/aprobados/list/list.component';


// import { ReportesSecretariaValidadosComponent } from 'app/modules/admin/reportes/secretaria/validados/validados.component';
// import { ReportesSecretariaValidadosListComponent } from 'app/modules/admin/reportes/secretaria/validados/list/list.component';
// import { ReporteSecretariaValidadoDialogComponent } from 'app/modules/admin/reportes/secretaria/validados/dialog/dialog.component';
// import { ReporteSecretariaValidadoDetalleComponent } from './secretaria/validados/details/details.component';

import { ReporteRoutes } from './reportes.routing';

@NgModule({
    declarations: [
        // ESCUELA
        ReporteCarpetasStatusTramitesComponent,
        ReporteCarpetasStatusTramitesListComponent,
        
        // FACULTAD
        // ReportesFacultadValidadosComponent,
        // ReportesFacultadValidadosListComponent,
        // ReporteFacultadValidadoDetalleComponent,
        
        // // URA
        // ReportesURAValidacionesComponent,
        // ReportesURAValidacionesListComponent,
        // ReporteURAValidacionDetalleComponent,
        
        // // TESORERÍA
        ReportesTesoreriaAprobadosComponent,
        ReportesTesoreriaAprobadosListComponent,



        // SECRETARIA GENERAL
        // ReportesSecretariaValidadosComponent,
        // ReportesSecretariaValidadosListComponent,
        // ReporteSecretariaValidadoDialogComponent,
        // ReporteSecretariaValidadoDetalleComponent

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
