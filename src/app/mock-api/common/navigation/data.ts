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
        permissions: ['ADMIN']

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
                // Se muestran para subir el certificado
                id   : 'certificados.aprobados',
                title: 'Aprobados',
                type : 'basic',
                link : '/certificados/aprobados',
                permissions: ['URAA']
            },
            {
                // Se muestran para la firma del jefe de RT
                id   : 'certificados.firma_uraa',
                title: 'Firma URA-a',
                type : 'basic',
                link : '/certificados/firma_uraa',
                permissions: ['URAA']
            },
            {
                // Se muestran para la firma del jefe de RT
                id   : 'certificados.firma_decano',
                title: 'Firma Decano',
                type : 'basic',
                link : '/certificados/firma_decano',
                permissions: ['URAA']
            }
        ]
    },
    {
        id   : 'grados',
        title: 'Grados',
        type : 'collapsable',
        icon : 'heroicons_outline:document-text',
        children: [
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'grados.validados',
                title: 'Validados',
                type : 'basic',
                link : '/grados/validados',
                permissions: ['URAA']
            },
            // {
            //     // Se muestran al usuario para validar requisitos
            //     id   : 'certificados.asignados',
            //     title: 'Asignados',
            //     type : 'basic',
            //     link : '/certificados/asignados',
            //     permissions: ['URAA']
            // },
            {
                // Se muestran para subir el certificado
                id   : 'grados.aprobados',
                title: 'Aprobados',
                type : 'basic',
                link : '/grados/aprobados',
                permissions: ['URAA']
            },
            // {
            //     // Se muestran para la firma del jefe de RT
            //     id   : 'certificados.firma_uraa',
            //     title: 'Firma URA-a',
            //     type : 'basic',
            //     link : '/certificados/firma_uraa',
            //     permissions: ['URAA']
            // },
            // {
            //     // Se muestran para la firma del jefe de RT
            //     id   : 'certificados.firma_decano',
            //     title: 'Firma Decano',
            //     type : 'basic',
            //     link : '/certificados/firma_decano',
            //     permissions: ['URAA']
            // }
        ]
    },
    {
        id   : 'constancias',
        title: 'Constancias',
        type : 'collapsable',
        icon : 'heroicons_outline:document-text',
        children: [
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'constancias.validadas',
                title: 'Validadas',
                type : 'basic',
                link : '/constancias/validadas',
                permissions: ['URAA']
            },
            {
                // Se muestran al usuario para validar requisitos
                id   : 'constancias.asignadas',
                title: 'Asignadas',
                type : 'basic',
                link : '/constancias/asignadas',
                permissions: ['URAA']
            },
            {
                // Se muestran para la firma del jefe de RT
                id   : 'constancias.firma_uraa',
                title: 'Firma URA-a',
                type : 'basic',
                link : '/constancias/firma_uraa',
                permissions: ['URAA']
            },
            // {
            //     // Se muestran para la firma del jefe de RT
            //     id   : 'carnets.aprobados',
            //     title: 'Aprobados',
            //     type : 'basic',
            //     link : '/carnets/aprobados',
            //     permissions: ['URAA']
            // }
        ]
    },
    {
        id   : 'carnets',
        title: 'Carnets',
        type : 'collapsable',
        icon : 'heroicons_outline:document-text',
        children: [
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'carnets.validados',
                title: 'Validados',
                type : 'basic',
                link : '/carnets/validados',
                permissions: ['URAA']
            },
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
    },
    {
        id      : 'masters',
        title   : 'Maestros',
        subtitle: 'Tablas maestras',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        // permissions: [],
        children: [
            {
                id      : 'masters.access',
                title   : 'Accesos',
                type    : 'collapsable',
                icon    : 'heroicons_outline:lock-closed',
                children: [
                    {
                        id   : 'masters.access.users',
                        title: 'Usuarios',
                        type : 'basic',
                        link : '/masters/access/users',
                        permissions: ['ADMIN']
                    },
                    // {
                    //     id   : 'masters.access.permissions',
                    //     title: 'Permisos',
                    //     type : 'basic',
                    //     link : '/masters/access/permissions',
                    //     permissions: ['LEER PERMISOS','LEER TODOS LOS PERMISOS']
                    // },
                    // {
                    //     id   : 'masters.access.roles',
                    //     title: 'Roles',
                    //     type : 'basic',
                    //     link : '/masters/access/roles',
                    //     permissions: ['LEER ROLES','LEER TODOS LOS ROLES']
                    // }
                ]
            },
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
