import { Route } from '@angular/router';

// -------------

import { ReporteCarpetasComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/elaboracion_carpetas.component';
import { ReporteCarpetasStatusTramitesListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/status_tramites/list/list.component';
import { ReporteCarpetasExpedientesListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/expedientes/list/list.component';
import { ReporteCarpetasDiplomasListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/diplomas/list.component';
import { ReporteCarpetasLibrosListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/libros/list/list.component';
import { ReporteCarpetasStatusTramitesResolver, ReporteCarpetasExpedientesResolver, UnidadesResolver,ReporteCarpetasAptasTramitesResolver} from 'app/modules/admin/reportes/elaboracion_carpeta/elaboracion_carpetas.resolvers';
import { ReporteCarpetasAptasTramitesListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/carpetas_aptas/list.component';

// -------------

import { ReportesTesoreriaAprobadosComponent } from 'app/modules/admin/reportes/tesoreria/aprobados/aprobados.component';
import { ReportesTesoreriaAprobadosListComponent } from 'app/modules/admin/reportes/tesoreria/aprobados/list/list.component';
import { ReportesTesoreriaAprobadosResolver } from 'app/modules/admin/reportes/tesoreria/aprobados/aprobados.resolvers';

//--------------

import { ReporteTramiteEsperaComponent } from 'app/modules/admin/reportes/tramites/espera/espera.component';
import { ReportesTramitesEsperaListComponent } from 'app/modules/admin/reportes/tramites/espera/list/list.component';
import { ReportesTramitesEsperaResolver } from 'app/modules/admin/reportes/tramites/espera/espera.resolvers';

export const ReporteRoutes: Route[] =[
    {
      path     : 'elaboracion_carpeta',
      component: ReporteCarpetasComponent,
      resolve  : {
        unidades  : UnidadesResolver,
      },
      children : [
        {
          path     : 'diplomas',
          component: ReporteCarpetasDiplomasListComponent,
        },
        {
          path     : 'expedientes',
          component: ReporteCarpetasExpedientesListComponent,
          resolve  : {
            carpetas  : ReporteCarpetasExpedientesResolver,
          },
        },
        {
          path     : 'libros',
          component: ReporteCarpetasLibrosListComponent,
        },
        {
          path     : 'status_tramites',
          component: ReporteCarpetasStatusTramitesListComponent,
          resolve  : {
            carpetas  : ReporteCarpetasStatusTramitesResolver,
          },
        },
        {
          path     : 'carpetas_aptas',
          component: ReporteCarpetasAptasTramitesListComponent,
          resolve  : {
            carpetas  : ReporteCarpetasAptasTramitesResolver,
          },
        },
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
    {
      path     : 'tramites/espera',
      component: ReporteTramiteEsperaComponent,
      resolve  : {
        reportes  : ReportesTramitesEsperaResolver,
      },
      children : [
        {
          path     : '',
          component: ReportesTramitesEsperaListComponent,
        }
      ]
    },
];
