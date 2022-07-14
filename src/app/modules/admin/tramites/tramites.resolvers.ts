import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { CertificadoService } from 'app/modules/admin/tramites/tramites.service';
import { CertificadoInterface } from 'app/modules/admin/tramites/tramites.types';
import { UserService } from 'app/core/user/user.service';

@Injectable({
    providedIn: 'root'
})

export class TramitesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _certificadoService: CertificadoService)
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

export class BancosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _certificadoService: CertificadoService)
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

