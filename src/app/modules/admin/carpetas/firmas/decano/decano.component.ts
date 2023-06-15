import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'carpetas-firmas-decano',
    templateUrl    : './decano.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarpetasFirmasDecanoComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
