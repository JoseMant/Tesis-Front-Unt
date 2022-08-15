import { Route } from '@angular/router';
import { CertificadosAsignadosComponent } from 'app/modules/admin/certificados/asignados/asignados.component';
import { CertificadosAsignadosListComponent } from 'app/modules/admin/certificados/asignados/list/list.component';
import { CertificadosAsignadosResolver } from 'app/modules/admin/certificados/asignados/asignados.resolvers';
import { CertificadoAsignadoResolver } from 'app/modules/admin/certificados/asignados/asignados.resolvers';
import { CertificadoDetalleComponent } from 'app/modules/admin/certificados/asignados/detalle/details.component';

// import { CertificadosAprobadosComponent } from 'app/modules/admin/certificados/aprobados/aprobados.component';
// import { CertificadosAprobadosListComponent } from 'app/modules/admin/certificados/aprobados/list/list.component';
// import { CertificadosAprobadosResolver } from 'app/modules/admin/certificados/aprobados/aprobados.resolvers';
// import { CertificadosRechazadosComponent } from 'app/modules/admin/certificados/rechazados/rechazados.component';
// import { CertificadosRechazadosListComponent } from 'app/modules/admin/certificados/rechazados/list/list.component';
// import { CertificadosRechazadosResolver } from 'app/modules/admin/certificados/rechazados/rechazados.resolvers';

export const certificadosRoutes: Route[] = [
    {
        path     : 'asignados',
        component: CertificadosAsignadosComponent,
        children : [
            {
                path     : '',
                component: CertificadosAsignadosListComponent,
                resolve  : {
                    certificados  : CertificadosAsignadosResolver,
                }
            },
            {
                path         : ':idTramite',
                component    : CertificadoDetalleComponent,
                resolve      : {
                    certificado  : CertificadoAsignadoResolver,
                },
            }
        ]
    }
    // {
    //     path     : 'aprobados',
    //     component: CertificadosAprobadosComponent,
    //     children : [
    //         {
    //             path     : '',
    //             component: CertificadosAprobadosListComponent,
    //             resolve  : {
    //                 certificados  : CertificadosAprobadosResolver,
    //             }
    //         }
    //     ]
    // },
    // {
    //     path     : 'rechazados',
    //     component: CertificadosRechazadosComponent,
    //     children : [
    //         {
    //             path     : '',
    //             component: CertificadosRechazadosListComponent,
    //             resolve  : {
    //                 certificados  : CertificadosRechazadosResolver,
    //             }
    //         }
    //     ]
    // }
];
