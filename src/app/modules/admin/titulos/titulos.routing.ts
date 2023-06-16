import { Route } from '@angular/router';
// -------------
import { TitulosEscuelaValidadosComponent } from 'app/modules/admin/titulos/escuela/validados/validados.component';
import { TitulosEscuelaValidadosListComponent } from 'app/modules/admin/titulos/escuela/validados/list/list.component';
import { TitulosEscuelaValidadosResolver, TituloEscuelaValidadoResolver } from 'app/modules/admin/titulos/escuela/validados/validados.resolvers';
import { TituloEscuelaValidadoDetalleComponent } from './escuela/validados/detalle/details.component';
// ------------
import { TitulosEscuelaAprobadosComponent } from 'app/modules/admin/titulos/escuela/aprobados/aprobados.component';
import { TitulosEscuelaAprobadosListComponent } from 'app/modules/admin/titulos/escuela/aprobados/list/list.component';
import { TitulosEscuelaAprobadosResolver, TituloEscuelaAprobadoResolver } from 'app/modules/admin/titulos/escuela/aprobados/aprobados.resolvers';
import { TituloEscuelaAprobadoDetalleComponent } from './escuela/aprobados/detalle/details.component';
//---------------------------
import { TitulosEscuelaRevalidadosComponent } from 'app/modules/admin/titulos/escuela/revalidados/revalidados.component';
import { TitulosEscuelaRevalidadosListComponent } from 'app/modules/admin/titulos/escuela/revalidados/list/list.component';
import { TitulosEscuelaRevalidadosResolver, TituloEscuelaRevalidadoResolver } from 'app/modules/admin/titulos/escuela/revalidados/revalidados.resolvers';
import { TituloEscuelaRevalidadoDetalleComponent } from './escuela/revalidados/detalle/details.component';
//---------------------------
import { TitulosEscuelaDiplomasComponent } from 'app/modules/admin/titulos/escuela/diplomas/diplomas.component';
import { TitulosEscuelaDiplomasListComponent } from 'app/modules/admin/titulos/escuela/diplomas/list/list.component';
import { TitulosEscuelaDiplomasResolver, TituloEscuelaDiplomaResolver, ModalidadesSustentacionResolver, ProgramasEstudiosResolver } from 'app/modules/admin/titulos/escuela/diplomas/diplomas.resolvers';
import { TituloEscuelaDiplomaDetalleComponent } from 'app/modules/admin/titulos/escuela/diplomas/detalle/details.component';
// -------------
import { TitulosFacultadValidadosComponent } from 'app/modules/admin/titulos/facultad/validados/validados.component';
import { TitulosFacultadValidadosListComponent } from 'app/modules/admin/titulos/facultad/validados/list/list.component';
import { TituloFacultadValidadoResolver, TitulosFacultadValidadosResolver } from 'app/modules/admin/titulos/facultad/validados/validados.resolvers';
import { TituloFacultadValidadoDetalleComponent } from 'app/modules/admin/titulos/facultad/validados/detalle/details.component';
// // ------------
import { TitulosFacultadAprobadosComponent } from 'app/modules/admin/titulos/facultad/aprobados/aprobados.component';
import { TitulosFacultadAprobadosListComponent } from 'app/modules/admin/titulos/facultad/aprobados/list/list.component';
import { TituloFacultadAprobadoResolver, TitulosFacultadAprobadosResolver } from 'app/modules/admin/titulos/facultad/aprobados/aprobados.resolvers';
import { TituloFacultadAprobadoDetalleComponent } from './facultad/aprobados/detalle/details.component';
// //---------------------------
import { TitulosFacultadRevalidadosComponent } from 'app/modules/admin/titulos/facultad/revalidados/revalidados.component';
import { TitulosFacultadRevalidadosListComponent } from 'app/modules/admin/titulos/facultad/revalidados/list/list.component';
import { TitulosFacultadRevalidadosResolver, TituloFacultadRevalidadoResolver } from 'app/modules/admin/titulos/facultad/revalidados/revalidados.resolvers';
import { TituloFacultadRevalidadoDetalleComponent } from 'app/modules/admin/titulos/facultad/revalidados/detalle/details.component';
//---------------------------
import { TitulosFacultadDiplomasComponent } from 'app/modules/admin/titulos/facultad/diplomas/diplomas.component';
import { TitulosFacultadDiplomasListComponent } from 'app/modules/admin/titulos/facultad/diplomas/list/list.component';
import { TitulosFacultadDiplomasResolver, TituloFacultadDiplomaResolver } from 'app/modules/admin/titulos/facultad/diplomas/diplomas.resolvers';
import { TituloFacultadDiplomaDetalleComponent } from 'app/modules/admin/titulos/facultad/diplomas/detalle/details.component';
// //---------------------------
import { TitulosURAValidacionesComponent } from 'app/modules/admin/titulos/ura/validaciones/validaciones.component';
import { TitulosURAValidacionesListComponent } from 'app/modules/admin/titulos/ura/validaciones/list/list.component';
import { TitulosURAValidacionesResolver, TituloURAValidacionResolver } from 'app/modules/admin/titulos/ura/validaciones/validaciones.resolvers';
import { TituloURAValidacionDetalleComponent } from 'app/modules/admin/titulos/ura/validaciones/details/details.component';
//---------------------------
import { TitulosURADiplomasComponent } from 'app/modules/admin/titulos/ura/diplomas/diplomas.component';
import { TitulosURADiplomasListComponent } from 'app/modules/admin/titulos/ura/diplomas/list/list.component';
import { TitulosURADiplomasResolver, TituloURADiplomaResolver } from 'app/modules/admin/titulos/ura/diplomas/diplomas.resolvers';
import { TituloURADiplomaDetalleComponent } from 'app/modules/admin/titulos/ura/diplomas/detalle/details.component';

import { NgxPermissionsGuard } from 'ngx-permissions';


export const titulosRoutes: Route[] = [
    {
      path     : 'escuela/validados',
      component: TitulosEscuelaValidadosComponent,
      resolve  : {
        titulos  : TitulosEscuelaValidadosResolver,
      },
      children : [
        {
          path     : '',
          component: TitulosEscuelaValidadosListComponent,
        },
        {
          path         : ':idTramite',
          component    : TituloEscuelaValidadoDetalleComponent,
          resolve      : {
            titulo  : TituloEscuelaValidadoResolver,
          },
        }
      ]
    },
    {
        path     : 'escuela/aprobados',
        component: TitulosEscuelaAprobadosComponent,
        resolve  : {
            titulos  : TitulosEscuelaAprobadosResolver,
        },
        children : [
            {
                path     : '',
                component: TitulosEscuelaAprobadosListComponent,
            },
            {
                path         : ':idTramite',
                component    : TituloEscuelaAprobadoDetalleComponent,
                resolve      : {
                    titulo  : TituloEscuelaAprobadoResolver,
                },
            }
        ]
    },
    {
      path     : 'escuela/revalidados',
      component: TitulosEscuelaRevalidadosComponent,
      resolve  : {
        titulos  : TitulosEscuelaRevalidadosResolver,
      },
      children : [
        {
          path     : '',
          component: TitulosEscuelaRevalidadosListComponent,
        },
        {
          path         : ':idTramite',
          component    : TituloEscuelaRevalidadoDetalleComponent,
          resolve      : {
            titulo  : TituloEscuelaRevalidadoResolver,
          },
        }
      ]
    },
    {
      path     : 'escuela/diplomas',
      component: TitulosEscuelaDiplomasComponent,
      resolve  : {
        titulos  : TitulosEscuelaDiplomasResolver,
      },
      children : [
        {
          path     : '',
          component: TitulosEscuelaDiplomasListComponent,
        },
        {
          path         : ':idTramite',
          component    : TituloEscuelaDiplomaDetalleComponent,
          resolve      : {
            titulo  : TituloEscuelaDiplomaResolver,
            modalidades: ModalidadesSustentacionResolver,
            programas_estudios: ProgramasEstudiosResolver,
          },
        }
      ]
    },
    {
      path     : 'facultad/validados',
      component: TitulosFacultadValidadosComponent,
      resolve  : {
        titulos  : TitulosFacultadValidadosResolver,
      },
      children : [
        {
          path     : '',
          component: TitulosFacultadValidadosListComponent,
        },
        {
          path         : ':idTramite',
          component    : TituloFacultadValidadoDetalleComponent,
          resolve      : {
            titulo  : TituloFacultadValidadoResolver,
          },
        }
      ]
    },
    {
      path     : 'facultad/aprobados',
      component: TitulosFacultadAprobadosComponent,
      resolve  : {
        titulos  : TitulosFacultadAprobadosResolver,
      },
      children : [
        {
          path     : '',
          component: TitulosFacultadAprobadosListComponent,
        },
        {
          path         : ':idTramite',
          component    : TituloFacultadAprobadoDetalleComponent,
          resolve      : {
            titulo  : TituloFacultadAprobadoResolver,
          },
        }
      ]
    },
    {
      path     : 'facultad/revalidados',
      component: TitulosFacultadRevalidadosComponent,
      resolve  : {
        titulos  : TitulosFacultadRevalidadosResolver,
      },
      children : [
        {
          path     : '',
          component: TitulosFacultadRevalidadosListComponent,
        },
        {
          path         : ':idTramite',
          component    : TituloFacultadRevalidadoDetalleComponent,
          resolve      : {
            titulo  : TituloFacultadRevalidadoResolver,
          },
        }
      ]
    },
    {
      path     : 'facultad/diplomas',
      component: TitulosFacultadDiplomasComponent,
      resolve  : {
        titulos  : TitulosFacultadDiplomasResolver,
      },
      children : [
        {
          path     : '',
          component: TitulosFacultadDiplomasListComponent,
        },
        {
          path         : ':idTramite',
          component    : TituloFacultadDiplomaDetalleComponent,
          resolve      : {
            titulo  : TituloFacultadDiplomaResolver,
            modalidades: ModalidadesSustentacionResolver,
            programas_estudios: ProgramasEstudiosResolver,
          },
        }
      ]
    },
    {
      path     : 'ura/validacion',
      component: TitulosURAValidacionesComponent,
      resolve  : {
        titulos  : TitulosURAValidacionesResolver,
      },
      children : [
        {
          path     : '',
          component: TitulosURAValidacionesListComponent,
        },
        {
          path         : ':idTramite',
          component    : TituloURAValidacionDetalleComponent,
          resolve      : {
            titulo  : TituloURAValidacionResolver,
          },
        }
      ]
    },
    {
      path     : 'ura/diplomas',
      component: TitulosURADiplomasComponent,
      resolve  : {
        titulos  : TitulosURADiplomasResolver,
      },
      children : [
        {
          path     : '',
          component: TitulosURADiplomasListComponent,
        },
        {
          path         : ':idTramite',
          component    : TituloURADiplomaDetalleComponent,
          resolve      : {
            titulo  : TituloURADiplomaResolver,
            modalidades: ModalidadesSustentacionResolver,
            programas_estudios: ProgramasEstudiosResolver,
          },
        }
      ]
    }
];
