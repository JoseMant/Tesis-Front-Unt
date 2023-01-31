import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'home'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'home'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'confirmation-validated', loadChildren: () => import('app/modules/auth/confirmation-validated/confirmation-validated.module').then(m => m.AuthConfirmationValidatedModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            // {path: 'home2', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
            // Maintenance
            // {path: 'maintenance', loadChildren: () => import('app/modules/maintenance/maintenance.module').then(m => m.MaintenanceModule)},
            {path: 'mensaje', loadChildren: () => import('app/modules/message/message.module').then(m => m.MessageModule)},
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/admin/home/home.module').then(m => m.HomeModule)},
            {path: 'tramites', loadChildren: () => import('app/modules/admin/tramites/tramites.module').then(m => m.TramitesModule)},
            {path: 'codigos_pago', loadChildren: () => import('app/modules/admin/codigos_pago/codigos_pago.module').then(m => m.CodigosPagoModule)},
            {path: 'vouchers', loadChildren: () => import('app/modules/admin/vouchers/vouchers.module').then(m => m.VouchersModule)},
            {path: 'certificados', loadChildren: () => import('app/modules/admin/certificados/certificados.module').then(m => m.CertificadosModule)},
            {path: 'grados', loadChildren: () => import('app/modules/admin/grados/grados.module').then(m => m.GradosModule)},
            {path: 'titulos', loadChildren: () => import('app/modules/admin/titulos/titulos.module').then(m => m.TitulosModule)},
            {path: 'carnets', loadChildren: () => import('app/modules/admin/carnets/carnets.module').then(m => m.CarnetsModule)},
            {path: 'constancias', loadChildren: () => import('app/modules/admin/constancias/constancias.module').then(m => m.ConstanciasModule)},
            // Ajustes
            {path: 'settings', loadChildren: () => import('app/modules/admin/settings/settings.module').then(m => m.SettingsModule)},
            // Masters
            {path: 'masters', children: [
                {path: 'access', loadChildren: () => import('app/modules/admin/masters/access/access.module').then(m => m.AccessModule)},
                {path: 'carpeta', loadChildren: () => import('app/modules/admin/masters/carpeta/carpeta.module').then(m => m.CarpetaModule)},
            ]},
        ]
    }
];
