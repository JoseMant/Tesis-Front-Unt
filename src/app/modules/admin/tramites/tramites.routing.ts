import { Route } from '@angular/router';
import { TramitesComponent } from 'app/modules/admin/tramites/tramites.component';
import { TramiteListComponent } from 'app/modules/admin/tramites/formulario/formulario.component';
import { TramiteDetalleComponent } from 'app/modules/admin/tramites/details/details.component';
import { BancosResolver, MotivosResolver, TipoTramitesResolver, TramitesResolver, UnidadesResolver, TramiteResolver  } from 'app/modules/admin/tramites/tramites.resolvers';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { TramiteFisicoListComponent } from 'app/modules/admin/tramites/tramites_fisicos/formulario.component';
import { TramiteOficioListComponent } from 'app/modules/admin/tramites/tramites_secretaria/formulario.component';

export const tramitesRoutes: Route[] = [
    {
        path     : '',
        component: TramitesComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['ADMINISTRADOR', 'SECRETARIA DE URA', 'ALUMNO','SECRETARIA DE DEPARTAMENTO ACADÉMICO', 'SECRETARIA(O) DE ESCUELA', 'SECRETARIA(O) DE SEGUNDA ESPECIALIDAD'],
                redirectTo: 'home'
            }
        },
        resolve  : {
            tipo_tramites : TipoTramitesResolver,
            bancos: BancosResolver,
            unidades: UnidadesResolver,
            motivos: MotivosResolver
        },
        children : [
            {
                path         : 'secretaria',
                component    : TramiteOficioListComponent,
                
            },
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
            },
           
        ]
    }
];
