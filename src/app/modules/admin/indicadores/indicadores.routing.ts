import { Route } from '@angular/router';
import { IndicadorComponent } from 'app/modules/admin/indicadores/indicadores.component';
import { IndicadoresResolver } from 'app/modules/admin/indicadores/indicadores.resolvers';

export const indicadoresRoutes: Route[] = [
    {
        path     : '',
        component: IndicadorComponent,
        resolve  : {
            data: IndicadoresResolver
        }
    }
];
