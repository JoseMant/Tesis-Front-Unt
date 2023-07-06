import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { UniversidadesService } from 'app/shared/universidades/universidades.service';
import { UniversidadPagination, UniversidadInterface } from 'app/shared/universidades/universidades.types';


@Injectable({
    providedIn: 'root'
})
export class UniversidadEscuelaDiplomaResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _universidadesService: UniversidadesService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UniversidadInterface>
    {
        return this._universidadesService.getUniversidadById(Number(route.paramMap.get('idTramite')))
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

@Injectable({
    providedIn: 'root'
})
export class UniversidadesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _universidadesService: UniversidadesService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ data: UniversidadInterface[] }>
    {
        return this._universidadesService.getUniversidades();
    }
}
