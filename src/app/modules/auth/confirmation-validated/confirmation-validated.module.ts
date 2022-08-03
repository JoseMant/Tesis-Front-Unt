import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { AuthConfirmationValidatedComponent } from 'app/modules/auth/confirmation-validated/confirmation-validated.component';
import { authConfirmationValidatedRoutes } from 'app/modules/auth/confirmation-validated/confirmation-validated.routing';

@NgModule({
    declarations: [
        AuthConfirmationValidatedComponent
    ],
    imports     : [
        RouterModule.forChild(authConfirmationValidatedRoutes),
        MatButtonModule,
        FuseCardModule,
        SharedModule
    ]
})
export class AuthConfirmationValidatedModule
{
}
