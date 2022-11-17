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
                permissions: ['JEFE DE SUBUNIDAD DE NOTAS Y CERTIFICADOS']
            },
            {
                // Se muestran al usuario para validar requisitos
                id   : 'certificados.asignados',
                title: 'Asignados',
                type : 'basic',
                link : '/certificados/asignados',
                permissions: ['JEFE DE SUBUNIDAD DE NOTAS Y CERTIFICADOS','SUBUNIDAD DE NOTAS Y CERTIFICADOS']
            },
            {
                // Se muestran para subir el certificado
                id   : 'certificados.aprobados',
                title: 'Aprobados',
                type : 'basic',
                link : '/certificados/aprobados',
                permissions: ['JEFE DE SUBUNIDAD DE NOTAS Y CERTIFICADOS','SUBUNIDAD DE NOTAS Y CERTIFICADOS']
            },
            {
                // Se muestran para la firma del jefe de RT
                id   : 'certificados.firma_uraa',
                title: 'Firma URA-a',
                type : 'basic',
                link : '/certificados/firma_uraa',
                permissions: ['JEFE UNIDAD DE REGISTROS ACADÉMICOS']
            },
            {
                // Se muestran para la firma del jefe de RT
                id   : 'certificados.firma_decano',
                title: 'Firma Decano',
                type : 'basic',
                link : '/certificados/firma_decano',
                permissions: ['DECANO(A)']
            },
            {
                // Se muestran para la firma del jefe de RT
                id   : 'certificados.finalizados',
                title: 'Finalizados',
                type : 'basic',
                link : '/certificados/finalizados',
                permissions: ['JEFE DE SUBUNIDAD DE NOTAS Y CERTIFICADOS']
            },
            {
                // Se muestran para la firma del jefe de RT
                id   : 'certificados.reasignados',
                title: 'Reasignados',
                type : 'basic',
                link : '/certificados/reasignados',
                permissions: ['JEFE UNIDAD DE REGISTROS ACADÉMICOS', 'JEFE DE SUBUNIDAD DE NOTAS Y CERTIFICADOS']
            },
            {
                // Se muestran para la firma del jefe de RT
                id   : 'certificados.pendientes',
                title: 'Pendientes',
                type : 'basic',
                link : '/certificados/pendientes',
                permissions: ['JEFE UNIDAD DE REGISTROS ACADÉMICOS', 'JEFE DE SUBUNIDAD DE NOTAS Y CERTIFICADOS']
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
                title: 'Validados Escuela',
                type : 'basic',
                link : '/grados/escuela/validados',
                permissions: ['SUBUNIDAD DE GRADOS Y TÍTULOS']
            },
            {
                // Se muestran para subir el certificado
                id   : 'grados.aprobados',
                title: 'Aprobados Escuela',
                type : 'basic',
                link : '/grados/escuela/aprobados',
                permissions: ['SUBUNIDAD DE GRADOS Y TÍTULOS']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'grados.revalidados',
                title: 'Revalidados Escuela',
                type : 'basic',
                link : '/grados/escuela/revalidados',
                permissions: ['SUBUNIDAD DE GRADOS Y TÍTULOS']
            },
            // {
            //     // Se muestran al usuario para ser asignados después de validación en tesorería
            //     id   : 'grados.validados',
            //     title: 'Validados Facultad',
            //     type : 'basic',
            //     link : '/grados/validados/facultad',
            //     permissions: ['SUBUNIDAD DE GRADOS Y TÍTULOS']
            // },
            // {
            //     // Se muestran al usuario para ser asignados después de validación en tesorería
            //     id   : 'grados.aprobados',
            //     title: 'Aprobados Facultad',
            //     type : 'basic',
            //     link : '/grados/aprobados/facultad',
            //     permissions: ['SUBUNIDAD DE GRADOS Y TÍTULOS']
            // },
            // {
            //     // Se muestran al usuario para ser asignados después de validación en tesorería
            //     id   : 'grados.revalidados',
            //     title: 'Revalidados Facultad',
            //     type : 'basic',
            //     link : '/grados/revalidados/facultad',
            //     permissions: ['SUBUNIDAD DE GRADOS Y TÍTULOS']
            // },
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
                permissions: ['ADMINISTRADOR']
            },
            {
                // Se muestran al usuario para validar requisitos
                id   : 'constancias.asignadas',
                title: 'Asignadas',
                type : 'basic',
                link : '/constancias/asignadas',
                permissions: ['ADMINISTRADOR']
            },
            {
                // Se muestran para la firma del jefe de RT
                id   : 'constancias.firma_uraa',
                title: 'Firma URA-a',
                type : 'basic',
                link : '/constancias/firma_uraa',
                permissions: ['ADMINISTRADOR']
            },
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
                id   : 'carnets.regulares',
                title: 'Regulares',
                type : 'basic',
                link : '/carnets/regulares',
                permissions: ['SUBUNIDAD DE MATRÍCULAS-CARNÉS']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'carnets.duplicados',
                title: 'Duplicados',
                type : 'basic',
                link : '/carnets/duplicados',
                permissions: ['SUBUNIDAD DE MATRÍCULAS-CARNÉS']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'carnets.aprobados',
                title: 'Aprobados',
                type : 'basic',
                link : '/carnets/aprobados',
                permissions: ['SUBUNIDAD DE MATRÍCULAS-CARNÉS']
            },
            {
                // Se muestran los trámites de carnets solicitados a SUNEDU
                id   : 'carnets.solicitados',
                title: 'Solicitados',
                type : 'basic',
                link : '/carnets/solicitados',
                permissions: ['SUBUNIDAD DE MATRÍCULAS-CARNÉS']
            },
            {
                // Se muestran los trámites de carnets recibidos por la Secretaria
                id   : 'carnets.recibidos',
                title: 'Recibidos',
                type : 'basic',
                link : '/carnets/recibidos',
                permissions: ['SUBUNIDAD DE MATRÍCULAS-CARNÉS', 'SECRETARIA(O) DE ESCUELA']
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
                permissions: ['DIRECCIÓN DE TESORERÍA']
            },
            {
                id   : 'vouchers.aprobados',
                title: 'Aprobados',
                type : 'basic',
                link : '/vouchers/aprobados',
                permissions: ['DIRECCIÓN DE TESORERÍA']
            },
            {
                id   : 'vouchers.rechazados',
                title: 'Rechazados',
                type : 'basic',
                link : '/vouchers/rechazados',
                permissions: ['DIRECCIÓN DE TESORERÍA']
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
                        permissions: ['ADMINISTRADOR']
                    },
                ]
            },
            {
                id      : 'masters.bachiller_grado',
                title   : 'Bachiller / Grado Título',
                type    : 'collapsable',
                icon    : 'heroicons_outline:lock-closed',
                children: [
                    {
                        id   : 'masters.bachiller_grado.cronogramas',
                        title: 'Cronogramas',
                        type : 'basic',
                        link : '/masters/bachiller_grado/cronogramas',
                        permissions: ['ADMINISTRADOR','SECRETARIA(O) DE FACULTAD']
                    }
                ]
            },
        ],
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
