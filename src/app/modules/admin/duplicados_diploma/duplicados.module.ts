import { NgModule } from '@angular/core';
import { MAT_DATE_FORMATS, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import * as moment from 'moment';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from 'app/shared/shared.module';

import { duplicadosRoutes } from 'app/modules/admin/duplicados_diploma/duplicados.routing';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
// -----------------------------------------------------------------------------------------
import { DuplicadosValidadosComponent } from './secretaria/validados/validados.component';
import { ValidarDuplicadosListComponent } from './secretaria/validados/list/list.component';
import { ValidarDuplicadoDetalleComponent } from './secretaria/validados/details/details.component';
// ----------------------------------------------------------------------------------------------
import { DuplicadosAprobadosListComponent } from './secretaria/aprobados/list/list.component';
import { DuplicadosAprobadosComponent } from './secretaria/aprobados/aprobados.component';
import { DuplicadoAprobadoDetalleComponent } from './secretaria/aprobados/details/details.component';
// ------------------------------------------------------------------------------------------
import { DuplicadosValidadosUraComponent } from './ura/validados/validados.component';
import { DuplicadosValidacionUraListComponent } from './ura/validados/list/list.component';
import { DuplicadoUraDetalleComponent } from './ura/validados/details/details.component';
// ------------------------------------------------------------------------------------------
import { DuplicadosDatosDiplomaComponent } from './ura/diplomas/diplomas.component';
import { DuplicadosDatosDiplomaListComponent } from './ura/diplomas/list/list.component';
import { DuplicadoDatosDiplomaDetalleComponent } from './ura/diplomas/details/details.component';
// ------------------------------------------------------------------------------------------
import { DuplicadosRevalidadosComponent } from './secretaria/revalidados/revalidados.component';
import { DuplicadosRevalidadosListComponent } from './secretaria/revalidados/list/list.component';
import { DuplicadoRevalidadosDetalleComponent } from './secretaria/revalidados/details/details.component';


@NgModule({
    declarations: [
        DuplicadosValidadosComponent,
        ValidarDuplicadosListComponent,
        ValidarDuplicadoDetalleComponent,
        
        DuplicadosAprobadosComponent,
        DuplicadosAprobadosListComponent,
        DuplicadoAprobadoDetalleComponent,

        DuplicadosValidadosUraComponent,
        DuplicadosValidacionUraListComponent,
        DuplicadoUraDetalleComponent,

        DuplicadosDatosDiplomaComponent,
        DuplicadosDatosDiplomaListComponent,
        DuplicadoDatosDiplomaDetalleComponent,

        DuplicadosRevalidadosComponent,
        DuplicadosRevalidadosListComponent,
        DuplicadoRevalidadosDetalleComponent,
    ],
    imports     : [
        RouterModule.forChild(duplicadosRoutes),
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
        MatCardModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatProgressSpinnerModule,
        QuillModule.forRoot(),
        SharedModule
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
export class DuplicadosModule
{
}