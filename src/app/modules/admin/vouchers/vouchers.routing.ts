import { Route } from '@angular/router';
import { VouchersPendientesListComponent } from './vouchersPendientes/list/list.component';
import { VouchersPendientesComponent } from './vouchersPendientes/vouchersPendientes.component';
import { VouchersPendientesResolver } from './vouchersPendientes/vouchersPendientes.resolvers';

export const vouchersPendientesRoutes: Route[] = [
    {
        path     : 'vouchersPendientes',
        component: VouchersPendientesComponent,
        children : [
            {
                path     : '',
                component: VouchersPendientesListComponent,
                resolve  : {
                    vouchersPendientes       : VouchersPendientesResolver
                }
            }
        ]
    }
];
