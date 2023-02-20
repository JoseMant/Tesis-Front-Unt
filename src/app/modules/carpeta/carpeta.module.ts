import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { FuseCardModule } from '@fuse/components/card';
import { CarpetaComponent } from 'app/modules/carpeta/carpeta.component';
import { CarpetaRoutes } from 'app/modules/carpeta/carpeta.routing';

@NgModule({
    declarations: [
        CarpetaComponent
    ],
    imports     : [
        RouterModule.forChild(CarpetaRoutes),
        MatButtonModule,
        MatIconModule,
        MatInputModule,
    ]
})
export class CarpetaModule
{
}