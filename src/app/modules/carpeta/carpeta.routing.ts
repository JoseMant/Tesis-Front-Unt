import { Route } from '@angular/router';
import { CarpetaComponent } from 'app/modules/carpeta/carpeta.component';
import { CarpetaResolver } from 'app/modules/carpeta/carpeta.resolver';

export const CarpetaRoutes: Route[] = [
    {
        path     : ':id',
        component: CarpetaComponent,
        resolve: {
            carpeta:CarpetaResolver
        }
    }
];
