import { Route } from '@angular/router';
// -------------
import { ReportesEscuelaValidadosComponent } from 'app/modules/admin/reportes/escuela/validados/validados.component';
import { ReportesEscuelaValidadosListComponent } from 'app/modules/admin/reportes/escuela/validados/list/list.component';
import { ReportesEscuelaValidadosResolver, ReporteEscuelaValidadoResolver } from 'app/modules/admin/reportes/escuela/validados/validados.resolvers';
import { ReporteEscuelaValidadoDetalleComponent } from './escuela/validados/detalle/details.component';

// -------------
import { ReportesFacultadValidadosComponent } from 'app/modules/admin/reportes/facultad/validados/validados.component';
import { ReportesFacultadValidadosListComponent } from 'app/modules/admin/reportes/facultad/validados/list/list.component';
import { ReportesFacultadValidadosResolver, ReporteFacultadValidadoResolver } from 'app/modules/admin/reportes/facultad/validados/validados.resolvers';
import { ReporteFacultadValidadoDetalleComponent } from './facultad/validados/detalle/details.component';

// -------------

import { ReportesURAValidacionesComponent } from 'app/modules/admin/reportes/ura/validaciones/validaciones.component';
import { ReportesURAValidacionesListComponent } from 'app/modules/admin/reportes/ura/validaciones/list/list.component';
import { ReportesURAValidacionesResolver, ReporteURAValidacionResolver } from 'app/modules/admin/reportes/ura/validaciones/validaciones.resolvers';
import { ReporteURAValidacionDetalleComponent } from './ura/validaciones/details/details.component';

// // -------------

import { ReportesTesoreriaValidadosComponent } from 'app/modules/admin/reportes/tesoreria/validados/validados.component';
import { ReportesTesoreriaValidadosListComponent } from 'app/modules/admin/reportes/tesoreria/validados/list/list.component';
import { ReportesTesoreriaValidadosResolver, ReporteTesoreriaValidadoResolver } from 'app/modules/admin/reportes/tesoreria/validados/validados.resolvers';

// // -------------

// import { ReportesSecretariaValidadosComponent } from 'app/modules/admin/reportes/secretaria/validados/validados.component';
// import { ReportesSecretariaValidadosListComponent } from 'app/modules/admin/reportes/secretaria/validados/list/list.component';
// import { ReporteSecretariaValidadoResolver } from 'app/modules/admin/reportes/secretaria/validados/validados.resolvers';

// import { ReporteSecretariaValidadoDetalleComponent } from './secretaria/validados/details/details.component';


export const ReporteRoutes: Route[] =[
    {
      path     : 'escuela',
      component: ReportesEscuelaValidadosComponent,
      resolve  : {
        reportes  : ReportesEscuelaValidadosResolver,
      },
      children : [
        {
          path     : '',
          component: ReportesEscuelaValidadosListComponent,
        },
        {
          path         : ':idTramite',
          component    : ReporteEscuelaValidadoDetalleComponent,
          resolve      : {
            reporte  : ReporteEscuelaValidadoResolver,
          },
        }
      ]
    },

    {
      path     : 'facultad',
      component: ReportesFacultadValidadosComponent,
      resolve  : {
        reportes  : ReportesFacultadValidadosResolver,
      },
      children : [
        {
          path     : '',
          component: ReportesFacultadValidadosListComponent,
        },
        {
          path         : ':idTramite',
          component    : ReporteFacultadValidadoDetalleComponent,
          resolve      : {
            reporte  : ReporteFacultadValidadoResolver,
          },
        }
      ]
    },
    // {
    //   path     : 'secretaria',
    //   component: ReportesSecretariaValidadosComponent,
    //   children : [
    //     {
    //       path     : '',
    //       component: ReportesSecretariaValidadosListComponent,
          
    //     },
    //     {
    //       path         : ':idTramite',
    //       component    : ReporteSecretariaValidadoDetalleComponent,
    //       resolve      : {
    //         reporte  : ReporteSecretariaValidadoResolver,
    //       },
    //     }
    //   ]
    // },

    {
      path     : 'ura',
      component: ReportesURAValidacionesComponent,
      resolve  : {
        reportes  : ReportesURAValidacionesResolver,
      },
      children : [
        {
          path     : '',
          component: ReportesURAValidacionesListComponent,
        },
        {
          path         : ':idTramite',
          component    : ReporteURAValidacionDetalleComponent,
          resolve      : {
            reporte  : ReporteURAValidacionResolver,
          },
        }
      ]
    },
    
    {
      path     : 'tesoreria',
      component: ReportesTesoreriaValidadosComponent,
      resolve  : {
        reportes  : ReportesTesoreriaValidadosResolver,
      },
      children : [
        {
          path     : '',
          component: ReportesTesoreriaValidadosListComponent,
        }
        // {
        //   path         : ':idTramite',
        //   component    : ReporteTesoreriaValidadoDetalleComponent,
        //   resolve      : {
        //     reporte  : ReporteTesoreriaValidadoResolver,
        //   },
        // }
      ]
    },
];
