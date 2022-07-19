import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { CertificadoService } from 'app/modules/admin/tramites/tramites.service';

@Injectable({
    providedIn: 'root'
})

export class TramitesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _certificadoService: CertificadoService,
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
        return this._certificadoService.getTipoTramites();
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
    constructor(private _certificadoService: CertificadoService,
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
        return this._certificadoService.getBancos();
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
    constructor(private _certificadoService: CertificadoService,
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
        return this._certificadoService.getUnidades();
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
    constructor(private _certificadoService: CertificadoService,
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
        return this._certificadoService.getMotivos();
    }
}
