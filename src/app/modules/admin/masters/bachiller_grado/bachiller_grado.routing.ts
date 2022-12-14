import { Route } from '@angular/router';
import { CanDeactivateCronogramasDetails } from 'app/modules/admin/masters/bachiller_grado/cronogramas/cronogramas.guards';
import { CronogramaResolver, CronogramasResolver, CronogramasUnidadesResolver, UserDependenciaResolver } from 'app/modules/admin/masters/bachiller_grado/cronogramas/cronogramas.resolvers';
import { CronogramasComponent } from 'app/modules/admin/masters/bachiller_grado/cronogramas/cronogramas.component';
import { CronogramasListComponent } from 'app/modules/admin/masters/bachiller_grado/cronogramas/list/list.component';
import { CronogramasDetailsComponent } from 'app/modules/admin/masters/bachiller_grado/cronogramas/details/details.component';
// -----------
import { CanDeactivateAcreditadasDetails } from 'app/modules/admin/masters/bachiller_grado/acreditadas/acreditadas.guards';
import { AcreditadaResolver, AcreditadasResolver, AcreditadasUnidadesResolver } from 'app/modules/admin/masters/bachiller_grado/acreditadas/acreditadas.resolvers';
import { AcreditadasComponent } from 'app/modules/admin/masters/bachiller_grado/acreditadas/acreditadas.component';
import { AcreditadasListComponent } from 'app/modules/admin/masters/bachiller_grado/acreditadas/list/list.component';
import { AcreditadasDetailsComponent } from 'app/modules/admin/masters/bachiller_grado/acreditadas/details/details.component';

import { CanDeactivateResolucionesDetails } from 'app/modules/admin/masters/bachiller_grado/resoluciones/resoluciones.guards';
import { ResolucionResolver, ResolucionesResolver, ResolucionesUnidadesResolver } from 'app/modules/admin/masters/bachiller_grado/resoluciones/resoluciones.resolvers';
import { ResolucionesComponent } from 'app/modules/admin/masters/bachiller_grado/resoluciones/resoluciones.component';
import { ResolucionesListComponent } from 'app/modules/admin/masters/bachiller_grado/resoluciones/list/list.component';
import { ResolucionesDetailsComponent } from 'app/modules/admin/masters/bachiller_grado/resoluciones/details/details.component';
export const bachiller_gradoRoutes: Route[] = [
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
                            unidades    : CronogramasUnidadesResolver,
                        },
                        canDeactivate: [CanDeactivateResolucionesDetails]
                    }
                ]
            }
        ]
    },
    {
        path     : 'acreditadas',
        component: AcreditadasComponent,
        children : [
            {
                path     : '',
                component: AcreditadasListComponent,
                resolve  : {
                    acreditadas : AcreditadasResolver,
                    // countries: AcreditadasRolesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : AcreditadasDetailsComponent,
                        resolve      : {
                            acreditada  : AcreditadaResolver,
                            // user        : UserDependenciaResolver,
                            // unidades    : AcreditadasUnidadesResolver,
                        },
                        canDeactivate: [CanDeactivateAcreditadasDetails]
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
                    resoluciones : ResolucionesResolver,
                    // countries: AcreditadasRolesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : ResolucionesDetailsComponent,
                        resolve      : {
                            resoluciones  : ResolucionResolver,
                            // user        : UserDependenciaResolver,
                            // unidades    : AcreditadasUnidadesResolver,
                        },
                        canDeactivate: [CanDeactivateAcreditadasDetails]
                    }
                ]
            }
        ]
    }
];
