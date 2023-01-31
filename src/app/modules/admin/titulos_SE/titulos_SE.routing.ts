import { Route } from '@angular/router';
// -------------
import { TitulosEspecialidadValidadosComponent } from 'app/modules/admin/titulos_SE/especialidad/validados/validados.component';
import { TitulosEspecialidadValidadosListComponent } from 'app/modules/admin/titulos_SE/especialidad/validados/list/list.component';
import { TitulosEspecialidadValidadosResolver, TituloEspecialidadValidadoResolver } from 'app/modules/admin/titulos_SE/especialidad/validados/validados.resolvers';
import { TituloEspecialidadValidadoDetalleComponent } from 'app/modules/admin/titulos_SE/especialidad/validados/detalle/details.component';
// ------------
import { TitulosEspecialidadAprobadosComponent } from 'app/modules/admin/titulos_SE/especialidad/aprobados/aprobados.component';
import { TitulosEspecialidadAprobadosListComponent } from 'app/modules/admin/titulos_SE/especialidad/aprobados/list/list.component';
import { TitulosEspecialidadAprobadosResolver, TituloEspecialidadAprobadoResolver } from 'app/modules/admin/titulos_SE/especialidad/aprobados/aprobados.resolvers';
import { TituloEspecialidadAprobadoDetalleComponent } from 'app/modules/admin/titulos_SE/especialidad/aprobados/detalle/details.component';
//---------------------------
import { TitulosEspecialidadRevalidadosComponent } from 'app/modules/admin/titulos_SE/especialidad/revalidados/revalidados.component';
import { TitulosEspecialidadRevalidadosListComponent } from 'app/modules/admin/titulos_SE/especialidad/revalidados/list/list.component';
import { TitulosEspecialidadRevalidadosResolver, TituloEspecialidadRevalidadoResolver } from 'app/modules/admin/titulos_SE/especialidad/revalidados/revalidados.resolvers';
import { TituloEspecialidadRevalidadoDetalleComponent } from 'app/modules/admin/titulos_SE/especialidad/revalidados/detalle/details.component';
//---------------------------
import { TitulosEspecialidadDiplomasComponent } from 'app/modules/admin/titulos_SE/especialidad/diplomas/diplomas.component';
import { TitulosEspecialidadDiplomasListComponent } from 'app/modules/admin/titulos_SE/especialidad/diplomas/list/list.component';
import { TitulosEspecialidadDiplomasResolver, TituloEspecialidadDiplomaResolver, ModalidadesSustentacionResolver, ProgramasEstudiosResolver } from 'app/modules/admin/titulos_SE/especialidad/diplomas/diplomas.resolvers';
import { TituloEspecialidadDiplomaDetalleComponent } from 'app/modules/admin/titulos_SE/especialidad/diplomas/detalle/details.component';
// -------------
import { TitulosFacultadValidadosComponent } from 'app/modules/admin/titulos_SE/facultad/validados/validados.component';
import { TitulosFacultadValidadosListComponent } from 'app/modules/admin/titulos_SE/facultad/validados/list/list.component';
import { TituloFacultadValidadoResolver, TitulosFacultadValidadosResolver } from 'app/modules/admin/titulos_SE/facultad/validados/validados.resolvers';
import { TituloFacultadValidadoDetalleComponent } from 'app/modules/admin/titulos_SE/facultad/validados/detalle/details.component';
// // ------------
import { TitulosFacultadAprobadosComponent } from 'app/modules/admin/titulos_SE/facultad/aprobados/aprobados.component';
import { TitulosFacultadAprobadosListComponent } from 'app/modules/admin/titulos_SE/facultad/aprobados/list/list.component';
import { TituloFacultadAprobadoResolver, TitulosFacultadAprobadosResolver } from 'app/modules/admin/titulos_SE/facultad/aprobados/aprobados.resolvers';
import { TituloFacultadAprobadoDetalleComponent } from './facultad/aprobados/detalle/details.component';
// //---------------------------
import { TitulosFacultadRevalidadosComponent } from 'app/modules/admin/titulos_SE/facultad/revalidados/revalidados.component';
import { TitulosFacultadRevalidadosListComponent } from 'app/modules/admin/titulos_SE/facultad/revalidados/list/list.component';
import { TitulosFacultadRevalidadosResolver, TituloFacultadRevalidadoResolver } from 'app/modules/admin/titulos_SE/facultad/revalidados/revalidados.resolvers';
import { TituloFacultadRevalidadoDetalleComponent } from 'app/modules/admin/titulos_SE/facultad/revalidados/detalle/details.component';
//---------------------------
import { TitulosFacultadDiplomasComponent } from 'app/modules/admin/titulos_SE/facultad/diplomas/diplomas.component';
import { TitulosFacultadDiplomasListComponent } from 'app/modules/admin/titulos_SE/facultad/diplomas/list/list.component';
import { TitulosFacultadDiplomasResolver, TituloFacultadDiplomaResolver } from 'app/modules/admin/titulos_SE/facultad/diplomas/diplomas.resolvers';
import { TituloFacultadDiplomaDetalleComponent } from 'app/modules/admin/titulos_SE/facultad/diplomas/detalle/details.component';
// //---------------------------
import { TitulosURAValidacionesComponent } from 'app/modules/admin/titulos_SE/ura/validaciones/validaciones.component';
import { TitulosURAValidacionesListComponent } from 'app/modules/admin/titulos_SE/ura/validaciones/list/list.component';
import { TitulosURAValidacionesResolver, TituloURAValidacionResolver } from 'app/modules/admin/titulos_SE/ura/validaciones/validaciones.resolvers';
import { TituloURAValidacionDetalleComponent } from 'app/modules/admin/titulos_SE/ura/validaciones/details/details.component';
//---------------------------
import { TitulosURADiplomasComponent } from 'app/modules/admin/titulos_SE/ura/diplomas/diplomas.component';
import { TitulosURADiplomasListComponent } from 'app/modules/admin/titulos_SE/ura/diplomas/list/list.component';
import { TitulosURADiplomasResolver, TituloURADiplomaResolver } from 'app/modules/admin/titulos_SE/ura/diplomas/diplomas.resolvers';
import { TituloURADiplomaDetalleComponent } from 'app/modules/admin/titulos_SE/ura/diplomas/detalle/details.component';

// -------------
import { TitulosURAPendientesComponent } from 'app/modules/admin/titulos_SE/ura/pendientes/pendientes.component';
import { TitulosURAPendientesListComponent } from 'app/modules/admin/titulos_SE/ura/pendientes/list/list.component';

import { NgxPermissionsGuard } from 'ngx-permissions';


export const titulos_SERoutes: Route[] = [
    {
      path     : 'especialidad/validados',
      component: TitulosEspecialidadValidadosComponent,
      resolve  : {
        titulos_SE  : TitulosEspecialidadValidadosResolver,
      },
      children : [
        {
          path     : '',
          component: TitulosEspecialidadValidadosListComponent,
        },
        {
          path         : ':idTramite',
          component    : TituloEspecialidadValidadoDetalleComponent,
          resolve      : {
            titulo  : TituloEspecialidadValidadoResolver,
          },
        }
      ]
    },
    {
        path     : 'especialidad/aprobados',
        component: TitulosEspecialidadAprobadosComponent,
        resolve  : {
            titulos_SE  : TitulosEspecialidadAprobadosResolver,
        },
        children : [
            {
                path     : '',
                component: TitulosEspecialidadAprobadosListComponent,
            },
            {
                path         : ':idTramite',
                component    : TituloEspecialidadAprobadoDetalleComponent,
                resolve      : {
                    titulo  : TituloEspecialidadAprobadoResolver,
                },
            }
        ]
    },
    {
      path     : 'especialidad/revalidados',
      component: TitulosEspecialidadRevalidadosComponent,
      resolve  : {
        titulos_SE  : TitulosEspecialidadRevalidadosResolver,
      },
      children : [
        {
          path     : '',
          component: TitulosEspecialidadRevalidadosListComponent,
        },
        {
          path         : ':idTramite',
          component    : TituloEspecialidadRevalidadoDetalleComponent,
          resolve      : {
            titulo  : TituloEspecialidadRevalidadoResolver,
          },
        }
      ]
    },
    {
      path     : 'especialidad/diplomas',
      component: TitulosEspecialidadDiplomasComponent,
      resolve  : {
        titulos_SE  : TitulosEspecialidadDiplomasResolver,
      },
      children : [
        {
          path     : '',
          component: TitulosEspecialidadDiplomasListComponent,
        },
        {
          path         : ':idTramite',
          component    : TituloEspecialidadDiplomaDetalleComponent,
          resolve      : {
            titulo  : TituloEspecialidadDiplomaResolver,
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
        titulos_SE  : TitulosFacultadValidadosResolver,
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
        titulos_SE  : TitulosFacultadAprobadosResolver,
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
        titulos_SE  : TitulosFacultadRevalidadosResolver,
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
        titulos_SE  : TitulosFacultadDiplomasResolver,
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
        titulos_SE  : TitulosURAValidacionesResolver,
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
        titulos_SE  : TitulosURADiplomasResolver,
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
