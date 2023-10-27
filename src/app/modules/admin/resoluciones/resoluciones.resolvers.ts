import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject, throwError, catchError } from 'rxjs';
import { ResolucionesService, } from './resoluciones.service';
import { TramitesResolucionesInterface, TramitesResolucionesPagination } from './resoluciones.types';
@Injectable({
    providedIn: 'root'
})
export class ResolucionesValidarResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _resolucionesService: ResolucionesService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: TramitesResolucionesPagination; data: TramitesResolucionesInterface[] }>
    {
        return this._resolucionesService.getResolucionesValidar();
    }
}
@Injectable({
    providedIn: 'root'
})
export class ValidarResolucionResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _resolucionesService: ResolucionesService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TramitesResolucionesInterface>
    {
        return this._resolucionesService.getResolucionByid(Number(route.paramMap.get('idTramite')))
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
export class ResolucionesObservadosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _resolucionesService: ResolucionesService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: TramitesResolucionesPagination; data: TramitesResolucionesInterface[] }>
    {
        return this._resolucionesService.getResolucionesObservadas();
    }
}
@Injectable({
    providedIn: 'root'
})
export class ResolucionesFinalizadosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _resolucionesService: ResolucionesService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: TramitesResolucionesPagination; data: TramitesResolucionesInterface[] }>
    {
        return this._resolucionesService.getResolucionesFinalizadas();
    }
}

@Injectable({
    providedIn: 'root'
})
export class ResolucionFinalizadoResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _resolucionesService: ResolucionesService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TramitesResolucionesInterface>
    {
        return this._resolucionesService.getResolucionByid(Number(route.paramMap.get('idTramite')))
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
