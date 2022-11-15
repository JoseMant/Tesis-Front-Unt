import { Route } from '@angular/router';
// -------------
import { GradosValidadosComponent } from 'app/modules/admin/grados/validados/validados.component';
import { GradosValidadosListComponent } from 'app/modules/admin/grados/validados/list/list.component';
import {GradoValidadoResolver, GradosValidadosResolver } from 'app/modules/admin/grados/validados/validados.resolvers';
import { GradoValidadoDetalleComponent } from './validados/detalle/details.component';
// ------------
import { GradosAprobadosComponent } from 'app/modules/admin/grados/aprobados/aprobados.component';
import { GradosAprobadosListComponent } from 'app/modules/admin/grados/aprobados/list/list.component';
import { GradoAprobadoResolver, GradosAprobadosResolver } from 'app/modules/admin/grados/aprobados/aprobados.resolvers';
import { GradoAprobadoDetalleComponent } from './aprobados/detalle/details.component';
//---------------------------
import { GradosRevalidadosComponent } from 'app/modules/admin/grados/revalidados/revalidados.component';
import { GradosRevalidadosListComponent } from 'app/modules/admin/grados/revalidados/list/list.component';
import {GradoRevalidadoResolver, GradosRevalidadosResolver } from 'app/modules/admin/grados/revalidados/revalidados.resolvers';
import { GradoRevalidadoDetalleComponent } from './revalidados/detalle/details.component';
// -------------
import { GradosValidadosFacultadComponent } from 'app/modules/admin/grados/validados_facultad/validados_facultad.component';
import { GradosValidadosFacultadListComponent } from 'app/modules/admin/grados/validados_facultad/list/list.component';
import {GradoValidadoFacultadResolver, GradosValidadosFacultadResolver } from 'app/modules/admin/grados/validados_facultad/validados_facultad.resolvers';
import { GradoValidadoFacultadDetalleComponent } from './validados_facultad/detalle/details.component';
// ------------
import { GradosAprobadosFacultadComponent } from 'app/modules/admin/grados/aprobados_facultad/aprobados_facultad.component';
import { GradosAprobadosFacultadListComponent } from 'app/modules/admin/grados/aprobados_facultad/list/list.component';
import { GradoAprobadoFacultadResolver, GradosAprobadosFacultadResolver } from 'app/modules/admin/grados/aprobados_facultad/aprobados_facultad.resolvers';
import { GradoAprobadoFacultadDetalleComponent } from './aprobados_facultad/detalle/details.component';
//---------------------------
import { GradosRevalidadosFacultadComponent } from 'app/modules/admin/grados/revalidados_facultad/revalidados_facultad.component';
import { GradosRevalidadosFacultadListComponent } from 'app/modules/admin/grados/revalidados_facultad/list/list.component';
import {GradoRevalidadoFacultadResolver, GradosRevalidadosFacultadResolver } from 'app/modules/admin/grados/revalidados_facultad/revalidados_facultad.resolvers';
import { GradoRevalidadoFacultadDetalleComponent } from './revalidados_facultad/detalle/details.component';

export const gradosRoutes: Route[] = [
    {
      path     : 'validados/escuela',
      component: GradosValidadosComponent,
      resolve  : {
        grados  : GradosValidadosResolver,
      },
      children : [
        {
          path     : '',
          component: GradosValidadosListComponent,
        //   resolve      : {
        //     users  : UsersResolver,
        //   },
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
    
    {
        path     : 'aprobados/escuela',
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
    },
    {
      path     : 'revalidados/escuela',
      component: GradosRevalidadosComponent,
      resolve  : {
        grados  : GradosRevalidadosResolver,
      },
      children : [
        {
          path     : '',
          component: GradosRevalidadosListComponent,
        },
        {
          path         : ':idTramite',
          component    : GradoRevalidadoDetalleComponent,
          resolve      : {
            grado  : GradoRevalidadoResolver,
          },
        }
      ]
    },

    {
      path     : 'validados/facultad',
      component: GradosValidadosFacultadComponent,
      resolve  : {
        grados  : GradosValidadosFacultadResolver,
      },
      children : [
        {
          path     : '',
          component: GradosValidadosFacultadListComponent,
        //   resolve      : {
        //     users  : UsersResolver,
        //   },
        },
        {
          path         : ':idTramite',
          component    : GradoValidadoFacultadDetalleComponent,
          resolve      : {
            grado  : GradoValidadoFacultadResolver,
          },
        }
      ]
    },

    {
      path     : 'aprobados/facultad',
      component: GradosAprobadosFacultadComponent,
      resolve  : {
          grados  : GradosAprobadosFacultadResolver,
      },
      children : [
          {
              path     : '',
              component: GradosAprobadosFacultadListComponent,
          },
          {
              path         : ':idTramite',
              component    : GradoAprobadoFacultadDetalleComponent,
              resolve      : {
                  grado  : GradoAprobadoFacultadResolver,
              },
          }
      ]
  },
  {
    path     : 'revalidados/facultad',
    component: GradosRevalidadosFacultadComponent,
    resolve  : {
      grados  : GradosRevalidadosFacultadResolver,
    },
    children : [
      {
        path     : '',
        component: GradosRevalidadosFacultadListComponent,
      },
      {
        path         : ':idTramite',
        component    : GradoRevalidadoFacultadDetalleComponent,
        resolve      : {
          grado  : GradoRevalidadoFacultadResolver,
        },
      }
    ]
  },
    

];
