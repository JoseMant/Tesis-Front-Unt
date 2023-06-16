import { Route } from '@angular/router';
import { ModalidadesSustentacionResolver } from 'app/modules/admin/grados/escuela/diplomas/diplomas.resolvers';
// -------------
import { CarpetasSecretariaValidadosComponent } from 'app/modules/admin/carpetas/secretaria/validados/validados.component';
import { CarpetasSecretariaValidadosListComponent } from 'app/modules/admin/carpetas/secretaria/validados/list/list.component';
import { CarpetasSecretariaValidadosResolver, CarpetasSecretariaValidadoResolver, ProgramasEstudiosResolver } from 'app/modules/admin/carpetas/secretaria/validados/validados.resolvers';
import { CarpetasSecretariaValidadosDetalleComponent } from 'app/modules/admin/carpetas/secretaria/validados/details/details.component';

// -------------
import { CarpetasURAPendientesComponent } from 'app/modules/admin/carpetas/ura/pendientes/pendientes.component';
import { CarpetasURAPendientesListComponent } from 'app/modules/admin/carpetas/ura/pendientes/list/list.component';
import { CarpetasURAPendientesResolver } from 'app/modules/admin/carpetas/ura/pendientes/pendientes.resolvers';

// ----
import { CarpetasFirmasDecanoComponent } from 'app/modules/admin/carpetas/firmas/decano/decano.component';
import { CarpetasFirmasDecanoListComponent } from 'app/modules/admin/carpetas/firmas/decano/list/list.component';
import { CarpetasFirmasDecanoResolver } from 'app/modules/admin/carpetas/firmas/decano/decano.resolvers';
// ----
import { CarpetasFirmasRectorComponent } from 'app/modules/admin/carpetas/firmas/rector/rector.component';
import { CarpetasFirmasRectorListComponent } from 'app/modules/admin/carpetas/firmas/rector/list/list.component';
import { CarpetasFirmasRectorResolver } from 'app/modules/admin/carpetas/firmas/rector/rector.resolvers';
// ----
import { CarpetasFirmasSecretariaGeneralComponent } from 'app/modules/admin/carpetas/firmas/secretaria_general/secretaria_general.component';
import { CarpetasFirmasSecretariaGeneralListComponent } from 'app/modules/admin/carpetas/firmas/secretaria_general/list/list.component';
import { CarpetasFirmasSecretariaGeneralResolver } from 'app/modules/admin/carpetas/firmas/secretaria_general/secretaria_general.resolvers';

import { NgxPermissionsGuard } from 'ngx-permissions';


export const carpetasRoutes: Route[] = [
    {
      path     : 'secretaria/validados',
      component: CarpetasSecretariaValidadosComponent,
      children : [
        {
          path     : '',
          component: CarpetasSecretariaValidadosListComponent,
        },
        {
          path     : ':idResolucion',
          component: CarpetasSecretariaValidadosListComponent,
          resolve      : {
            carpetas  : CarpetasSecretariaValidadosResolver,
          },
        },
        {
          path         : ':idResolucion/:idTramite',
          component    : CarpetasSecretariaValidadosDetalleComponent,
          resolve      : {
            carpetas  : CarpetasSecretariaValidadoResolver,
            modalidades: ModalidadesSustentacionResolver,
            programas_estudios: ProgramasEstudiosResolver,
          },
        }
      ]
    },
    {
      path     : 'firmas/decano',
      component: CarpetasFirmasDecanoComponent,
      children : [
        {
          path     : '',
          component: CarpetasFirmasDecanoListComponent,
        },
        {
          path     : ':idResolucion',
          component: CarpetasFirmasDecanoListComponent,
          resolve      : {
            carpetas  : CarpetasFirmasDecanoResolver,
          },
        }
      ]
    },
    {
      path     : 'firmas/rector',
      component: CarpetasFirmasRectorComponent,
      children : [
        {
          path     : '',
          component: CarpetasFirmasRectorListComponent,
        },
        {
          path     : ':idResolucion',
          component: CarpetasFirmasRectorListComponent,
          resolve      : {
            carpetas  : CarpetasFirmasRectorResolver,
          },
        }
      ]
    },
    {
      path     : 'firmas/secretaria_general',
      component: CarpetasFirmasSecretariaGeneralComponent,
      children : [
        {
          path     : '',
          component: CarpetasFirmasSecretariaGeneralListComponent,
        },
        {
          path     : ':idResolucion',
          component: CarpetasFirmasSecretariaGeneralListComponent,
          resolve      : {
            carpetas  : CarpetasFirmasSecretariaGeneralResolver,
          },
        }
      ]
    },
    {
      path     : 'ura/pendientes',
      component: CarpetasURAPendientesComponent,
      children : [
        {
          path     : '',
          component: CarpetasURAPendientesListComponent,
        },
        {
          path     : ':idResolucion',
          component: CarpetasURAPendientesListComponent,
          resolve      : {
            carpetas  : CarpetasURAPendientesResolver,
          },
        }
      ]
    }
];
