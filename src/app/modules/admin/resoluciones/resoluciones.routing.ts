import { Route } from '@angular/router';



import { NgxPermissionsGuard } from 'ngx-permissions';
import { ResolucionesValidarResolver,ValidarResolucionResolver,ResolucionesFinalizadosResolver, ResolucionFinalizadoResolver, ResolucionesObservadosResolver } from './resoluciones.resolvers';

import { ResolucionValidarDetalleComponent } from 'app/modules/admin/resoluciones/validacion/details/details.component';
import { ResolucionesValidarListComponent } from 'app/modules/admin/resoluciones/validacion/list/list.component';

import { ResolucionFinalizadaDetalleComponent } from 'app/modules/admin/resoluciones/finalizados/details/details.component';
import { ResoucionesFinalizadosListComponent } from 'app/modules/admin/resoluciones/finalizados/list/list.component';

import { ResolucionesComponent } from './resoluciones.component';
import { ResoucionesObservadosListComponent } from './observados/list/list.component';
import { ResolucionObservadaDetalleComponent } from './observados/details/details.component';

export const resolucionesRoutes: Route[] = [
    {
        path     : 'validacion',
        component: ResolucionesComponent,
        resolve  : {
            tramites : ResolucionesValidarResolver,
        },
        children : [
            {
                path     : '',
                component: ResolucionesValidarListComponent
            },
            {
                path         : ':idTramite',
                component    : ResolucionValidarDetalleComponent,
                resolve      : {
                    resolucion      : ValidarResolucionResolver,
                  },
                
            }          
           
        ]
    },
    {
        path     : 'observados',
        component: ResolucionesComponent,
        resolve  : {
            tramites : ResolucionesObservadosResolver,
            
        },
        children : [
            {
                path     : '',
                component: ResoucionesObservadosListComponent
            },
            {
                path         : ':idTramite',
                component    : ResolucionObservadaDetalleComponent,
                resolve      : {
                    docente      : ResolucionFinalizadoResolver,
                },
            }          
           
        ]
    },
    {
        path     : 'finalizados',
        component: ResolucionesComponent,
        resolve  : {
            tramites : ResolucionesFinalizadosResolver,
            
        },
        children : [
            {
                path     : '',
                component: ResoucionesFinalizadosListComponent
            },
            {
                path         : ':idTramite',
                component    : ResolucionFinalizadaDetalleComponent,
                resolve      : {
                    docente      : ResolucionFinalizadoResolver,
                },
            }          
           
        ]
    }
];
