import { Route } from '@angular/router';
import { CarpetaComponent } from './carpeta.component';
import { CarpetaResolver } from './carpeta.resolver';

export const CarpetaRoutes: Route[] = [
    {
        path     : ':id',
        component: CarpetaComponent,
        resolve: {
            carpeta:CarpetaResolver
        }
    }
];