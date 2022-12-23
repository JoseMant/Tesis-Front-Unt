import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'grados-firma-secretaria',
    templateUrl    : './firma_secretaria.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradosFirmaSecretariaComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
