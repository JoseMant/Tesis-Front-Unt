import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'auth-confirmation-validated',
    templateUrl  : './confirmation-validated.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthConfirmationValidatedComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
