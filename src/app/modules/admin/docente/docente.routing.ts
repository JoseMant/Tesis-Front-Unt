import { Route } from '@angular/router';

import { ProfesionDocenteResolver,SedesResolver,CategoriaSGAResolver,DedicaionesDocenteResolver,DependenciasSGAResolver,
 DocenteRegistrosResolver,CrearDocenteResolver,DocenteValidacionesResolver,DocenteFinalizadosResolver,DocenteValidarResolver,PaisesResolver  } from 'app/modules/admin/docente/docente.resolvers';

import { NgxPermissionsGuard } from 'ngx-permissions';

import { RegistrarDocenteDetalleComponent } from 'app/modules/admin/docente/registrar/details/details.component';
import { RegistrarDocenteListComponent } from 'app/modules/admin/docente/registrar/list/list.component';

import { DocenteValidadicionesDetalleComponent } from 'app/modules/admin/docente/validacion/details/details.component';
import { DocenteValidacionesListComponent } from 'app/modules/admin/docente/validacion/list/list.component';

import { DocenteFinalizadosDetalleComponent } from 'app/modules/admin/docente/finalizados/details/details.component';
import { DocenteFinalizadosListComponent } from 'app/modules/admin/docente/finalizados/list/list.component';

import { DocenteComponent } from './docente.component';
export const docenteRoutes: Route[] = [
    {
        path     : 'registrar',
        component: DocenteComponent,
        resolve  : {
            tramites : DocenteRegistrosResolver,

            profesiones:ProfesionDocenteResolver,
            paises:PaisesResolver,
            sedes:SedesResolver,
            dependenciasSGA:DependenciasSGAResolver,
            categorias:CategoriaSGAResolver,
            dedicacionesDocente:DedicaionesDocenteResolver,
        },
        children : [
            {
                path     : '',
                component: RegistrarDocenteListComponent
            },
            {
                path         : ':idTramite',
                component    : RegistrarDocenteDetalleComponent,
                resolve      : {
                    docente      : CrearDocenteResolver,
                  },
                
            }          
           
        ]
    },
    {
        path     : 'validacion',
        component: DocenteComponent,
        resolve  : {
            tramites : DocenteValidacionesResolver,

            profesiones:ProfesionDocenteResolver,
            paises:PaisesResolver,
            sedes:SedesResolver,
            dependenciasSGA:DependenciasSGAResolver,
            categorias:CategoriaSGAResolver,
            dedicacionesDocente:DedicaionesDocenteResolver,
        },
        children : [
            {
                path     : '',
                component: DocenteValidacionesListComponent
            },
            {
                path         : ':idTramite',
                component    : DocenteValidadicionesDetalleComponent,
                resolve      : {
                    docente      : DocenteValidarResolver,
                  },
                
            }          
           
        ]
    },
    {
        path     : 'finalizados',
        component: DocenteComponent,
        resolve  : {
            tramites : DocenteFinalizadosResolver,
            
            profesiones:ProfesionDocenteResolver,
            paises:PaisesResolver,
            sedes:SedesResolver,
            dependenciasSGA:DependenciasSGAResolver,
            categorias:CategoriaSGAResolver,
            dedicacionesDocente:DedicaionesDocenteResolver,
        },
        children : [
            {
                path     : '',
                component: DocenteFinalizadosListComponent
            },
            {
                path         : ':idTramite',
                component    : DocenteFinalizadosDetalleComponent,
                resolve      : {
                    docente      : DocenteValidarResolver,
                  },
                
            }          
           
        ]
    }
];
