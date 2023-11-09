import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IndicadoresService } from 'app/modules/admin/indicadores/indicadores.service';

@Injectable({
    providedIn: 'root'
})
export class IndicadoresResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _indicadoresService: IndicadoresService)
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
        return this._indicadoresService.getData();
    }
}
