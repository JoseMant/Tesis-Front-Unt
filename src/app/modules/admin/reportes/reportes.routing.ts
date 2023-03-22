import { Route } from '@angular/router';
// -------------
import { ReporteCarpetasStatusTramitesComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/status_tramites/status_tramites.component';
import { ReporteCarpetasStatusTramitesListComponent } from 'app/modules/admin/reportes/elaboracion_carpeta/status_tramites/list/list.component';
import { ReporteCarpetasStatusTramitesResolver, UnidadesResolver } from 'app/modules/admin/reportes/elaboracion_carpeta/status_tramites/status_tramites.resolvers';

// import { ReporteEscuelaValidadoDetalleComponent } from './escuela/validados/detalle/details.component';

// -------------
// import { ReportesFacultadValidadosComponent } from 'app/modules/admin/reportes/facultad/validados/validados.component';
// import { ReportesFacultadValidadosListComponent } from 'app/modules/admin/reportes/facultad/validados/list/list.component';
// import { ReportesFacultadValidadosResolver, ReporteFacultadValidadoResolver } from 'app/modules/admin/reportes/facultad/validados/validados.resolvers';
// import { ReporteFacultadValidadoDetalleComponent } from './facultad/validados/detalle/details.component';

// // -------------

// import { ReportesURAValidacionesComponent } from 'app/modules/admin/reportes/ura/validaciones/validaciones.component';
// import { ReportesURAValidacionesListComponent } from 'app/modules/admin/reportes/ura/validaciones/list/list.component';
// import { ReportesURAValidacionesResolver, ReporteURAValidacionResolver } from 'app/modules/admin/reportes/ura/validaciones/validaciones.resolvers';
// import { ReporteURAValidacionDetalleComponent } from './ura/validaciones/details/details.component';

// // // -------------

// import { ReportesTesoreriaValidadosComponent } from 'app/modules/admin/reportes/tesoreria/validados/validados.component';
// import { ReportesTesoreriaValidadosListComponent } from 'app/modules/admin/reportes/tesoreria/validados/list/list.component';
// import { ReportesTesoreriaValidadosResolver, ReporteTesoreriaValidadoResolver } from 'app/modules/admin/reportes/tesoreria/validados/validados.resolvers';

// // -------------

// import { ReportesSecretariaValidadosComponent } from 'app/modules/admin/reportes/secretaria/validados/validados.component';
// import { ReportesSecretariaValidadosListComponent } from 'app/modules/admin/reportes/secretaria/validados/list/list.component';
// import { ReporteSecretariaValidadoResolver } from 'app/modules/admin/reportes/secretaria/validados/validados.resolvers';

// import { ReporteSecretariaValidadoDetalleComponent } from './secretaria/validados/details/details.component';


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

    // {
    //   path     : 'facultad',
    //   component: ReportesFacultadValidadosComponent,
    //   resolve  : {
    //     reportes  : ReportesFacultadValidadosResolver,
    //   },
    //   children : [
    //     {
    //       path     : '',
    //       component: ReportesFacultadValidadosListComponent,
    //     },
    //     {
    //       path         : ':idTramite',
    //       component    : ReporteFacultadValidadoDetalleComponent,
    //       resolve      : {
    //         reporte  : ReporteFacultadValidadoResolver,
    //       },
    //     }
    //   ]
    // },
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

    // {
    //   path     : 'ura',
    //   component: ReportesURAValidacionesComponent,
    //   resolve  : {
    //     reportes  : ReportesURAValidacionesResolver,
    //   },
    //   children : [
    //     {
    //       path     : '',
    //       component: ReportesURAValidacionesListComponent,
    //     },
    //     {
    //       path         : ':idTramite',
    //       component    : ReporteURAValidacionDetalleComponent,
    //       resolve      : {
    //         reporte  : ReporteURAValidacionResolver,
    //       },
    //     }
    //   ]
    // },
    
    // {
    //   path     : 'tesoreria',
    //   component: ReportesTesoreriaValidadosComponent,
    //   resolve  : {
    //     reportes  : ReportesTesoreriaValidadosResolver,
    //   },
    //   children : [
    //     {
    //       path     : '',
    //       component: ReportesTesoreriaValidadosListComponent,
    //     }
        // {
        //   path         : ':idTramite',
        //   component    : ReporteTesoreriaValidadoDetalleComponent,
        //   resolve      : {
        //     reporte  : ReporteTesoreriaValidadoResolver,
        //   },
        // }
      // ]
    // },
];
