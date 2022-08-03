import { Route } from '@angular/router';
import { AuthConfirmationValidatedComponent } from 'app/modules/auth/confirmation-validated/confirmation-validated.component';
import { ValidationResolver } from 'app/modules/auth/confirmation-validated/confirmation-validated.resolvers';

export const authConfirmationValidatedRoutes: Route[] = [
    {
        path     : ':id',
        component: AuthConfirmationValidatedComponent,
        resolve  : {
            validate: ValidationResolver
        }
    }
];
