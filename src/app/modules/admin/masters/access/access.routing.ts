import { Route } from '@angular/router';
import { CanDeactivateUsersDetails } from 'app/modules/admin/masters/access/users/users.guards';
import { UserResolver, UsersRolesResolver, UsersResolver, UsersUnidadesResolver, UsersTiposDocumentosResolver } from 'app/modules/admin/masters/access/users/users.resolvers';
import { UsersComponent } from 'app/modules/admin/masters/access/users/users.component';
import { UsersListComponent } from 'app/modules/admin/masters/access/users/list/list.component';
import { UsersDetailsComponent } from 'app/modules/admin/masters/access/users/details/details.component';

export const accessRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'users'
    },
    {
        path     : 'users',
        component: UsersComponent,
        children : [
            {
                path     : '',
                component: UsersListComponent,
                resolve  : {
                    users : UsersResolver,
                    // countries: UsersRolesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : UsersDetailsComponent,
                        resolve      : {
                            user  : UserResolver,
                            roles: UsersRolesResolver,
                            unidades: UsersUnidadesResolver,
                            tipos_documentos: UsersTiposDocumentosResolver
                        },
                        canDeactivate: [CanDeactivateUsersDetails]
                    }
                ]
            }
        ]
    }
];
