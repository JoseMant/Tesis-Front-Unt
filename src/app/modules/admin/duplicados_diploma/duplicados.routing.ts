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
import { DuplicadoAprobadoResolver, DuplicadosAprobadosResolver } from './secretaria/aprobados/aprobados.resolvers';
import { DuplicadosValidadosUraComponent } from './ura/validados/validados.component';
import { DuplicadosValidadosUraResolver, DuplicadoValidadoUraResolver,TiposTramitesResolver } from './ura/validados/validados.resolvers';
import { DuplicadosValidacionUraListComponent } from './ura/validados/list/list.component';
import { DuplicadoUraDetalleComponent } from './ura/validados/details/details.component';
// ------------------------
import { DuplicadosDatosDiplomaComponent } from './ura/diplomas/diplomas.component';
import { DuplicadosDatosDiplomaResolver, DuplicadoDatosDiplomaResolver, ProgramasEstudiosResolver} from './ura/diplomas/diplomas.resolvers';
import { DuplicadosDatosDiplomaListComponent } from './ura/diplomas/list/list.component';
import { DuplicadoDatosDiplomaDetalleComponent } from './ura/diplomas/details/details.component';
import { UniversidadesResolver } from 'app/shared/universidades/universidades.resolvers';
//--------------------------
import { DuplicadosRevalidadosComponent } from './secretaria/revalidados/revalidados.component';
import { DuplicadosRevalidadosResolver, DuplicadoRevalidadoResolver } from './secretaria/revalidados/revalidados.resolvers';
import { DuplicadosRevalidadosListComponent } from './secretaria/revalidados/list/list.component';
import { DuplicadoRevalidadosDetalleComponent } from './secretaria/revalidados/details/details.component';

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
            tramites : DuplicadosAprobadosResolver,
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
    },
    {
        path     : 'ura/validar',
        component: DuplicadosValidadosUraComponent,
        resolve  : {
            tramites : DuplicadosValidadosUraResolver,
            tipos_tramites: TiposTramitesResolver,
        },
        children : [
            {
                path     : '',
                component: DuplicadosValidacionUraListComponent,
            },
            {
                path         : ':idTramite',
                component    : DuplicadoUraDetalleComponent,
                resolve      : {
                    duplicado      : DuplicadoValidadoUraResolver,
                  },
                
            }          
           
        ]
    },
    {
        path     : 'ura/datos/diploma',
        component: DuplicadosDatosDiplomaComponent,
        resolve  : {
            tramites : DuplicadosDatosDiplomaResolver,
            tipos_tramites: TiposTramitesResolver,
        },
        children : [
            {
                path     : '',
                component: DuplicadosDatosDiplomaListComponent,
            },
            {
                path         : ':idTramite',
                component    : DuplicadoDatosDiplomaDetalleComponent,
                resolve      : {
                    duplicado      : DuplicadoDatosDiplomaResolver,
                    programas_estudios: ProgramasEstudiosResolver,
                    universidades: UniversidadesResolver
                  },
                
            }          
           
        ]
    },
    {
        path     : 'secretaria/revalidar',
        component: DuplicadosRevalidadosComponent,
        resolve  : {
            tramites : DuplicadosRevalidadosResolver
        },
        children : [
            {
                path     : '',
                component: DuplicadosRevalidadosListComponent,
            },
            {
                path         : ':idTramite',
                component    : DuplicadoRevalidadosDetalleComponent,
                resolve      : {
                    duplicado      : DuplicadoRevalidadoResolver,
                  },
                
            }          
           
        ]
    },
];