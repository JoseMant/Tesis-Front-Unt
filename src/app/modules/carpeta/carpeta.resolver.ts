import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, catchError,throwError } from 'rxjs';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class CarpetaResolver implements Resolve<any> {
  constructor(private _services:ServicesService, private _router: Router){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this._services.getDatos(route.paramMap.get('id'))
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
