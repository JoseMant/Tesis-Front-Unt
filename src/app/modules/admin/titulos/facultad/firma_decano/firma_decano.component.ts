import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'grados-firma-decano',
    templateUrl    : './firma_decano.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradosFirmaDecanoComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
