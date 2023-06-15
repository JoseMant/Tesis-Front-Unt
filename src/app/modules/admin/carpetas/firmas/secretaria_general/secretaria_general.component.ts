import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'carpetas-firmas-secretaria_general',
    templateUrl    : './secretaria_general.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarpetasFirmasSecretariaGeneralComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
