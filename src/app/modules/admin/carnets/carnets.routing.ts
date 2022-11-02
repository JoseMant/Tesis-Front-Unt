import { Route } from '@angular/router';

import { CarnetsAprobadosComponent } from 'app/modules/admin/carnets/aprobados/aprobados.component';
import { CarnetsAprobadosListComponent } from 'app/modules/admin/carnets/aprobados/list/list.component';
import {  CarnetAprobadoResolver, CarnetsAprobadosResolver } from 'app/modules/admin/carnets/aprobados/aprobados.resolvers';
import { CarnetAprobadoDetalleComponent } from './aprobados/detalle/details.component';
// -------------
import { CarnetsValidadosComponent } from 'app/modules/admin/carnets/validados/validados.component';
import { CarnetsValidadosListComponent } from 'app/modules/admin/carnets/validados/list/list.component';
import { UsersResolver, CarnetValidadoResolver, CarnetsValidadosResolver } from 'app/modules/admin/carnets/validados/validados.resolvers';
import { CarnetValidadoDetalleComponent } from './validados/detalle/details.component';

// -------------
import { CarnetsDuplicadosComponent } from 'app/modules/admin/carnets/duplicados/duplicados.component';
import { CarnetsDuplicadosListComponent } from 'app/modules/admin/carnets/duplicados/list/list.component';
import {  CarnetDuplicadoResolver, CarnetsDuplicadosResolver } from 'app/modules/admin/carnets/duplicados/duplicados.resolvers';
import { CarnetDuplicadoDetalleComponent } from './duplicados/detalle/details.component';

// -------------
import { CarnetsSolicitadosComponent } from 'app/modules/admin/carnets/solicitados/solicitados.component';
import { CarnetsSolicitadosListComponent } from 'app/modules/admin/carnets/solicitados/list/list.component';
import { CarnetSolicitadoResolver, CarnetsSolicitadosResolver } from 'app/modules/admin/carnets/solicitados/solicitados.resolvers';
import { CarnetSolicitadoDetalleComponent } from './solicitados/detalle/details.component';

// -------------
import { CarnetsRecibidosComponent } from 'app/modules/admin/carnets/recibidos/recibidos.component';
import { CarnetsRecibidosListComponent } from 'app/modules/admin/carnets/recibidos/list/list.component';
import { CarnetRecibidoResolver, CarnetsRecibidosResolver } from 'app/modules/admin/carnets/recibidos/recibidos.resolvers';
import { CarnetRecibidoDetalleComponent } from './recibidos/detalle/details.component';

// -------------
import { NgxPermissionsGuard } from 'ngx-permissions';

export const carnetsRoutes: Route[] = [
    
    {
        path     : 'aprobados',
        component: CarnetsAprobadosComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['ADMINISTRADOR', 'SUBUNIDAD DE MATRÍCULAS-CARNÉS'],
                redirectTo: 'home'
            }
        },
        resolve  : {
            allcarnets  : CarnetsAprobadosResolver,
        },
        children : [
            {
                path     : '',
                component: CarnetsAprobadosListComponent,
            },
            {
                path         : ':idTramite',
                component    : CarnetAprobadoDetalleComponent,
                resolve      : {
                    carnet  : CarnetAprobadoResolver,
                },
            }
        ]
    },
    {
        path     : 'regulares',
        component: CarnetsValidadosComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['ADMINISTRADOR', 'SUBUNIDAD DE MATRÍCULAS-CARNÉS'],
                redirectTo: 'home'
            }
        },
        resolve  : {
            allcarnets  : CarnetsValidadosResolver,
        },
        children : [
            {
                path     : '',
                component: CarnetsValidadosListComponent,
            },
            {
                path         : ':idTramite',
                component    : CarnetValidadoDetalleComponent,
                resolve      : {
                    carnet  : CarnetValidadoResolver,
                },
            }
        ]
    },
    {
        path     : 'duplicados',
        component: CarnetsDuplicadosComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['ADMINISTRADOR', 'SUBUNIDAD DE MATRÍCULAS-CARNÉS'],
                redirectTo: 'home'
            }
        },
        resolve  : {
            allcarnets  : CarnetsDuplicadosResolver,
        },
        children : [
            {
                path     : '',
                component: CarnetsDuplicadosListComponent,
            },
            {
                path         : ':idTramite',
                component    : CarnetDuplicadoDetalleComponent,
                resolve      : {
                    carnet  : CarnetDuplicadoResolver,
                },
            }
        ]
    },
    {
        path     : 'solicitados',
        component: CarnetsSolicitadosComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['ADMINISTRADOR', 'SUBUNIDAD DE MATRÍCULAS-CARNÉS'],
                redirectTo: 'home'
            }
        },
        resolve  : {
            carnets  : CarnetsSolicitadosResolver,
        },
        children : [
            {
                path     : '',
                component: CarnetsSolicitadosListComponent,
            },
            {
                path         : ':idTramite',
                component    : CarnetSolicitadoDetalleComponent,
                resolve      : {
                    carnet  : CarnetSolicitadoResolver,
                },
            }
        ]
    },
    {
        path     : 'recibidos',
        component: CarnetsRecibidosComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['ADMINISTRADOR', 'SUBUNIDAD DE MATRÍCULAS-CARNÉS'],
                redirectTo: 'home'
            }
        },
        resolve  : {
            carnets  : CarnetsRecibidosResolver,
        },
        children : [
            {
                path     : '',
                component: CarnetsRecibidosListComponent,
            },
            {
                path         : ':idTramite',
                component    : CarnetRecibidoDetalleComponent,
                resolve      : {
                    carnet  : CarnetRecibidoResolver,
                },
            }
        ]
    }
];
