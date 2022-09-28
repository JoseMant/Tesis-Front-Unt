import { Route } from '@angular/router';
// import { ConstanciasAsignadosComponent } from 'app/modules/admin/constancias/asignados/asignados.component';
// import { ConstanciasAsignadosListComponent } from 'app/modules/admin/constancias/asignados/list/list.component';
// import { AllConstanciasResolver} from 'app/modules/admin/constancias/validados/validados.resolvers';
// import { ConstanciaAsignadoDetalleComponent } from './asignados/detalle/details.component';
// ------------
import { ConstanciasAprobadosComponent } from 'app/modules/admin/constancias/aprobados/aprobados.component';
import { ConstanciasAprobadosListComponent } from 'app/modules/admin/constancias/aprobados/list/list.component';
import {  ConstanciaAprobadoResolver, ConstanciasAprobadosResolver } from 'app/modules/admin/constancias/aprobados/aprobados.resolvers';
import { ConstanciaAprobadoDetalleComponent } from './aprobados/detalle/details.component';
// -------------
import { ConstanciasValidadosComponent } from 'app/modules/admin/constancias/validados/validados.component';
import { ConstanciasValidadosListComponent } from 'app/modules/admin/constancias/validados/list/list.component';
import { UsersResolver, ConstanciaValidadoResolver, ConstanciasValidadosResolver } from 'app/modules/admin/constancias/validados/validados.resolvers';
import { ConstanciaValidadoDetalleComponent } from './validados/detalle/details.component';
// -------------
import { ConstanciasFirmaURAAComponent } from 'app/modules/admin/constancias/firma_uraa/firma_uraa.component';
import { ConstanciasFirmaURAAListComponent } from 'app/modules/admin/constancias/firma_uraa/list/list.component';
import { ConstanciaFirmaURAAResolver, ConstanciasFirmaURAAResolver } from 'app/modules/admin/constancias/firma_uraa/firma_uraa.resolvers';
import { ConstanciaFirmaURAADetalleComponent } from './firma_uraa/detalle/details.component';

// import { ConstanciasAprobadosComponent } from 'app/modules/admin/constancias/aprobados/aprobados.component';
// import { ConstanciasAprobadosListComponent } from 'app/modules/admin/constancias/aprobados/list/list.component';
// import { ConstanciasAprobadosResolver } from 'app/modules/admin/constancias/aprobados/aprobados.resolvers';
// import { ConstanciasRechazadosComponent } from 'app/modules/admin/constancias/rechazados/rechazados.component';
// import { ConstanciasRechazadosListComponent } from 'app/modules/admin/constancias/rechazados/list/list.component';
// import { ConstanciasRechazadosResolver } from 'app/modules/admin/constancias/rechazados/rechazados.resolvers';

export const constanciasRoutes: Route[] = [
    // {
    //     path     : 'asignados',
    //     component: ConstanciasAsignadosComponent,
    //     resolve  : {
    //         allconstancias  : AllConstanciasResolver,
    //     },
    //     children : [
    //         {
    //             path     : '',
    //             component: ConstanciasAsignadosListComponent,
    //             resolve  : {
    //                 constancias  : ConstanciasAsignadosResolver,
    //             }
    //         },
    //         {
    //             path         : ':idTramite',
    //             component    : ConstanciaAsignadoDetalleComponent,
    //             resolve      : {
    //                 constancia  : ConstanciaAsignadoResolver,
    //             },
    //         }
    //     ]
    // },
    // {
    //     path     : 'asignadas',
    //     component: ConstanciasAprobadosComponent,
    //     resolve  : {
    //         allconstancias  : AllConstanciasResolver,
    //     },
    //     children : [
    //         {
    //             path     : '',
    //             component: ConstanciasAprobadosListComponent,
    //             resolve  : {
    //                 constancias  : ConstanciasAprobadosResolver,
    //             }
    //         },
    //         {
    //             path         : ':idTramite',
    //             component    : ConstanciaAprobadoDetalleComponent,
    //             resolve      : {
    //                 constancia  : ConstanciaAprobadoResolver,
    //             },
    //         }
    //     ]
    // },
    {
        path     : 'asignadas',
        component: ConstanciasAprobadosComponent,
        resolve  : {
            constancias  : ConstanciasAprobadosResolver,
        },
        children : [
            {
                path     : '',
                component: ConstanciasAprobadosListComponent,
            },
            {
                path         : ':idTramite',
                component    : ConstanciaAprobadoDetalleComponent,
                resolve      : {
                    constancia  : ConstanciaAprobadoResolver,
                },
            }
        ]
    },
    {
        path     : 'validadas',
        component: ConstanciasAprobadosComponent,
        resolve  : {
            allconstancias  : ConstanciasValidadosResolver,
        },
        children : [
            {
                path     : '',
                component: ConstanciasValidadosListComponent,
                resolve  : {
                    users    : UsersResolver,
                    constancias  : ConstanciasValidadosResolver,
                }
            },
            {
                path         : ':idTramite',
                component    : ConstanciaValidadoDetalleComponent,
                resolve      : {
                    constancia  : ConstanciaValidadoResolver,
                },
            }
        ]
    },
    {
        path     : 'firma_uraa',
        component: ConstanciasFirmaURAAComponent,
        resolve  : {
            constancias  : ConstanciasFirmaURAAResolver,
        },
        children : [
            {
                path     : '',
                component: ConstanciasFirmaURAAListComponent,
            },
            {
                path         : ':idTramite',
                component    : ConstanciaFirmaURAADetalleComponent,
                resolve      : {
                    constancia  : ConstanciaFirmaURAAResolver,
                },
            }
        ]
    }
];
