import { Route } from '@angular/router';
import { HomeComponent } from 'app/modules/admin/home/home.component';
import { HomeListComponent } from 'app/modules/admin/home/list/list.component';
import { HomeBrandsResolver, HomeCategoriesResolver, HomeProductsResolver, HomeTagsResolver, HomeVendorsResolver } from 'app/modules/admin/home/home.resolvers';

export const homeRoutes: Route[] = [
    // {
    //     path      : '',
    //     pathMatch : 'full',
    //     redirectTo: ''
    // },
    {
        path     : '',
        component: HomeComponent,
        children : [
            {
                path     : '',
                component: HomeListComponent,
                resolve  : {
                    brands    : HomeBrandsResolver,
                    categories: HomeCategoriesResolver,
                    products  : HomeProductsResolver,
                    tags      : HomeTagsResolver,
                    vendors   : HomeVendorsResolver
                }
            }
        ]
    }
];
