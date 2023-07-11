import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { CarpetasService } from 'app/modules/admin/carpetas/carpetas.service';
import { CarpetasPagination, CarpetaInterface } from 'app/modules/admin/carpetas/carpetas.types';


@Injectable({
    providedIn: 'root'
})
export class CarpetaFinalizadaResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _carpetasService: CarpetasService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CarpetaInterface>
    {
        return this._carpetasService.getCarpetaById(Number(route.paramMap.get('idTramite')))
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
export class CarpetasFinalizadasResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _carpetasService: CarpetasService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: CarpetasPagination; data: CarpetaInterface[] }>
    {
        // debugger;
        return this._carpetasService.getCarpetasFinalizadas(Number(route.paramMap.get('idResolucion')))
                   .pipe(
                       // Error here means the requested resolucion is not available
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
export class ProgramasEstudiosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _carpetasService: CarpetasService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: CarpetasPagination; data: CarpetaInterface[] }>
    {
        return this._carpetasService.getProgramasEstudios();
    }
}
