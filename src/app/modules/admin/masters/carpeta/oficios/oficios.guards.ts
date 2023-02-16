import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OficiosDetailsComponent } from 'app/modules/admin/masters/carpeta/oficios/details/details.component';

@Injectable({
    providedIn: 'root'
})

export class CanDeactivateOficiosDetails implements CanDeactivate<OficiosDetailsComponent>
{
    canDeactivate(
        component: OficiosDetailsComponent,
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

        // If the next state doesn't contain '/oficios'
        // it means we are navigating away from the
        // oficios app
        if ( !nextState.url.includes('/oficios') )
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
