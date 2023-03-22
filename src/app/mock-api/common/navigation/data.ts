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
        id   : 'codigos.pago',
        title: 'Codigos de pago',
        type : 'basic',
        icon : 'heroicons_outline:photograph',
        link : '/codigos_pago',
        permissions: ['ALUMNO']
    },
    {
        id   : 'tramites',
        title: 'Registrar trámite',
        type : 'collapsable',
        icon : 'heroicons_outline:pencil-alt',
        children: [
            {
                id   : 'tramites.digitales',
                title: 'Trámite digital',
                type : 'basic',
                link : '/tramites/digitales',
                permissions: ['ALUMNO']
            },
            {
                id   : 'tramites.fisicos',
                title: 'Trámite físico',
                type : 'basic',
                link : '/tramites/fisicos',
                permissions: ['ADMINISTRADOR']
            },
        ]
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
                id   : 'grados.escuela.validados',
                title: 'Validados Escuela',
                type : 'basic',
                link : '/grados/escuela/validados',
                permissions: ['SECRETARIA(O) DE ESCUELA']
            },
            {
                // Se muestran para subir el certificado
                id   : 'grados.escuela.aprobados',
                title: 'Aprobados Escuela',
                type : 'basic',
                link : '/grados/escuela/aprobados',
                permissions: ['SECRETARIA(O) DE ESCUELA']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'grados.escuela.revalidados',
                title: 'Revalidados Escuela',
                type : 'basic',
                link : '/grados/escuela/revalidados',
                permissions: ['SECRETARIA(O) DE ESCUELA']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'grados.facultad.validados',
                title: 'Validados Facultad',
                type : 'basic',
                link : '/grados/facultad/validados',
                permissions: ['SECRETARIA(O) DE FACULTAD']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'grados.facultad.aprobados',
                title: 'Aprobados Facultad',
                type : 'basic',
                link : '/grados/facultad/aprobados',
                permissions: ['SECRETARIA(O) DE FACULTAD']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'grados.facultad.revalidados',
                title: 'Revalidados Facultad',
                type : 'basic',
                link : '/grados/facultad/revalidados',
                permissions: ['SECRETARIA(O) DE FACULTAD']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'grados.escuela.diplomas',
                title: 'Datos Diplomas en Escuela',
                type : 'basic',
                link : '/grados/escuela/diplomas',
                permissions: ['SECRETARIA(O) DE ESCUELA']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'grados.facultad.diplomas',
                title: 'Datos Diplomas en Facultad',
                type : 'basic',
                link : '/grados/facultad/diplomas',
                permissions: ['SECRETARIA(O) DE FACULTAD']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'grados.ura.validacion',
                title: 'Validación URA',
                type : 'basic',
                link : '/grados/ura/validacion',
                permissions: ['SUBUNIDAD DE GRADOS Y TÍTULOS']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'grados.ura.diplomas',
                title: 'Datos Diplomas en URA',
                type : 'basic',
                link : '/grados/ura/diplomas',
                permissions: ['SUBUNIDAD DE GRADOS Y TÍTULOS']
            },
            // {
            //     // Se muestran al usuario para ser asignados después de validación en tesorería
            //     id   : 'carpetas.firma.decano',
            //     title: 'Firma decano',
            //     type : 'basic',
            //     link : '/carpetas/firma/decano',
            //     permissions: ['ADMINISTRADOR']
            // },
            // {
            //     // Se muestran al usuario para ser asignados después de validación en tesorería
            //     id   : 'carpetas.firma.secretaria',
            //     title: 'Firma secretaria',
            //     type : 'basic',
            //     link : '/carpetas/firma/secretaria_general',
            //     permissions: ['ADMINISTRADOR'] //secretaria general
            // },
            // {
            //     // Se muestran al usuario para ser asignados después de validación en tesorería
            //     id   : 'carpetas.firma.rector',
            //     title: 'Firma rector',
            //     type : 'basic',
            //     link : '/carpetas/firma/rector',
            //     permissions: ['ADMINISTRADOR'] //Rector
            // },
        ]
    },
    {
        id   : 'titulos',
        title: 'Títulos',
        type : 'collapsable',
        icon : 'heroicons_outline:document-text',
        children: [
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos.escuela.validados',
                title: 'Validados Escuela',
                type : 'basic',
                link : '/titulos/escuela/validados',
                permissions: ['SECRETARIA(O) DE ESCUELA']
            },
            {
                // Se muestran para subir el certificado
                id   : 'titulos.escuela.aprobados',
                title: 'Aprobados Escuela',
                type : 'basic',
                link : '/titulos/escuela/aprobados',
                permissions: ['SECRETARIA(O) DE ESCUELA']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos.escuela.revalidados',
                title: 'Revalidados Escuela',
                type : 'basic',
                link : '/titulos/escuela/revalidados',
                permissions: ['SECRETARIA(O) DE ESCUELA']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos.facultad.validados',
                title: 'Validados Facultad',
                type : 'basic',
                link : '/titulos/facultad/validados',
                permissions: ['SECRETARIA(O) DE FACULTAD']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos.facultad.aprobados',
                title: 'Aprobados Facultad',
                type : 'basic',
                link : '/titulos/facultad/aprobados',
                permissions: ['SECRETARIA(O) DE FACULTAD']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos.facultad.revalidados',
                title: 'Revalidados Facultad',
                type : 'basic',
                link : '/titulos/facultad/revalidados',
                permissions: ['SECRETARIA(O) DE FACULTAD']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos.escuela.diplomas',
                title: 'Datos Diplomas en Escuela',
                type : 'basic',
                link : '/titulos/escuela/diplomas',
                permissions: ['SECRETARIA(O) DE ESCUELA']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos.facultad.diplomas',
                title: 'Datos Diplomas en Facultad',
                type : 'basic',
                link : '/titulos/facultad/diplomas',
                permissions: ['SECRETARIA(O) DE FACULTAD']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos.ura.validacion',
                title: 'Validación URA',
                type : 'basic',
                link : '/titulos/ura/validacion',
                permissions: ['SUBUNIDAD DE GRADOS Y TÍTULOS']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos.ura.diplomas',
                title: 'Datos Diplomas en URA',
                type : 'basic',
                link : '/titulos/ura/diplomas',
                permissions: ['SUBUNIDAD DE GRADOS Y TÍTULOS']
            }
        ]
    },
    {
        id   : 'titulos_SE',
        title: 'Títulos SE',
        type : 'collapsable',
        icon : 'heroicons_outline:document-text',
        children: [
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos_SE.especialidad.validados',
                title: 'Validados Especialidad',
                type : 'basic',
                link : '/titulos_SE/especialidad/validados',
                permissions: ['SECRETARIA(O) DE SEGUNDA ESPECIALIDAD']
            },
            {
                // Se muestran para subir el certificado
                id   : 'titulos_SE.especialidad.aprobados',
                title: 'Aprobados Especialidad',
                type : 'basic',
                link : '/titulos_SE/especialidad/aprobados',
                permissions: ['SECRETARIA(O) DE SEGUNDA ESPECIALIDAD']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos_SE.especialidad.revalidados',
                title: 'Revalidados Especialidad',
                type : 'basic',
                link : '/titulos_SE/especialidad/revalidados',
                permissions: ['SECRETARIA(O) DE SEGUNDA ESPECIALIDAD']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos_SE.facultad.validados',
                title: 'Validados Facultad',
                type : 'basic',
                link : '/titulos_SE/facultad/validados',
                permissions: ['SECRETARIA(O) DE FACULTAD']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos_SE.facultad.aprobados',
                title: 'Aprobados Facultad',
                type : 'basic',
                link : '/titulos_SE/facultad/aprobados',
                permissions: ['SECRETARIA(O) DE FACULTAD']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos_SE.facultad.revalidados',
                title: 'Revalidados Facultad',
                type : 'basic',
                link : '/titulos_SE/facultad/revalidados',
                permissions: ['SECRETARIA(O) DE FACULTAD']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos_SE.especialidad.diplomas',
                title: 'Datos Diplomas en Especialidad',
                type : 'basic',
                link : '/titulos_SE/especialidad/diplomas',
                permissions: ['SECRETARIA(O) DE SEGUNDA ESPECIALIDAD']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos_SE.facultad.diplomas',
                title: 'Datos Diplomas en Facultad',
                type : 'basic',
                link : '/titulos_SE/facultad/diplomas',
                permissions: ['SECRETARIA(O) DE FACULTAD']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos_SE.ura.validacion',
                title: 'Validación URA',
                type : 'basic',
                link : '/titulos_SE/ura/validacion',
                permissions: ['SUBUNIDAD DE GRADOS Y TÍTULOS']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'titulos_SE.ura.diplomas',
                title: 'Datos Diplomas en URA',
                type : 'basic',
                link : '/titulos_SE/ura/diplomas',
                permissions: ['SUBUNIDAD DE GRADOS Y TÍTULOS']
            }
        ]
    },
    {
        id   : 'carpetas',
        title: 'Carpetas',
        type : 'collapsable',
        icon : 'heroicons_outline:document-text',
        children: [
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'carpetas.secretaria.validados',
                title: 'Validados Secretaria',
                type : 'basic',
                link : '/grados/secretaria/validados',
                permissions: ['SECRETARÍA GENERAL', 'SECRETARIA DE SECRETARÍA GENERAL']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'carpetas.ura.pendientes',
                title: 'Pendientes Impresión URA',
                type : 'basic',
                link : '/grados/ura/pendientes',
                permissions: ['SUBUNIDAD DE GRADOS Y TÍTULOS']
            },
            {
                // Se muestran al usuario para ser asignados después de validación en tesorería
                id   : 'secretaria.observados',
                title: 'Secretaría Observados',
                type : 'basic',
                link : '/grados/secretaria/observados',
                permissions: ['SECRETARÍA GENERAL', 'SECRETARIA DE SECRETARÍA GENERAL']
            }
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
        id   : 'reportes',
        title: 'Reportes',
        type : 'collapsable',
        icon : 'heroicons_outline:document-text',
        children: [
            {
                id   : 'reportes.elaboracion_carpeta',
                title: 'Elaboración de carpeta',
                type : 'basic',
                link : '/reportes/elaboracion_carpeta',
                permissions: ['ADMINISTRADOR','SECRETARIA(O) DE FACULTAD', 'SECRETARIA(O) DE FACULTAD']

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
                id      : 'masters.carpeta',
                title   : 'Carpeta',
                type    : 'collapsable',
                icon    : 'heroicons_outline:lock-closed',
                children: [
                    {
                        id   : 'masters.carpeta.cronogramas',
                        title: 'Cronogramas',
                        type : 'basic',
                        link : '/masters/carpeta/cronogramas',
                        permissions: ['SECRETARIA(O) DE FACULTAD']
                    },
                    {
                        id   : 'masters.carpeta.resoluciones',
                        title: 'Resoluciones',
                        type : 'basic',
                        link : '/masters/carpeta/resoluciones',
                        permissions: ['SECRETARÍA GENERAL', 'SECRETARIA DE SECRETARÍA GENERAL']
                    },
                    {
                        id   : 'masters.carpeta.oficios',
                        title: 'Oficios',
                        type : 'basic',
                        link : '/masters/carpeta/oficios',
                        permissions: ['SECRETARÍA GENERAL', 'SECRETARIA DE SECRETARÍA GENERAL']
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
