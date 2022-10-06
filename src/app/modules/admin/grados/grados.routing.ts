import { Route } from '@angular/router';
// import { GradosAsignadosComponent } from 'app/modules/admin/grados/asignados/asignados.component';
// import { GradosAsignadosListComponent } from 'app/modules/admin/grados/asignados/list/list.component';
// import { GradoAsignadoResolver, GradosAsignadosResolver } from 'app/modules/admin/grados/asignados/asignados.resolvers';
// import { GradoAsignadoDetalleComponent } from './asignados/detalle/details.component';
// ------------
import { GradosAprobadosComponent } from 'app/modules/admin/grados/aprobados/aprobados.component';
import { GradosAprobadosListComponent } from 'app/modules/admin/grados/aprobados/list/list.component';
import { GradoAprobadoResolver, GradosAprobadosResolver } from 'app/modules/admin/grados/aprobados/aprobados.resolvers';
import { GradoAprobadoDetalleComponent } from './aprobados/detalle/details.component';
// -------------
import { GradosValidadosComponent } from 'app/modules/admin/grados/validados/validados.component';
import { GradosValidadosListComponent } from 'app/modules/admin/grados/validados/list/list.component';
import { UsersResolver, GradoValidadoResolver, GradosValidadosResolver } from 'app/modules/admin/grados/validados/validados.resolvers';
import { GradoValidadoDetalleComponent } from './validados/detalle/details.component';
//---------------------------
// import { GradosFirmaURAAComponent } from 'app/modules/admin/grados/firma_uraa/firma_uraa.component';
// import { GradosFirmaURAAListComponent } from 'app/modules/admin/grados/firma_uraa/list/list.component';
// import { GradoFirmaURAAResolver, GradosFirmaURAAResolver } from 'app/modules/admin/grados/firma_uraa/firma_uraa.resolvers';
// import { GradoFirmaURAADetalleComponent } from './firma_uraa/detalle/details.component';
//-----------------------------
// import { GradosFirmaDecanoComponent } from 'app/modules/admin/grados/firma_decano/firma_decano.component';
// import { GradosFirmaDecanoListComponent } from 'app/modules/admin/grados/firma_decano/list/list.component';
// import { GradoFirmaDecanoResolver, GradosFirmaDecanoResolver } from 'app/modules/admin/grados/firma_decano/firma_decano.resolvers';
// import { GradoFirmaDecanoDetalleComponent } from './firma_decano/detalle/details.component';

export const gradosRoutes: Route[] = [
    {
      path     : 'validados',
      component: GradosValidadosComponent,
      resolve  : {
        grados  : GradosValidadosResolver,
      },
      children : [
        {
          path     : '',
          component: GradosValidadosListComponent,
          resolve      : {
            users  : UsersResolver,
          },
        },
        {
          path         : ':idTramite',
          component    : GradoValidadoDetalleComponent,
          resolve      : {
            grado  : GradoValidadoResolver,
          },
        }
      ]
    },
    // {
    //     path     : 'asignados',
    //     component: GradosAsignadosComponent,
    //     resolve  : {
    //         grados  : GradosAsignadosResolver,
    //     },
    //     children : [
    //         {
    //             path     : '',
    //             component: GradosAsignadosListComponent,
    //         },
    //         {
    //             path         : ':idTramite',
    //             component    : GradoAsignadoDetalleComponent,
    //             resolve      : {
    //                 grado  : GradoAsignadoResolver,
    //             },
    //         }
    //     ]
    // },
    {
        path     : 'aprobados',
        component: GradosAprobadosComponent,
        resolve  : {
            grados  : GradosAprobadosResolver,
        },
        children : [
            {
                path     : '',
                component: GradosAprobadosListComponent,
            },
            {
                path         : ':idTramite',
                component    : GradoAprobadoDetalleComponent,
                resolve      : {
                    grado  : GradoAprobadoResolver,
                },
            }
        ]
    }
    // {
    //     path     : 'firma_uraa',
    //     component: GradosFirmaURAAComponent,
    //     resolve  : {
    //         grados  : GradosFirmaURAAResolver,
    //     },
    //     children : [
    //         {
    //             path     : '',
    //             component: GradosFirmaURAAListComponent,
    //         },
    //         {
    //             path         : ':idTramite',
    //             component    : GradoFirmaURAADetalleComponent,
    //             resolve      : {
    //                 grado  : GradoFirmaURAAResolver,
    //             },
    //         }
    //     ]
    // },
    // {
    //     path     : 'firma_decano',
    //     component: GradosFirmaDecanoComponent,
    //     resolve  : {
    //         grados  : GradosFirmaDecanoResolver,
    //     },
    //     children : [
    //         {
    //             path     : '',
    //             component: GradosFirmaDecanoListComponent,
    //         },
    //         {
    //             path         : ':idTramite',
    //             component    : GradoFirmaDecanoDetalleComponent,
    //             resolve      : {
    //                 grado  : GradoFirmaDecanoResolver,
    //             },
    //         }
    //     ]
    // }

];
