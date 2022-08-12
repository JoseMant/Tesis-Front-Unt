import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject, throwError, catchError } from 'rxjs';
import { TramiteService } from 'app/modules/admin/tramites/tramites.service';
import { TramiteInterface } from 'app/modules/admin/tramites/tramites.types';

@Injectable({
    providedIn: 'root'
})

export class TipoTramitesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _tramiteService: TramiteService,
        private _router: Router)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._tramiteService.getTipoTramites();
    }
}

@Injectable({
    providedIn: 'root'
})
export class BancosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _tramiteService: TramiteService,
        private _router: Router)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._tramiteService.getBancos();
    }
}


@Injectable({
    providedIn: 'root'
})
export class UnidadesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _tramiteService: TramiteService,
        private _router: Router)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._tramiteService.getUnidades();
    }
}


@Injectable({
    providedIn: 'root'
})
export class MotivosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _tramiteService: TramiteService,
        private _router: Router)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._tramiteService.getMotivos();
    }
}

@Injectable({
    providedIn: 'root'
})

export class TramitesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _tramiteService: TramiteService,
        private _router: Router)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {   
        return this._tramiteService.getTramites();
    }
}

@Injectable({
    providedIn: 'root'
})
export class TramiteResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _tramiteService: TramiteService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TramiteInterface>
    {
        return this._tramiteService.getTramiteById(Number(route.paramMap.get('id')))
                   .pipe(
                       // Error here means the requested tramite is not available
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
