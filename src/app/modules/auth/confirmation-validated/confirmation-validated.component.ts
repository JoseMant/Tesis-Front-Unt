import { Component, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/core/auth/auth.service';
import { merge, Observable,fromEvent, Subject } from 'rxjs';
import { debounceTime, map, filter, switchMap, takeUntil } from 'rxjs/operators';

@Component({
    selector     : 'auth-confirmation-validated',
    templateUrl  : './confirmation-validated.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthConfirmationValidatedComponent
{
    message : any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _authService: AuthService
    ) { }

    ngOnInit(): void
    {
      // Get the pagination
        this._authService.message$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: any) => {
console.log(response);
                // Update the pagination
                this.message = response.message;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }
}
