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
//---------------------------
import { GradosEscuelaDiplomasComponent } from 'app/modules/admin/grados/escuela/diplomas/diplomas.component';
import { GradosEscuelaDiplomasListComponent } from 'app/modules/admin/grados/escuela/diplomas/list/list.component';
import { GradosEscuelaDiplomasResolver, GradoEscuelaDiplomaResolver, ModalidadesSustentacionResolver, ProgramasEstudiosResolver } from 'app/modules/admin/grados/escuela/diplomas/diplomas.resolvers';
import { GradoEscuelaDiplomaDetalleComponent } from 'app/modules/admin/grados/escuela/diplomas/detalle/details.component';
// -------------
import { GradosFacultadValidadosComponent } from 'app/modules/admin/grados/facultad/validados/validados.component';
import { GradosFacultadValidadosListComponent } from 'app/modules/admin/grados/facultad/validados/list/list.component';
import { GradoFacultadValidadoResolver, GradosFacultadValidadosResolver } from 'app/modules/admin/grados/facultad/validados/validados.resolvers';
import { GradoFacultadValidadoDetalleComponent } from 'app/modules/admin/grados/facultad/validados/detalle/details.component';
// // ------------
import { GradosFacultadAprobadosComponent } from 'app/modules/admin/grados/facultad/aprobados/aprobados.component';
import { GradosFacultadAprobadosListComponent } from 'app/modules/admin/grados/facultad/aprobados/list/list.component';
import { GradoFacultadAprobadoResolver, GradosFacultadAprobadosResolver } from 'app/modules/admin/grados/facultad/aprobados/aprobados.resolvers';
import { GradoFacultadAprobadoDetalleComponent } from './facultad/aprobados/detalle/details.component';
// //---------------------------
import { GradosFacultadRevalidadosComponent } from 'app/modules/admin/grados/facultad/revalidados/revalidados.component';
import { GradosFacultadRevalidadosListComponent } from 'app/modules/admin/grados/facultad/revalidados/list/list.component';
import { GradosFacultadRevalidadosResolver, GradoFacultadRevalidadoResolver } from 'app/modules/admin/grados/facultad/revalidados/revalidados.resolvers';
import { GradoFacultadRevalidadoDetalleComponent } from 'app/modules/admin/grados/facultad/revalidados/detalle/details.component';
//---------------------------
import { GradosFacultadDiplomasComponent } from 'app/modules/admin/grados/facultad/diplomas/diplomas.component';
import { GradosFacultadDiplomasListComponent } from 'app/modules/admin/grados/facultad/diplomas/list/list.component';
import { GradosFacultadDiplomasResolver, GradoFacultadDiplomaResolver } from 'app/modules/admin/grados/facultad/diplomas/diplomas.resolvers';
import { GradoFacultadDiplomaDetalleComponent } from 'app/modules/admin/grados/facultad/diplomas/detalle/details.component';
// //---------------------------
import { GradosURAValidacionesComponent } from 'app/modules/admin/grados/ura/validaciones/validaciones.component';
import { GradosURAValidacionesListComponent } from 'app/modules/admin/grados/ura/validaciones/list/list.component';
import { GradosURAValidacionesResolver, GradoURAValidacionResolver } from 'app/modules/admin/grados/ura/validaciones/validaciones.resolvers';
import { GradoURAValidacionDetalleComponent } from 'app/modules/admin/grados/ura/validaciones/details/details.component';
//---------------------------
import { GradosURADiplomasComponent } from 'app/modules/admin/grados/ura/diplomas/diplomas.component';
import { GradosURADiplomasListComponent } from 'app/modules/admin/grados/ura/diplomas/list/list.component';
import { GradosURADiplomasResolver, GradoURADiplomaResolver } from 'app/modules/admin/grados/ura/diplomas/diplomas.resolvers';
import { GradoURADiplomaDetalleComponent } from 'app/modules/admin/grados/ura/diplomas/detalle/details.component';

import { NgxPermissionsGuard } from 'ngx-permissions';


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
    {
      path     : 'escuela/diplomas',
      component: GradosEscuelaDiplomasComponent,
      resolve  : {
        grados  : GradosEscuelaDiplomasResolver,
      },
      children : [
        {
          path     : '',
          component: GradosEscuelaDiplomasListComponent,
        },
        {
          path         : ':idTramite',
          component    : GradoEscuelaDiplomaDetalleComponent,
          resolve      : {
            grado  : GradoEscuelaDiplomaResolver,
            modalidades: ModalidadesSustentacionResolver,
            programas_estudios: ProgramasEstudiosResolver,
          },
        }
      ]
    },
    {
      path     : 'facultad/validados',
      component: GradosFacultadValidadosComponent,
      resolve  : {
        grados  : GradosFacultadValidadosResolver,
      },
      children : [
        {
          path     : '',
          component: GradosFacultadValidadosListComponent,
        },
        {
          path         : ':idTramite',
          component    : GradoFacultadValidadoDetalleComponent,
          resolve      : {
            grado  : GradoFacultadValidadoResolver,
          },
        }
      ]
    },
    {
      path     : 'facultad/aprobados',
      component: GradosFacultadAprobadosComponent,
      resolve  : {
        grados  : GradosFacultadAprobadosResolver,
      },
      children : [
        {
          path     : '',
          component: GradosFacultadAprobadosListComponent,
        },
        {
          path         : ':idTramite',
          component    : GradoFacultadAprobadoDetalleComponent,
          resolve      : {
            grado  : GradoFacultadAprobadoResolver,
          },
        }
      ]
    },
    {
      path     : 'facultad/revalidados',
      component: GradosFacultadRevalidadosComponent,
      resolve  : {
        grados  : GradosFacultadRevalidadosResolver,
      },
      children : [
        {
          path     : '',
          component: GradosFacultadRevalidadosListComponent,
        },
        {
          path         : ':idTramite',
          component    : GradoFacultadRevalidadoDetalleComponent,
          resolve      : {
            grado  : GradoFacultadRevalidadoResolver,
          },
        }
      ]
    },
    {
      path     : 'facultad/diplomas',
      component: GradosFacultadDiplomasComponent,
      resolve  : {
        grados  : GradosFacultadDiplomasResolver,
      },
      children : [
        {
          path     : '',
          component: GradosFacultadDiplomasListComponent,
        },
        {
          path         : ':idTramite',
          component    : GradoFacultadDiplomaDetalleComponent,
          resolve      : {
            grado  : GradoFacultadDiplomaResolver,
            modalidades: ModalidadesSustentacionResolver,
            programas_estudios: ProgramasEstudiosResolver,
          },
        }
      ]
    },
    {
      path     : 'ura/validacion',
      component: GradosURAValidacionesComponent,
      resolve  : {
        grados  : GradosURAValidacionesResolver,
      },
      children : [
        {
          path     : '',
          component: GradosURAValidacionesListComponent,
        },
        {
          path         : ':idTramite',
          component    : GradoURAValidacionDetalleComponent,
          resolve      : {
            grado  : GradoURAValidacionResolver,
          },
        }
      ]
    },
    {
      path     : 'ura/diplomas',
      component: GradosURADiplomasComponent,
      resolve  : {
        grados  : GradosURADiplomasResolver,
      },
      children : [
        {
          path     : '',
          component: GradosURADiplomasListComponent,
        },
        {
          path         : ':idTramite',
          component    : GradoURADiplomaDetalleComponent,
          resolve      : {
            grado  : GradoURADiplomaResolver,
            modalidades: ModalidadesSustentacionResolver,
            programas_estudios: ProgramasEstudiosResolver,
          },
        }
      ]
    }
];
