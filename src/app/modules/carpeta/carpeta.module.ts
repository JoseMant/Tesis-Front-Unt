import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { CarpetaComponent } from 'app/modules/carpeta/carpeta.component';
import { CarpetaRoutes } from 'app/modules/carpeta/carpeta.routing';

@NgModule({
    declarations: [
        CarpetaComponent
    ],
    imports     : [
        RouterModule.forChild(CarpetaRoutes),
        MatButtonModule,
        MatTooltipModule,
        MatTableModule,
        FuseCardModule,
        SharedModule
    ]
})
export class CarpetaModule
{
}
