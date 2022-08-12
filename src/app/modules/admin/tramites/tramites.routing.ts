import { Route } from '@angular/router';
import { TramitesComponent } from 'app/modules/admin/tramites/tramites.component';
import { TramiteListComponent } from 'app/modules/admin/tramites/formulario/formulario.component';
import { TramiteDetalleComponent } from 'app/modules/admin/tramites/detalle/details.component';
import { BancosResolver, MotivosResolver, TipoTramitesResolver, TramitesResolver, UnidadesResolver, TramiteResolver  } from 'app/modules/admin/tramites/tramites.resolvers';

export const tramitesRoutes: Route[] = [
    {
        path     : '',
        component: TramitesComponent,
        children : [
            {
                path     : '',
                component: TramiteListComponent,
                resolve  : {
                    tipo_tramites       : TipoTramitesResolver,
                    bancos: BancosResolver,
                    unidades: UnidadesResolver,
                    motivos: MotivosResolver,
                    tramites: TramitesResolver
                },
            },
            {
                path         : ':id',
                component    : TramiteDetalleComponent,
                resolve      : {
                    tramite  : TramiteResolver,
                    // countries: ContactsCountriesResolver
                },
            }
        ]
    }
];
