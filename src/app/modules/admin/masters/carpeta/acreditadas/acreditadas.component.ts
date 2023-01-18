import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'acreditadas',
    templateUrl    : './acreditadas.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcreditadasComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
