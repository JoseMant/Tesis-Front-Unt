import { Route } from '@angular/router';
import { TramitesComponent } from 'app/modules/admin/tramites/tramites.component';
import { TramiteListComponent } from 'app/modules/admin/tramites/formulario/formulario.component';
import { TramiteDetalleComponent } from 'app/modules/admin/tramites/details/details.component';
import { BancosResolver, MotivosResolver, TipoTramitesResolver, TramitesResolver, UnidadesResolver, TramiteResolver  } from 'app/modules/admin/tramites/tramites.resolvers';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { TramiteFisicoListComponent } from 'app/modules/admin/tramites/tramites_fisicos/formulario.component';

export const tramitesRoutes: Route[] = [
    {
        path     : '',
        component: TramitesComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['ADMINISTRADOR', 'ALUMNO'],
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
                path     : 'digitales',
                component: TramiteListComponent,
            },
            {
                path     : 'fisicos',
                component: TramiteFisicoListComponent,
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
