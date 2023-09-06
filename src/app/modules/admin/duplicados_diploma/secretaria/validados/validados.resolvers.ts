import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { DuplicadosDiplomaService } from 'app/modules/admin/duplicados_diploma/duplicados.service';
import { DuplicadosDiplomasInterface,DuplicadosDiplomasPagination } from 'app/modules/admin/duplicados_diploma/duplicados.types';

@Injectable({
    providedIn: 'root'
})
export class DuplicadosValidadosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _duplicadosService: DuplicadosDiplomaService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: DuplicadosDiplomasPagination; data: DuplicadosDiplomasInterface[] }>
    {
        return this._duplicadosService.getSolicitudesDuplicados();
    }
}

@Injectable({
    providedIn: 'root'
})
export class DuplicadoValidadoResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _duplicadosService: DuplicadosDiplomaService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DuplicadosDiplomasInterface>
    {
        return this._duplicadosService.getDuplicadoByid(Number(route.paramMap.get('idTramite')))
                   .pipe(
                       // Error here means the requested madurity_level is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}