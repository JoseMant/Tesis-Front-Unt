import { Route } from '@angular/router';
import { CanDeactivateCronogramasDetails } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.guards';
import { CronogramaResolver, CronogramasResolver, CronogramasUnidadesResolver, UserDependenciaResolver,CronogramaResolucionesResolver } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.resolvers';
import { CronogramasComponent } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.component';
import { CronogramasListComponent } from 'app/modules/admin/masters/carpeta/cronogramas/list/list.component';
import { CronogramasDetailsComponent } from 'app/modules/admin/masters/carpeta/cronogramas/details/details.component';
// -----------
import { CanDeactivateResolucionesDetails } from 'app/modules/admin/masters/carpeta/resoluciones/resoluciones.guards';
import { ResolucionResolver, ResolucionesResolver, ResolucionesUnidadesResolver } from 'app/modules/admin/masters/carpeta/resoluciones/resoluciones.resolvers';
import { ResolucionesComponent } from 'app/modules/admin/masters/carpeta/resoluciones/resoluciones.component';
import { ResolucionesListComponent } from 'app/modules/admin/masters/carpeta/resoluciones/list/list.component';
import { ResolucionesDetailsComponent } from 'app/modules/admin/masters/carpeta/resoluciones/details/details.component';
// -----------
import { CanDeactivateOficiosDetails } from 'app/modules/admin/masters/carpeta/oficios/oficios.guards';
import { OficioResolver, OficiosResolver, OficiosUnidadesResolver,OficiosResolucionesResolver } from 'app/modules/admin/masters/carpeta/oficios/oficios.resolvers';
import { OficiosComponent } from 'app/modules/admin/masters/carpeta/oficios/oficios.component';
import { OficiosListComponent } from 'app/modules/admin/masters/carpeta/oficios/list/list.component';
import { OficiosDetailsComponent } from 'app/modules/admin/masters/carpeta/oficios/details/details.component';
export const carpetaRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'cronogramas'
    },
    {
        path     : 'cronogramas',
        component: CronogramasComponent,
        children : [
            {
                path     : '',
                component: CronogramasListComponent,
                resolve  : {
                    cronogramas : CronogramasResolver,
                    // countries: CronogramasRolesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : CronogramasDetailsComponent,
                        resolve      : {
                            cronograma  : CronogramaResolver,
                            user        : UserDependenciaResolver,
                            unidades: CronogramasUnidadesResolver,
                            resoluciones: CronogramaResolucionesResolver
                        },
                        canDeactivate: [CanDeactivateCronogramasDetails]
                    }
                ]
            }
        ]
    },
    {
        path     : 'resoluciones',
        component: ResolucionesComponent,
        children : [
            {
                path     : '',
                component: ResolucionesListComponent,
                resolve  : {
                    resoluciones : ResolucionesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : ResolucionesDetailsComponent,
                        resolve      : {
                            resoluciones: ResolucionResolver
                        },
                        canDeactivate: [CanDeactivateOficiosDetails]
                    }
                ]
            }
        ]
    },
    {
        path     : 'oficios',
        component: OficiosComponent,
        children : [
            {
                path     : '',
                component: OficiosListComponent,
                resolve  : {
                    resoluciones : OficiosResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : OficiosDetailsComponent,
                        resolve      : {
                            oficios: OficioResolver,
                            resoluciones: OficiosResolucionesResolver
                        },
                        canDeactivate: [CanDeactivateResolucionesDetails]
                    }
                ]
            }
        ]
    }
];
