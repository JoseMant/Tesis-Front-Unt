import { Route } from '@angular/router';
// -------------
import { ReporteCarpetasStatusTramitesComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/status_tramites/status_tramites.component';
import { ReporteCarpetasStatusTramitesListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/status_tramites/list/list.component';
import { ReporteCarpetasStatusTramitesResolver, UnidadesResolver } from 'app/modules/admin/reportes/elaboracion_carpeta/status_tramites/status_tramites.resolvers';

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
        reportes  : ReporteCarpetasStatusTramitesResolver,
      },
      children : [
        {
          path     : '',
          component: ReporteCarpetasStatusTramitesListComponent,
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
