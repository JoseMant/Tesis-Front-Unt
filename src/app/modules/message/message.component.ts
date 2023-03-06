import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'auth-confirmation-required',
    templateUrl  : './message.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MessageComponent
{
    /**
     * Constructor
     */
    constructor(private _activatedRoute: ActivatedRoute, private _router: Router)
    {
    }
    continue(){
        // const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
        this._router.navigateByUrl('home');
    }
    

}
