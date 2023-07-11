import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'carpetas-finalizadas',
    templateUrl    : './finalizados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarpetasFinalizadasComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
