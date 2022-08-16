import { Route } from '@angular/router';
import { CertificadosAsignadosComponent } from 'app/modules/admin/certificados/asignados/asignados.component';
import { CertificadosAsignadosListComponent } from 'app/modules/admin/certificados/asignados/list/list.component';
import { AllCertificadosResolver, CertificadoAsignadoResolver, CertificadosAsignadosResolver } from 'app/modules/admin/certificados/asignados/asignados.resolvers';
import { CertificadoAsignadoDetalleComponent } from './asignados/detalle/details.component';
// ------------
import { CertificadosAprobadosComponent } from 'app/modules/admin/certificados/aprobados/aprobados.component';
import { CertificadosAprobadosListComponent } from 'app/modules/admin/certificados/aprobados/list/list.component';
import {  CertificadoAprobadoResolver, CertificadosAprobadosResolver } from 'app/modules/admin/certificados/aprobados/aprobados.resolvers';
import { CertificadoAprobadoDetalleComponent } from './aprobados/detalle/details.component';
// -------------
import { CertificadosValidadosComponent } from 'app/modules/admin/certificados/validados/validados.component';
import { CertificadosValidadosListComponent } from 'app/modules/admin/certificados/validados/list/list.component';
import {  CertificadoValidadoResolver, CertificadosValidadosResolver } from 'app/modules/admin/certificados/validados/validados.resolvers';
import { CertificadoValidadoDetalleComponent } from './validados/detalle/details.component';

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
        resolve  : {
            allcertificados  : AllCertificadosResolver,
        },
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
            allcertificados  : AllCertificadosResolver,
        },
        children : [
            {
                path     : '',
                component: CertificadosAprobadosListComponent,
                resolve  : {
                    certificados  : CertificadosAprobadosResolver,
                }
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
        path     : 'validados',
        component: CertificadosValidadosComponent,
        resolve  : {
            allcertificados  : AllCertificadosResolver,
        },
        children : [
            {
                path     : '',
                component: CertificadosValidadosListComponent,
                resolve  : {
                    certificados  : CertificadosValidadosResolver,
                }
            },
            {
                path         : ':idTramite',
                component    : CertificadoValidadoDetalleComponent,
                resolve      : {
                    certificado  : CertificadoValidadoResolver,
                },
            }
        ]
    }
];
