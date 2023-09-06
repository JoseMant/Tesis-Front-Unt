import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';

import { Route } from '@angular/router';
import { DuplicadosValidadosComponent } from './secretaria/validados/validados.component';
import { DuplicadosValidadosResolver, DuplicadoValidadoResolver } from './secretaria/validados/validados.resolvers';
import { ValidarDuplicadosListComponent } from './secretaria/validados/list/list.component';
import { ValidarDuplicadoDetalleComponent } from './secretaria/validados/details/details.component';
import { DuplicadosAprobadosComponent } from './secretaria/aprobados/aprobados.component';
import { DuplicadosAprobadosListComponent } from './secretaria/aprobados/list/list.component';
import { DuplicadoAprobadoDetalleComponent } from './secretaria/aprobados/details/details.component';
import { DuplicadoAprobadoResolver, DuplicadosAprobadosValidadosResolver } from './secretaria/aprobados/aprobados.resolvers';


export const duplicadosRoutes: Route[] = [
    {
        path     : 'secretaria/validar',
        component: DuplicadosValidadosComponent,
        resolve  : {
            tramites : DuplicadosValidadosResolver,
        },
        children : [
            {
                path     : '',
                component: ValidarDuplicadosListComponent
            },
            {
                path         : ':idTramite',
                component    : ValidarDuplicadoDetalleComponent,
                resolve      : {
                    duplicado      : DuplicadoValidadoResolver,
                  },
                
            }          
           
        ]
    },
    {
        path     : 'secretaria/aprobar',
        component: DuplicadosAprobadosComponent,
        resolve  : {
            tramites : DuplicadosAprobadosValidadosResolver,
        },
        children : [
            {
                path     : '',
                component: DuplicadosAprobadosListComponent
            },
            {
                path         : ':idTramite',
                component    : DuplicadoAprobadoDetalleComponent,
                resolve      : {
                    duplicado      : DuplicadoAprobadoResolver,
                  },
                
            }          
           
        ]
    }
];