import { Route } from '@angular/router';
import { CertificadosComponent } from 'app/modules/admin/tramites/tramites.component';
import { CertificadoListComponent } from 'app/modules/admin/tramites/formulario/formulario.component';
import { BancosResolver, MotivosResolver, TramitesResolver, UnidadesResolver  } from 'app/modules/admin/tramites/tramites.resolvers';

export const certificadosRoutes: Route[] = [
    {
        path     : 'tramites',
        component: CertificadosComponent,
        children : [
            {
                path     : '',
                component: CertificadoListComponent,
                resolve  : {
                    tramites       : TramitesResolver,
                    bancos: BancosResolver,
                    unidades: UnidadesResolver,
                    motivos: MotivosResolver
                }
            }
        ]
    }
];
