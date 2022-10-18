import { Route } from '@angular/router';
import { CertificadosAsignadosComponent } from 'app/modules/admin/certificados/asignados/asignados.component';
import { CertificadosAsignadosListComponent } from 'app/modules/admin/certificados/asignados/list/list.component';
import { CertificadoAsignadoResolver, CertificadosAsignadosResolver } from 'app/modules/admin/certificados/asignados/asignados.resolvers';
import { CertificadoAsignadoDetalleComponent } from './asignados/detalle/details.component';
// ------------
import { CertificadosAprobadosComponent } from 'app/modules/admin/certificados/aprobados/aprobados.component';
import { CertificadosAprobadosListComponent } from 'app/modules/admin/certificados/aprobados/list/list.component';
import { CertificadoAprobadoResolver, CertificadosAprobadosResolver } from 'app/modules/admin/certificados/aprobados/aprobados.resolvers';
import { CertificadoAprobadoDetalleComponent } from './aprobados/detalle/details.component';
// -------------
import { CertificadosValidadosComponent } from 'app/modules/admin/certificados/validados/validados.component';
import { CertificadosValidadosListComponent } from 'app/modules/admin/certificados/validados/list/list.component';
import { UsersResolver, CertificadoValidadoResolver, CertificadosValidadosResolver } from 'app/modules/admin/certificados/validados/validados.resolvers';
import { CertificadoValidadoDetalleComponent } from './validados/detalle/details.component';

import { CertificadosFirmaURAAComponent } from 'app/modules/admin/certificados/firma_uraa/firma_uraa.component';
import { CertificadosFirmaURAAListComponent } from 'app/modules/admin/certificados/firma_uraa/list/list.component';
import { CertificadoFirmaURAAResolver, CertificadosFirmaURAAResolver } from 'app/modules/admin/certificados/firma_uraa/firma_uraa.resolvers';
import { CertificadoFirmaURAADetalleComponent } from './firma_uraa/detalle/details.component';

import { CertificadosFirmaDecanoComponent } from 'app/modules/admin/certificados/firma_decano/firma_decano.component';
import { CertificadosFirmaDecanoListComponent } from 'app/modules/admin/certificados/firma_decano/list/list.component';
import { CertificadoFirmaDecanoResolver, CertificadosFirmaDecanoResolver } from 'app/modules/admin/certificados/firma_decano/firma_decano.resolvers';
import { CertificadoFirmaDecanoDetalleComponent } from './firma_decano/detalle/details.component';


import { CertificadosPendientesComponent } from 'app/modules/admin/certificados/pendientes/pendientes.component';
import { CertificadosPendientesListComponent } from 'app/modules/admin/certificados/pendientes/list/list.component';
import { CertificadoPendienteResolver, CertificadosPendientesResolver } from 'app/modules/admin/certificados/pendientes/pendientes.resolvers';
// import { CertificadoPendienteDetalleComponent } from './firma_decano/detalle/details.component';
// import { CertificadosRechazadosComponent } from 'app/modules/admin/certificados/rechazados/rechazados.component';
// import { CertificadosRechazadosListComponent } from 'app/modules/admin/certificados/rechazados/list/list.component';
// import { CertificadosRechazadosResolver } from 'app/modules/admin/certificados/rechazados/rechazados.resolvers';

export const certificadosRoutes: Route[] = [
    {
      path     : 'validados',
      component: CertificadosValidadosComponent,
      resolve  : {
        certificados  : CertificadosValidadosResolver,
      },
      children : [
        {
          path     : '',
          component: CertificadosValidadosListComponent,
          resolve      : {
            users  : UsersResolver,
          },
        },
        {
          path         : ':idTramite',
          component    : CertificadoValidadoDetalleComponent,
          resolve      : {
            certificado  : CertificadoValidadoResolver,
          },
        }
      ]
    },
    {
        path     : 'asignados',
        component: CertificadosAsignadosComponent,
        resolve  : {
            certificados  : CertificadosAsignadosResolver,
        },
        children : [
            {
                path     : '',
                component: CertificadosAsignadosListComponent,
            },
            {
                path         : ':idTramite',
                component    : CertificadoAsignadoDetalleComponent,
                resolve      : {
                    certificado  : CertificadoAsignadoResolver,
                },
            }
        ]
    },
    {
        path     : 'aprobados',
        component: CertificadosAprobadosComponent,
        resolve  : {
            certificados  : CertificadosAprobadosResolver,
        },
        children : [
            {
                path     : '',
                component: CertificadosAprobadosListComponent,
            },
            {
                path         : ':idTramite',
                component    : CertificadoAprobadoDetalleComponent,
                resolve      : {
                    certificado  : CertificadoAprobadoResolver,
                },
            }
        ]
    },
    {
        path     : 'firma_uraa',
        component: CertificadosFirmaURAAComponent,
        resolve  : {
            certificados  : CertificadosFirmaURAAResolver,
        },
        children : [
            {
                path     : '',
                component: CertificadosFirmaURAAListComponent,
            },
            {
                path         : ':idTramite',
                component    : CertificadoFirmaURAADetalleComponent,
                resolve      : {
                    certificado  : CertificadoFirmaURAAResolver,
                },
            }
        ]
    },
    {
        path     : 'firma_decano',
        component: CertificadosFirmaDecanoComponent,
        resolve  : {
            certificados  : CertificadosFirmaDecanoResolver,
        },
        children : [
            {
                path     : '',
                component: CertificadosFirmaDecanoListComponent,
            },
            {
                path         : ':idTramite',
                component    : CertificadoFirmaDecanoDetalleComponent,
                resolve      : {
                    certificado  : CertificadoFirmaDecanoResolver,
                },
            }
        ]
    },
    {
        path     : 'pendientes',
        component: CertificadosPendientesComponent,
        resolve  : {
            certificados  : CertificadosPendientesResolver,
        },
        children : [
            {
                path     : '',
                component: CertificadosPendientesListComponent,
            }



            // {
            //     path         : ':idTramite',
            //     component    : CertificadoFirmaDecanoDetalleComponent,
            //     resolve      : {
            //         certificado  : CertificadoFirmaDecanoResolver,
            //     },
            // }
        ]
    }

];
