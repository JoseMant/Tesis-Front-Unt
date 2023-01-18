import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AcreditadasService } from 'app/modules/admin/masters/bachiller_grado/acreditadas/acreditadas.service';
import { Acreditada, Unidad } from 'app/modules/admin/masters/bachiller_grado/acreditadas/acreditadas.types';

@Injectable({
    providedIn: 'root'
})
export class AcreditadasResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _acreditadasService: AcreditadasService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Acreditada[]>
    {
        return this._acreditadasService.getAcreditadas();
    }
}

@Injectable({
    providedIn: 'root'
})
export class AcreditadaResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _acreditadasService: AcreditadasService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Acreditada>
    {
        return this._acreditadasService.getAcreditadaById(Number(route.paramMap.get('id')))
                   .pipe(
                       // Error here means the requested acreditada is not available
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
export class AcreditadasUnidadesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _acreditadasService: AcreditadasService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Unidad[]>
    {
        return this._acreditadasService.getUnidades();
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserDependenciaResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _acreditadasService: AcreditadasService)
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
        return this._acreditadasService.getUserDependencia();
    }
}
