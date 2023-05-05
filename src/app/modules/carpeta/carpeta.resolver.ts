import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { CarpetaService } from 'app/modules/carpeta/carpeta.service';
import { Carpeta } from 'app/modules/carpeta/carpeta.types';

@Injectable({
    providedIn: 'root'
})
export class CarpetaResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _carpetaService: CarpetaService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Carpeta>
    {
        return this._carpetaService.getTramiteById(Number(route.paramMap.get('id')))
            .pipe(
                // Error here means the requested carpeta is not available
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
