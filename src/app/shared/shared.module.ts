import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertaComponent } from './alerta/alerta.component';
import { FuseAlertModule } from '@fuse/components/alert';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
    declarations: [
        AlertaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FuseAlertModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AlertaComponent,
        NgxPermissionsModule
    ]
})
export class SharedModule
{
}
