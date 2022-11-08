import { Route } from '@angular/router';
import { CanDeactivateCronogramasDetails } from 'app/modules/admin/masters/bachiller_grado/cronogramas/cronogramas.guards';
import { CronogramaResolver, CronogramasResolver, CronogramasUnidadesResolver, UserDependenciaResolver } from 'app/modules/admin/masters/bachiller_grado/cronogramas/cronogramas.resolvers';
import { CronogramasComponent } from 'app/modules/admin/masters/bachiller_grado/cronogramas/cronogramas.component';
import { CronogramasListComponent } from 'app/modules/admin/masters/bachiller_grado/cronogramas/list/list.component';
import { CronogramasDetailsComponent } from 'app/modules/admin/masters/bachiller_grado/cronogramas/details/details.component';

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
                            unidades: CronogramasUnidadesResolver,
                        },
                        canDeactivate: [CanDeactivateCronogramasDetails]
                    }
                ]
            }
        ]
    }
];
