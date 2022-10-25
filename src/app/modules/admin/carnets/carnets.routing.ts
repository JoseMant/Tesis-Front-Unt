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
import { CarnetsRenovacionesComponent } from 'app/modules/admin/carnets/renovaciones/renovaciones.component';
import { CarnetsRenovacionesListComponent } from 'app/modules/admin/carnets/renovaciones/list/list.component';
import {  CarnetRenovacionResolver, CarnetsRenovacionesResolver } from 'app/modules/admin/carnets/renovaciones/renovaciones.resolvers';
// import { CarnetRenovacionDetalleComponent } from './renovaciones/detalle/details.component';

export const carnetsRoutes: Route[] = [
    
    {
        path     : 'aprobados',
        component: CarnetsAprobadosComponent,
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
        resolve  : {
            allcarnets  : CarnetsValidadosResolver,
        },
        children : [
            {
                path     : '',
                component: CarnetsValidadosListComponent,
                resolve  : {
                    users  : UsersResolver,
                }
            },
            {
                path         : ':idTramite',
                component    : CarnetValidadoDetalleComponent,
                resolve      : {
                    carnet  : CarnetValidadoResolver,
                },
            }
        ]
    }
    ,
    {
        path     : 'duplicados',
        component: CarnetsDuplicadosComponent,
        resolve  : {
            allcarnets  : CarnetsDuplicadosResolver,
        },
        children : [
            {
                path     : '',
                component: CarnetsDuplicadosListComponent,
                resolve  : {
                    users  : UsersResolver,
                }
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
        path     : 'renovaciones',
        component: CarnetsRenovacionesComponent,
        resolve  : {
            allcarnets  : CarnetsRenovacionesResolver,
        },
        children : [
            {
                path     : '',
                component: CarnetsRenovacionesListComponent,
                resolve  : {
                    users  : UsersResolver,
                }
            },
            {
                path         : ':idTramite',
                component    : CarnetDuplicadoDetalleComponent,
                resolve      : {
                    carnet  : CarnetDuplicadoResolver,
                },
            }
        ]
    }
];
