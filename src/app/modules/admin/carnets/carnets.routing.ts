import { Route } from '@angular/router';
import { CarnetsAsignadosComponent } from 'app/modules/admin/carnets/asignados/asignados.component';
import { CarnetsAsignadosListComponent } from 'app/modules/admin/carnets/asignados/list/list.component';
import { AllCarnetsResolver, CarnetAsignadoResolver, CarnetsAsignadosResolver } from 'app/modules/admin/carnets/asignados/asignados.resolvers';
import { CarnetAsignadoDetalleComponent } from './asignados/detalle/details.component';
// ------------
import { CarnetsAprobadosComponent } from 'app/modules/admin/carnets/aprobados/aprobados.component';
import { CarnetsAprobadosListComponent } from 'app/modules/admin/carnets/aprobados/list/list.component';
import {  CarnetAprobadoResolver, CarnetsAprobadosResolver } from 'app/modules/admin/carnets/aprobados/aprobados.resolvers';
import { CarnetAprobadoDetalleComponent } from './aprobados/detalle/details.component';
// -------------
import { CarnetsValidadosComponent } from 'app/modules/admin/carnets/validados/validados.component';
import { CarnetsValidadosListComponent } from 'app/modules/admin/carnets/validados/list/list.component';
import {  CarnetValidadoResolver, CarnetsValidadosResolver } from 'app/modules/admin/carnets/validados/validados.resolvers';
import { CarnetValidadoDetalleComponent } from './validados/detalle/details.component';

// import { CarnetsAprobadosComponent } from 'app/modules/admin/carnets/aprobados/aprobados.component';
// import { CarnetsAprobadosListComponent } from 'app/modules/admin/carnets/aprobados/list/list.component';
// import { CarnetsAprobadosResolver } from 'app/modules/admin/carnets/aprobados/aprobados.resolvers';
// import { CarnetsRechazadosComponent } from 'app/modules/admin/carnets/rechazados/rechazados.component';
// import { CarnetsRechazadosListComponent } from 'app/modules/admin/carnets/rechazados/list/list.component';
// import { CarnetsRechazadosResolver } from 'app/modules/admin/carnets/rechazados/rechazados.resolvers';

export const carnetsRoutes: Route[] = [
    {
        path     : 'asignados',
        component: CarnetsAsignadosComponent,
        resolve  : {
            allcarnets  : AllCarnetsResolver,
        },
        children : [
            {
                path     : '',
                component: CarnetsAsignadosListComponent,
                resolve  : {
                    carnets  : CarnetsAsignadosResolver,
                }
            },
            {
                path         : ':idTramite',
                component    : CarnetAsignadoDetalleComponent,
                resolve      : {
                    carnet  : CarnetAsignadoResolver,
                },
            }
        ]
    },
    {
        path     : 'aprobados',
        component: CarnetsAprobadosComponent,
        resolve  : {
            allcarnets  : AllCarnetsResolver,
        },
        children : [
            {
                path     : '',
                component: CarnetsAprobadosListComponent,
                resolve  : {
                    carnets  : CarnetsAprobadosResolver,
                }
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
        path     : 'validados',
        component: CarnetsValidadosComponent,
        resolve  : {
            allcarnets  : AllCarnetsResolver,
        },
        children : [
            {
                path     : '',
                component: CarnetsValidadosListComponent,
                resolve  : {
                    carnets  : CarnetsValidadosResolver,
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
];
