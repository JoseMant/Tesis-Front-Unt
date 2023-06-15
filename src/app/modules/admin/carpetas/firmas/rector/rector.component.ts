import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'carpetas-firmas-rector',
    templateUrl    : './rector.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarpetasFirmasRectorComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
