import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseAlertModule } from '@fuse/components/alert';
import { NgxPermissionsModule } from 'ngx-permissions';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AlertaComponent } from './alerta/alerta.component';
import { VisorPdfComponent } from './visorPdf/visorPdf.component';
import { RequisitosDialogComponent } from './dialogReq/dialogReq.component';

@NgModule({
    declarations: [
        AlertaComponent,
        VisorPdfComponent,
        RequisitosDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FuseAlertModule,
        MatButtonModule,
        PdfViewerModule,
        MatIconModule,
        MatDialogModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AlertaComponent,
        VisorPdfComponent,
        NgxPermissionsModule
    ]
})
export class SharedModule
{
}
