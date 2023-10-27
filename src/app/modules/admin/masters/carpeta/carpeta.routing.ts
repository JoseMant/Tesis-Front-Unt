import { Route } from '@angular/router';
import { CanDeactivateCronogramasDetails } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.guards';
import { CronogramaResolver, CronogramasResolver, CronogramasUnidadesResolver, UserDependenciaResolver,CronogramaResolucionesResolver } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.resolvers';
import { CronogramasComponent } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.component';
import { CronogramasListComponent } from 'app/modules/admin/masters/carpeta/cronogramas/list/list.component';
import { CronogramasDetailsComponent } from 'app/modules/admin/masters/carpeta/cronogramas/details/details.component';
// -----------
import { CanDeactivateResolucionesGraduadosDetails } from 'app/modules/admin/masters/carpeta/resoluciones/graduados/graduados.guards';
import { ResolucionResolver, ResolucionesResolver, Tipos_ResolucionResolver, ResolucionCronogramasResolver } from 'app/modules/admin/masters/carpeta/resoluciones/graduados/graduados.resolvers';
import { ResolucionesGraduadosComponent } from 'app/modules/admin/masters/carpeta/resoluciones/graduados/graduados.component';
import { ResolucionesGraduadosListComponent } from 'app/modules/admin/masters/carpeta/resoluciones/graduados/list/list.component';
import { ResolucionesGraduadosDetailsComponent } from 'app/modules/admin/masters/carpeta/resoluciones/graduados/details/details.component';
// -----------
import { CanDeactivateOficiosDetails } from 'app/modules/admin/masters/carpeta/oficios/oficios.guards';
import { OficioResolver, OficiosResolver, OficiosResolucionesResolver } from 'app/modules/admin/masters/carpeta/oficios/oficios.resolvers';
import { OficiosComponent } from 'app/modules/admin/masters/carpeta/oficios/oficios.component';
import { OficiosListComponent } from 'app/modules/admin/masters/carpeta/oficios/list/list.component';
import { OficiosDetailsComponent } from 'app/modules/admin/masters/carpeta/oficios/details/details.component';
// -------
import { CanDeactivateResolucionesDuplicadosDetails } from 'app/modules/admin/masters/carpeta/resoluciones/duplicados/duplicados.guards';
import { ResolucionRectoralResolver, ResolucionesDuplicadosResolver, Tipos_ResolucionDuplicadosResolver, ResolucionRectoralTramitesDuplicadosResolver } from 'app/modules/admin/masters/carpeta/resoluciones/duplicados/duplicados.resolvers';
import { ResolucionesDuplicadosComponent } from 'app/modules/admin/masters/carpeta/resoluciones/duplicados/duplicados.component';
import { ResolucionesDuplicadosListComponent } from 'app/modules/admin/masters/carpeta/resoluciones/duplicados/list/list.component';
import { ResolucionesDuplicadosDetailsComponent } from 'app/modules/admin/masters/carpeta/resoluciones/duplicados/details/details.component';


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
        path     : 'resoluciones/graduados',
        component: ResolucionesGraduadosComponent,
        children : [
            {
                path     : '',
                component: ResolucionesGraduadosListComponent,
                resolve  : {
                    resoluciones : ResolucionesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : ResolucionesGraduadosDetailsComponent,
                        resolve      : {
                            resoluciones: ResolucionResolver,
                            cronogramas: ResolucionCronogramasResolver,
                            tipos_resoluciones:Tipos_ResolucionResolver
                        },
                        canDeactivate: [CanDeactivateResolucionesGraduadosDetails]
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
                            resoluciones: OficiosResolucionesResolver,
                        },
                        canDeactivate: [CanDeactivateOficiosDetails]
                    }
                ]
            }
        ]
    },
    {
        path     : 'resoluciones/duplicados',
        component: ResolucionesDuplicadosComponent,
        children : [
            {
                path     : '',
                component: ResolucionesDuplicadosListComponent,
                resolve  : {
                    resoluciones : ResolucionesDuplicadosResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : ResolucionesDuplicadosDetailsComponent,
                        resolve      : {
                            resoluciones: ResolucionRectoralResolver,
                            cronogramas: ResolucionRectoralTramitesDuplicadosResolver,
                            tipos_resoluciones:Tipos_ResolucionDuplicadosResolver
                        },
                        canDeactivate: [CanDeactivateResolucionesDuplicadosDetails]
                    }
                ]
            }
        ]
    }
];
