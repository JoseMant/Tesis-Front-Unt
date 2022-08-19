import { Route } from '@angular/router';
import { TramitesComponent } from 'app/modules/admin/tramites/tramites.component';
import { TramiteListComponent } from 'app/modules/admin/tramites/formulario/formulario.component';
import { TramiteDetalleComponent } from 'app/modules/admin/tramites/details/details.component';
import { BancosResolver, MotivosResolver, TipoTramitesResolver, TramitesResolver, UnidadesResolver, TramiteResolver  } from 'app/modules/admin/tramites/tramites.resolvers';
import { NgxPermissionsGuard } from 'ngx-permissions';

export const tramitesRoutes: Route[] = [
    {
        path     : '',
        component: TramitesComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['ADMIN', 'ALUMNO'],
                redirectTo: 'home'
            }
        },
        resolve  : {
            tramites : TramitesResolver,
            tipo_tramites : TipoTramitesResolver,
            bancos: BancosResolver,
            unidades: UnidadesResolver,
            motivos: MotivosResolver
        },
        children : [
            {
                path     : '',
                component: TramiteListComponent,
                // resolve  : {
                    // tipo_tramites       : TipoTramitesResolver,
                    // bancos: BancosResolver,
                    // unidades: UnidadesResolver,
                    // motivos: MotivosResolver
                // },
            },
            {
                path         : ':id',
                component    : TramiteDetalleComponent,
                resolve      : {
                    tramite  : TramiteResolver
                    // countries: ContactsCountriesResolver
                },
            }
        ]
    }
];
