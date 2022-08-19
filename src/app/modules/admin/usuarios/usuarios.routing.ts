import { Route } from '@angular/router';
import { CanDeactivateUsuariosDetails } from 'app/modules/admin/usuarios/usuarios.guards';
import { UsuariosUsuarioResolver, UsuariosResolver } from 'app/modules/admin/usuarios/usuarios.resolvers';
import { UsuariosComponent } from 'app/modules/admin/usuarios/usuarios.component';
import { UsuariosListComponent } from 'app/modules/admin/usuarios/list/list.component';
import { UsuariosDetailsComponent } from 'app/modules/admin/usuarios/details/details.component';

export const usuariosRoutes: Route[] = [
    {
        path     : '',
        component: UsuariosComponent,
        children : [
            {
                path     : '',
                component: UsuariosListComponent,
                resolve  : {
                    usuarios : UsuariosResolver
                },
                children : [
                    {
                        path         : ':idUsuario',
                        component    : UsuariosDetailsComponent,
                        resolve      : {
                            usuario  : UsuariosUsuarioResolver
                        },
                        canDeactivate: [CanDeactivateUsuariosDetails]
                    }
                ]
            }
        ]
    }
];
