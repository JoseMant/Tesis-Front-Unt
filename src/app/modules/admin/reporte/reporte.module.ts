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

import { GradosEscuelaValidadosComponent } from 'app/modules/admin/reporte/escuela/validados/validados.component';
import { GradosEscuelaValidadosListComponent } from 'app/modules/admin/reporte/escuela/validados/list/list.component';
import { GradoEscuelaValidadoDetalleComponent } from 'app/modules/admin/reporte/escuela/validados/detalle/details.component';

import { GradosURAValidacionesComponent } from 'app/modules/admin/reporte/ura/validaciones/validaciones.component';
import { GradosURAValidacionesListComponent } from 'app/modules/admin/reporte/ura/validaciones/list/list.component';


import { GradosSecretariaValidadosComponent } from 'app/modules/admin/reporte/secretaria/validados/validados.component';
import { GradosSecretariaValidadosListComponent } from 'app/modules/admin/reporte/secretaria/validados/list/list.component';

import { GradoSecretariaValidadoDialogComponent } from 'app/modules/admin/reporte/secretaria/validados/dialog/dialog.component';

import { ReporteRoutes } from './reporte.routing';
import { GradoURAValidacionDetalleComponent } from './ura/validaciones/details/details.component';
import { GradoSecretariaValidadoDetalleComponent } from './secretaria/validados/details/details.component';

@NgModule({
    declarations: [
        // ESCUELA
        GradosEscuelaValidadosComponent,
        GradosEscuelaValidadosListComponent,
        GradoEscuelaValidadoDetalleComponent,
        

        //URA
        GradosURAValidacionesComponent,
        GradosURAValidacionesListComponent,
        GradoURAValidacionDetalleComponent,




        // SECRETARIA GENERAL
        GradosSecretariaValidadosComponent,
        GradosSecretariaValidadosListComponent,
        GradoSecretariaValidadoDialogComponent,
        GradoSecretariaValidadoDetalleComponent

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
