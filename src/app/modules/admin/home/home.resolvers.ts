import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { HomeService } from 'app/modules/admin/home/home.service';
import { TramiteService } from 'app/modules/admin/tramites/tramites.service';
import { HomePagination, HomeTramite } from 'app/modules/admin/home/home.types';
import { TramiteInterface } from '../tramites/tramites.types';

@Injectable({
    providedIn: 'root'
})
export class HomeTramiteResolver implements Resolve<any>
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
        return this._tramiteService.getTramite(Number(route.paramMap.get('id')))
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

@Injectable({
    providedIn: 'root'
})
export class HomeTramitesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _tramiteService: TramiteService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: HomePagination; data: TramiteInterface[] }>
    {
        return this._tramiteService.getTramites();
    }
}
