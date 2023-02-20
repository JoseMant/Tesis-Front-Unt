import { Route } from '@angular/router';
// -------------
import { GradosEscuelaValidadosComponent } from 'app/modules/admin/reporte/escuela/validados/validados.component';
import { GradosEscuelaValidadosListComponent } from 'app/modules/admin/reporte/escuela/validados/list/list.component';
import { GradosEscuelaValidadosResolver, GradoEscuelaValidadoResolver } from 'app/modules/admin/reporte/escuela/validados/validados.resolvers';
import { GradoEscuelaValidadoDetalleComponent } from './escuela/validados/detalle/details.component';

// -------------

import { GradosURAValidacionesComponent } from 'app/modules/admin/reporte/ura/validaciones/validaciones.component';
import { GradosURAValidacionesListComponent } from 'app/modules/admin/reporte/ura/validaciones/list/list.component';
import { GradosURAValidacionesResolver, GradoURAValidacionResolver } from 'app/modules/admin/reporte/ura/validaciones/validaciones.resolvers';

// -------------
import { GradosSecretariaValidadosComponent } from 'app/modules/admin/reporte/secretaria/validados/validados.component';
import { GradosSecretariaValidadosListComponent } from 'app/modules/admin/reporte/secretaria/validados/list/list.component';
import { GradoSecretariaValidadoResolver } from 'app/modules/admin/reporte/secretaria/validados/validados.resolvers';

import { GradoURAValidacionDetalleComponent } from './ura/validaciones/details/details.component';
import { GradoSecretariaValidadoDetalleComponent } from './secretaria/validados/details/details.component';


export const ReporteRoutes: Route[] =[
    {
      path     : 'escuela',
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
      path     : 'secretaria',
      component: GradosSecretariaValidadosComponent,
      children : [
        {
          path     : '',
          component: GradosSecretariaValidadosListComponent,
          
        },
        {
          path         : ':idTramite',
          component    : GradoSecretariaValidadoDetalleComponent,
          resolve      : {
            grado  : GradoSecretariaValidadoResolver,
          },
        }
      ]
    },

    {
      path     : 'ura',
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

];
