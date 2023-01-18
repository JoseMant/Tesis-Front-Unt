import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CodigosPagoComponent } from './codigos_pago.component';
import { RouterModule } from '@angular/router';
import { codigos_pagoRoutes } from './codigos_pago.routing';
@NgModule({
    declarations: [
        CodigosPagoComponent
    ],
    imports     : [
        RouterModule.forChild(codigos_pagoRoutes),
        MatDialogModule,
    ],
    providers   : [],
})
export class CodigosPagoModule
{
}
