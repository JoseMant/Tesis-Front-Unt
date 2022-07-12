import { Route } from '@angular/router';
import { CertificadosComponent } from 'app/modules/admin/tramites/certificados/certificados.component';
import { CertificadoListComponent } from 'app/modules/admin/tramites/certificados/formulario/formulario.component';
import { BancosResolver, TramitesResolver  } from 'app/modules/admin/tramites/certificados/certificados.resolvers';

export const certificadosRoutes: Route[] = [
    {
        path     : 'certificados',
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
