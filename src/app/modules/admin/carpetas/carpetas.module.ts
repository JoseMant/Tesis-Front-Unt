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


import { CarpetasSecretariaValidadosComponent } from 'app/modules/admin/carpetas/secretaria/validados/validados.component';
import { CarpetasSecretariaValidadosListComponent } from 'app/modules/admin/carpetas/secretaria/validados/list/list.component';
import { CarpetasSecretariaValidadosDetalleComponent } from 'app/modules/admin/carpetas/secretaria/validados/details/details.component';
import { CarpetaSecretariaValidadosDialogComponent } from 'app/modules/admin/carpetas/secretaria/validados/dialog/dialog.component';

import { CarpetasFirmasDecanoComponent } from 'app/modules/admin/carpetas/firmas/decano/decano.component';
import { CarpetasFirmasDecanoListComponent } from 'app/modules/admin/carpetas/firmas/decano/list/list.component';

import { CarpetasFirmasRectorComponent } from 'app/modules/admin/carpetas/firmas/rector/rector.component';
import { CarpetasFirmasRectorListComponent } from 'app/modules/admin/carpetas/firmas/rector/list/list.component';

import { CarpetasFirmasSecretariaGeneralComponent } from 'app/modules/admin/carpetas/firmas/secretaria_general/secretaria_general.component';
import { CarpetasFirmasSecretariaGeneralListComponent } from 'app/modules/admin/carpetas/firmas/secretaria_general/list/list.component';

import { CarpetasURAPendientesComponent } from 'app/modules/admin/carpetas/ura/pendientes/pendientes.component';
import { CarpetasURAPendientesListComponent } from 'app/modules/admin/carpetas/ura/pendientes/list/list.component';
import { CarpetaURAPendienteDialogComponent } from 'app/modules/admin/carpetas/ura/pendientes/dialog/dialog.component';

import { GradosSecretariaObservadosComponent } from 'app/modules/admin/carpetas/secretaria/observados/observados.component';
import { GradosSecretariaObservadosListComponent } from 'app/modules/admin/carpetas/secretaria/observados/list/list.component';
import { GradoSecretariaObservadoDetalleComponent } from 'app/modules/admin/carpetas/secretaria/observados/details/details.component';

import { carpetasRoutes } from 'app/modules/admin/carpetas/carpetas.routing';

@NgModule({
    declarations: [        
        // SECRETARIA GENERAL
        CarpetasSecretariaValidadosComponent,
        CarpetasSecretariaValidadosListComponent,
        CarpetasSecretariaValidadosDetalleComponent,
        CarpetaSecretariaValidadosDialogComponent,

        CarpetasFirmasDecanoComponent,
        CarpetasFirmasDecanoListComponent,

        CarpetasFirmasRectorComponent,
        CarpetasFirmasRectorListComponent,

        CarpetasFirmasSecretariaGeneralComponent,
        CarpetasFirmasSecretariaGeneralListComponent,

        CarpetasURAPendientesComponent,
        CarpetasURAPendientesListComponent,        
        CarpetaURAPendienteDialogComponent,

        GradosSecretariaObservadosComponent,
        GradosSecretariaObservadosListComponent,
        GradoSecretariaObservadoDetalleComponent
    ],
    imports     : [
        RouterModule.forChild(carpetasRoutes),
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
export class CarpetasModule
{
}
