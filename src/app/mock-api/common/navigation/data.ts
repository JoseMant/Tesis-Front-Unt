/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'home',
        title: 'Inicio',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/home',
        permissions: []
    },
    {
        id   : 'usuarios',
        title: 'Usuarios',
        type : 'basic',
        icon : 'heroicons_outline:pencil-alt',
        link : '/usuarios',
    },
    {
        id   : 'tramites',
        title: 'Trámites',
        type : 'basic',
        icon : 'heroicons_outline:pencil-alt',
        link : '/tramites',
        permissions: ['ALUMNO']
    },
    {
        id   : 'certificados',
        title: 'Certificados',
        type : 'collapsable',
        icon : 'heroicons_outline:document-text',
        children: [
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'certificados.validados',
                title: 'Validados',
                type : 'basic',
                link : '/certificados/validados',
                permissions: ['URAA']
            },
            {
                // Se muestran al usuario para validar requisitos
                id   : 'certificados.asignados',
                title: 'Asignados',
                type : 'basic',
                link : '/certificados/asignados',
                permissions: ['URAA']
            },
            {
                // Se muestran para la firma del jefe de RT
                id   : 'certificados.aprobados',
                title: 'Aprobados',
                type : 'basic',
                link : '/certificados/aprobados',
                permissions: ['URAA']
            }
        ]
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
                link : '/vouchers/pendientes',
                permissions: ['TESORERÍA']
            },
            {
                id   : 'vouchers.aprobados',
                title: 'Aprobados',
                type : 'basic',
                link : '/vouchers/aprobados',
                permissions: ['TESORERÍA']
            },
            {
                id   : 'vouchers.rechazados',
                title: 'Rechazados',
                type : 'basic',
                link : '/vouchers/rechazados',
                permissions: ['TESORERÍA']
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
