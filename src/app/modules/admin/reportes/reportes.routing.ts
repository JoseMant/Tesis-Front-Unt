import { Route } from '@angular/router';
// -------------
import { ReporteCarpetasStatusTramitesComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/elaboracion_carpetas.component';
import { ReporteCarpetasStatusTramitesListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/status_tramites/list/list.component';
import { ReporteCarpetasExpedientesListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/expedientes/list/list.component';
import { ReporteCarpetasDiplomasListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/diplomas/list.component';
import { ReporteCarpetasStatusTramitesResolver, ReporteCarpetasExpedientesResolver, UnidadesResolver} from 'app/modules/admin/reportes/elaboracion_carpeta/elaboracion_carpetas.resolvers';

// // // -------------

import { ReportesTesoreriaAprobadosComponent } from 'app/modules/admin/reportes/tesoreria/aprobados/aprobados.component';
import { ReportesTesoreriaAprobadosListComponent } from 'app/modules/admin/reportes/tesoreria/aprobados/list/list.component';
import { ReportesTesoreriaAprobadosResolver } from 'app/modules/admin/reportes/tesoreria/aprobados/aprobados.resolvers';

export const ReporteRoutes: Route[] =[
    {
      path     : 'elaboracion_carpeta',
      component: ReporteCarpetasStatusTramitesComponent,
      resolve  : {
        unidades  : UnidadesResolver,
      },
      children : [
        {
          path     : 'status_tramites',
          component: ReporteCarpetasStatusTramitesListComponent,
          resolve  : {
            carpetas  : ReporteCarpetasStatusTramitesResolver,
          },
        },
        {
          path     : 'expedientes',
          component: ReporteCarpetasExpedientesListComponent,
          resolve  : {
            carpetas  : ReporteCarpetasExpedientesResolver,
          },
        },
        {
          path     : 'diplomas',
          component: ReporteCarpetasDiplomasListComponent,
        }
      ]
    },
    {
      path     : 'tesoreria/aprobados',
      component: ReportesTesoreriaAprobadosComponent,
      resolve  : {
        reportes  : ReportesTesoreriaAprobadosResolver,
      },
      children : [
        {
          path     : '',
          component: ReportesTesoreriaAprobadosListComponent,
        }
      ]
    },
];
