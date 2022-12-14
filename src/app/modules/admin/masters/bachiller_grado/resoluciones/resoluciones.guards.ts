import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ResolucionesDetailsComponent } from 'app/modules/admin/masters/bachiller_grado/resoluciones/details/details.component';

@Injectable({
    providedIn: 'root'
})

export class CanDeactivateResolucionesDetails implements CanDeactivate<ResolucionesDetailsComponent>
{
    canDeactivate(
        component: ResolucionesDetailsComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        // Get the next route
        let nextRoute: ActivatedRouteSnapshot = nextState.root;
        while ( nextRoute.firstChild )
        {
            nextRoute = nextRoute.firstChild;
        }

        // If the next state doesn't contain '/resoluciones'
        // it means we are navigating away from the
        // resoluciones app
        if ( !nextState.url.includes('/resoluciones') )
        {
            // Let it navigate
            return true;
        }

        // If we are navigating to another user...
        if ( nextRoute.paramMap.get('id') )
        {
            // Just navigate
            return true;
        }
        // Otherwise...
        else
        {
            // Close the drawer first, and then navigate
            return component.closeDrawer().then(() => true);
        }
    }
}
