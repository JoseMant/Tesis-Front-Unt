import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'oficios',
    templateUrl    : './oficios.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OficiosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
