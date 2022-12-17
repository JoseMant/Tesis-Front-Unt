import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'grados-firma-rector',
    templateUrl    : './firma_rector.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradosFirmaRectorComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
