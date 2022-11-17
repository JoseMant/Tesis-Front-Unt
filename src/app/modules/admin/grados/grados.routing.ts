import { Route } from '@angular/router';
// -------------
import { GradosEscuelaValidadosComponent } from 'app/modules/admin/grados/escuela/validados/validados.component';
import { GradosEscuelaValidadosListComponent } from 'app/modules/admin/grados/escuela/validados/list/list.component';
import { GradosEscuelaValidadosResolver, GradoEscuelaValidadoResolver } from 'app/modules/admin/grados/escuela/validados/validados.resolvers';
import { GradoEscuelaValidadoDetalleComponent } from './escuela/validados/detalle/details.component';
// ------------
import { GradosEscuelaAprobadosComponent } from 'app/modules/admin/grados/escuela/aprobados/aprobados.component';
import { GradosEscuelaAprobadosListComponent } from 'app/modules/admin/grados/escuela/aprobados/list/list.component';
import { GradosEscuelaAprobadosResolver, GradoEscuelaAprobadoResolver } from 'app/modules/admin/grados/escuela/aprobados/aprobados.resolvers';
import { GradoEscuelaAprobadoDetalleComponent } from './escuela/aprobados/detalle/details.component';
//---------------------------
import { GradosEscuelaRevalidadosComponent } from 'app/modules/admin/grados/escuela/revalidados/revalidados.component';
import { GradosEscuelaRevalidadosListComponent } from 'app/modules/admin/grados/escuela/revalidados/list/list.component';
import { GradosEscuelaRevalidadosResolver, GradoEscuelaRevalidadoResolver } from 'app/modules/admin/grados/escuela/revalidados/revalidados.resolvers';
import { GradoEscuelaRevalidadoDetalleComponent } from './escuela/revalidados/detalle/details.component';
// -------------
// import { GradosValidadosFacultadComponent } from 'app/modules/admin/grados/facultad/validados/validados.component';
// import { GradosValidadosFacultadListComponent } from 'app/modules/admin/grados/facultad/validados/list/list.component';
// import { GradoValidadoFacultadResolver, GradosValidadosFacultadResolver } from 'app/modules/admin/grados/facultad/validados/validados.resolvers';
// import { GradoValidadoFacultadDetalleComponent } from 'app/modules/admin/grados/facultad/validados/detalle/details.component';
// // ------------
// import { GradosAprobadosFacultadComponent } from 'app/modules/admin/grados/facultad/aprobados/aprobados.component';
// import { GradosAprobadosFacultadListComponent } from 'app/modules/admin/grados/facultad/aprobados/list/list.component';
// import { GradoAprobadoFacultadResolver, GradosAprobadosFacultadResolver } from 'app/modules/admin/grados/facultad/aprobados/aprobados.resolvers';
// import { GradoAprobadoFacultadDetalleComponent } from './facultad/aprobados/detalle/details.component';
// //---------------------------
// import { GradosRevalidadosFacultadComponent } from 'app/modules/admin/grados/facultad/revalidados/revalidados.component';
// import { GradosRevalidadosFacultadListComponent } from 'app/modules/admin/grados/facultad/revalidados/list/list.component';
// import {GradoRevalidadoFacultadResolver, GradosRevalidadosFacultadResolver } from 'app/modules/admin/grados/facultad/revalidados/revalidados.resolvers';
// import { GradoRevalidadoFacultadDetalleComponent } from 'app/modules/admin/grados/facultad/revalidados/detalle/details.component';

export const gradosRoutes: Route[] = [
    {
      path     : 'escuela/validados',
      component: GradosEscuelaValidadosComponent,
      resolve  : {
        grados  : GradosEscuelaValidadosResolver,
      },
      children : [
        {
          path     : '',
          component: GradosEscuelaValidadosListComponent,
        //   resolve      : {
        //     users  : UsersResolver,
        //   },
        },
        {
          path         : ':idTramite',
          component    : GradoEscuelaValidadoDetalleComponent,
          resolve      : {
            grado  : GradoEscuelaValidadoResolver,
          },
        }
      ]
    },
    
    {
        path     : 'escuela/aprobados',
        component: GradosEscuelaAprobadosComponent,
        resolve  : {
            grados  : GradosEscuelaAprobadosResolver,
        },
        children : [
            {
                path     : '',
                component: GradosEscuelaAprobadosListComponent,
            },
            {
                path         : ':idTramite',
                component    : GradoEscuelaAprobadoDetalleComponent,
                resolve      : {
                    grado  : GradoEscuelaAprobadoResolver,
                },
            }
        ]
    },
    {
      path     : 'escuela/revalidados',
      component: GradosEscuelaRevalidadosComponent,
      resolve  : {
        grados  : GradosEscuelaRevalidadosResolver,
      },
      children : [
        {
          path     : '',
          component: GradosEscuelaRevalidadosListComponent,
        },
        {
          path         : ':idTramite',
          component    : GradoEscuelaRevalidadoDetalleComponent,
          resolve      : {
            grado  : GradoEscuelaRevalidadoResolver,
          },
        }
      ]
    },
    

];
