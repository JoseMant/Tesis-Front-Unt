/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'home',
        title: 'Inicio',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/home'
    },
    {
        id   : 'tramites',
        title: 'Trámites',
        type : 'basic',
        icon : 'heroicons_outline:pencil-alt',
        link : '/tramites',
    },
    {
        id   : 'vouchers',
        title: 'Vouchers',
        type : 'collapsable',
        icon : 'heroicons_outline:archive',
        children: [
            {
                id   : 'vouchers.pendientes',
                title: 'Pendientes',
                type : 'basic',
                link : '/vouchers/pendientes'
            },
            {
                id   : 'vouchers.aprobados',
                title: 'Aprobados',
                type : 'basic',
                link : '/vouchers/aprobados'
            },
            {
                id   : 'vouchers.rechazados',
                title: 'Rechazados',
                type : 'basic',
                link : '/vouchers/rechazados'
            }
        ]
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
