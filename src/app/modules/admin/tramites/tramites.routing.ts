import { Route } from '@angular/router';
import { CertificadosComponent } from 'app/modules/admin/tramites/tramites.component';
import { CertificadoListComponent } from 'app/modules/admin/tramites/formulario/formulario.component';
import { BancosResolver, TramitesResolver  } from 'app/modules/admin/tramites/tramites.resolvers';

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
                    //bancos: BancosResolver
                }
            }
        ]
    }
];
