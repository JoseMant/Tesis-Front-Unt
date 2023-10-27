import { Route } from '@angular/router';
import { VouchersPendientesComponent } from 'app/modules/admin/vouchers/pendientes/pendientes.component';
import { VouchersPendientesListComponent } from 'app/modules/admin/vouchers/pendientes/list/list.component';
import { VouchersPendientesResolver } from 'app/modules/admin/vouchers/pendientes/pendientes.resolvers';
import { VouchersAprobadosComponent } from 'app/modules/admin/vouchers/aprobados/aprobados.component';
import { VouchersAprobadosListComponent } from 'app/modules/admin/vouchers/aprobados/list/list.component';
import { VouchersAprobadosResolver } from 'app/modules/admin/vouchers/aprobados/aprobados.resolvers';
import { VouchersRechazadosComponent } from 'app/modules/admin/vouchers/rechazados/rechazados.component';
import { VouchersRechazadosListComponent } from 'app/modules/admin/vouchers/rechazados/list/list.component';
import { VouchersRechazadosResolver } from 'app/modules/admin/vouchers/rechazados/rechazados.resolvers';
import { BancosResolver  } from 'app/modules/admin/vouchers/pendientes/pendientes.resolvers';

import { NgxPermissionsGuard } from 'ngx-permissions';

export const vouchersRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'pendientes'
    },
    {
        path     : 'pendientes',
        component: VouchersPendientesComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['ADMINISTRADOR', 'DIRECCIÓN DE TESORERÍA','SECRETARIA(O) DE ESCUELA','SECRETARIA(O) DE SEGUNDA ESPECIALIDAD'],
                redirectTo: 'home'
            }
        },
        children : [
            {
                path     : '',
                component: VouchersPendientesListComponent,
                resolve  : {
                    bancos: BancosResolver,
                    vouchers  : VouchersPendientesResolver,
                }
            }
        ]
    },
    {
        path     : 'aprobados',
        component: VouchersAprobadosComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['ADMINISTRADOR', 'DIRECCIÓN DE TESORERÍA','SECRETARIA(O) DE ESCUELA','SECRETARIA(O) DE SEGUNDA ESPECIALIDAD'],
                redirectTo: 'home'
            }
        },
        children : [
            {
                path     : '',
                component: VouchersAprobadosListComponent,
                resolve  : {
                    vouchers  : VouchersAprobadosResolver,
                }
            }
        ]
    },
    {
        path     : 'rechazados',
        component: VouchersRechazadosComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['ADMINISTRADOR', 'DIRECCIÓN DE TESORERÍA','SECRETARIA(O) DE ESCUELA','SECRETARIA(O) DE SEGUNDA ESPECIALIDAD'],
                redirectTo: 'home'
            }
        },
        children : [
            {
                path     : '',
                component: VouchersRechazadosListComponent,
                resolve  : {
                    vouchers  : VouchersRechazadosResolver,
                }
            }
        ]
    }
];
