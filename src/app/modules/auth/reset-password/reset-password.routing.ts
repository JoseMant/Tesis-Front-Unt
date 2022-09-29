import { Route } from '@angular/router';
import { AuthResetPasswordComponent } from 'app/modules/auth/reset-password/reset-password.component';
import { ResetPasswordResolver } from 'app/modules/auth/reset-password/reset-password.resolvers';

export const authResetPasswordRoutes: Route[] = [
    {
        path     : ':id',
        component: AuthResetPasswordComponent,
        resolve  : {
            validate: ResetPasswordResolver
        }
    }
];
